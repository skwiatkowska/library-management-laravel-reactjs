<?php

namespace App\Http\Controllers\Admin;

use App\Models\Author;
use App\Models\Book;
use App\Models\BookItem;
use App\Models\Category;
use App\Models\Publisher;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;

class BookController extends Controller {


    public function index() {
        $books = Book::with('bookItems')->with('authors')->with('categories')->with('publisher')->get();
        return response()->json($books);
    }

    public function store(Request $request) {

        $validator = Validator::make($request->all(), [
            'title' => 'required',
            'isbn' => 'required',
            'publication_year' => 'required',
            'publisher' => 'required',
            'authors' => 'required',
            'authors.*' => 'required|distinct',
            'categories' => 'required',
            'categories.*' => 'required|distinct',
            'number_of_items' => 'required|numeric|gt:1'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Fields validation failed',
                'errors' => $validator->errors()
            ], 400);
        }


        $authors = $request->authors;
        $categories = $request->categories;
        $items = $request->number_of_items;

        $authorsToAssign = array();
        $bookItemsToAssign = array();
        $categoriesToAssign = array();
        $publisherToAssign = Publisher::findOrFail($request->publisher);

        $isbn = $request->isbn;
        if (Book::where('isbn', $isbn)->count() > 0) {
            return response()->json(['message' => 'A book with the given ISBN already exists'], 409);
        }

        //retrieve categories for db
        if (!empty($categories)) {
            foreach ($categories as $category) {
                $cat = Category::find($category);
                array_push($categoriesToAssign, $cat);
            }
        }

        //retrieve authors from db
        if (!empty($authors)) {
            foreach ($authors as $author) {
                $a = Author::find($author);
                array_push($authorsToAssign, $a);
            }
        }

        for ($i = 0; $i < $items; $i++) {
            $item = array(
                'book_item_id' => $i + 1,
                'status' =>  BookItem::AVAILABLE,
                'is_blocked' => False
            );
            array_push($bookItemsToAssign, $item);
        }


        $book = Book::createWith(
            [
                'title' => $request->title,
                'isbn' => $request->isbn,
                'publication_year' => $request->year
            ],
            [
                'authors' => $authorsToAssign,
                'categories' => $categoriesToAssign,
                'publisher' => $publisherToAssign,
                'bookItems' => $bookItemsToAssign
            ]
        );

        return response()->json([
            'message' => 'A book has been created',
            'book' => $book
        ]);
    }



    public function delete($id) {
        $book = Book::with('bookItems')->where('id', $id)->firstOrFail();
        if ($book->bookItems->count() > 0) {
            return response()->json(['message' => 'You cannot delete a book with active book items. Detach or delete them first'], 403);
        }
        $book->delete();
        return response()->json([
            'message' => 'A book has been deleted'
        ]);
    }



    public function show($id) {
        $book = Book::where('id', $id)->with('authors')->with('categories')->with('publisher')->with('bookItems.borrowings.user')->firstOrFail();
        return response()->json($book);
    }






    public function update(Request $request, $id) {
        $book = Book::where('id', $id)->with('categories')->firstOrFail();

        if ($book->title != $request->title) {
            $book->title = $request->title;
        }
        if ($book->isbn != $request->isbn) {
            $existingBook = Book::where('isbn', $request->isbn)->get();
            if ($existingBook->count() > 0) {
                return response()->json(['message' => 'A book with the given ISBN already exists'], 409);
            }
            $book->isbn = $request->isbn;
        }
        if ($book->publication_year != $request->publication_year) {
            $book->publication_year = $request->publication_year;
        }

        if ($book->publisher->id != $request->publisher) {
            $book->deleteRelatedPublisher($book->publisher->id);
            $newPublisher = Publisher::where('id', $request->publisher)->firstOrFail();
            $newPublisher->books()->save($book);
        }

        //delete old categories
        foreach ($book->categories as $category) {
            $book->deleteRelatedCategory($category->id);
        }

        //attach new categories
        if (!empty($request->categories)) {
            foreach ($request->categories as $category) {
                $cat = Category::find($category);
                $book->categories()->save($cat);
            }
        }

        //delete old authors
        foreach ($book->authors as $author) {
            $book->deleteRelatedAuthor($author->id);
        }

        //attach new authors
        foreach ($request->authors as $author) {
            $a = Author::find($author);
            $book->authors()->save($a);
        }

        $book->save();
        return response()->json([
            'message' => 'A book has been updated'
        ]);    }


    public function findBook(Request $request) {
        $categories = Category::all();

        if ($request->searchIn && ($request->phrase || $request->searchPhrase)) {
            $searchIn = $request->searchIn;
            $phrase = ucfirst($request->phrase);
            $searchInMode = null;
            if ($searchIn == "category") {
                $phrase = $request->searchPhrase;
                $category = Category::where('id', $phrase)->firstOrFail();
                $books = $category->books()->with('bookItems')->with('authors')->with('publisher')->get();
                $phrase = $category->name;
                $searchInMode = "kategoria";
            } elseif ($searchIn == "author") {
                $words = explode(" ", $phrase);
                if (count($words) > 1) {
                    $authors = Author::where('last_name', '=~', '.*' . $words[0] . '.*')->get();

                    foreach ($words as $index => $word) {
                        if ($index != 0) {
                            $subauthor = Author::where('last_name', '=~', '.*' . $word . '.*')->get();
                            $authors = $authors->merge($subauthor);
                        }
                    }
                } else {
                    $authors = Author::where('last_name', '=~', '.*' . $words[0] . '.*')->get();
                }

                if (!$authors->count()) {
                    $books = collect();
                    return view('/admin/catalog', ['categories' => $categories, 'books' => $books])->withErrors("Nie znaleziono takiego autora: " . $phrase);
                }
                $authorIds = array();
                foreach ($authors as $author) {
                    array_push($authorIds, $author->id);
                }

                $books = Author::find($authorIds[0])->books()->with('bookItems')->with('authors')->with('categories')->with('publisher')->get();

                foreach ($authorIds as $index => $authorId) {
                    if ($index != 0) {
                        $subquery = Author::find($authorId)->books()->with('bookItems')->with('authors')->with('categories')->with('publisher')->get();
                        if ($subquery->count() > 0) {
                            $books = $books->merge($subquery);
                        }
                    }
                }
                $searchInMode = "autor";
            } elseif ($searchIn == "publisher") {
                $publishers = Publisher::where('name', '=~', '.*' . $phrase . '.*')->get();
                if (!$publishers->count()) {
                    $books = collect();
                    return view('/admin/catalog', ['categories' => $categories, 'books' => $books])->withErrors("Nie znaleziono takiego wydawnictwa: " . $phrase);
                }
                $publisherIds = array();
                foreach ($publishers as $publisher) {
                    array_push($publisherIds, $publisher->id);
                }

                $books = Publisher::find($publisherIds[0])->books()->with('bookItems')->with('authors')->with('categories')->with('publisher')->get();
                foreach ($publisherIds as $index => $publisherId) {
                    if ($index != 0) {
                        $subquery = Publisher::find($publisherId)->books()->with('bookItems')->with('authors')->with('categories')->with('publisher')->get();
                        if ($subquery->count() > 0) {
                            $books = $books->merge($subquery);
                        }
                    }
                }
                $searchInMode = "wydawnictwo";
            } elseif ($searchIn == "title") {
                $books = Book::where('title', '=~', '.*' . $phrase . '.*')->with('bookItems')->with('authors')->with('categories')->with('publisher')->get();
                $searchInMode = "tytuł";
            } elseif ($searchIn == "isbn") {
                $books = Book::where('isbn', (int)$phrase)->with('bookItems')->with('authors')->with('categories')->with('publisher')->get();
                $searchInMode = "ISBN";
            }
            if (!$books->count()) {

                $books = collect();
                return view('/admin/catalog', ['categories' => $categories, 'books' => $books])->withErrors("Nie znaleziono książek spełniających podane kryterium wyszukiwania: " . $phrase . " (" . $searchInMode . ")");
            }
            return view('/admin/catalog', ['books' => $books, 'categories' => $categories, 'phrase' => $phrase]);
        } else {
            $books = Book::all();
            return view('/admin/catalog', ['categories' => $categories, 'books' => $books]);
        }
    }



    


}
