<?php

namespace App\Http\Controllers;

use App\Models\Author;
use App\Models\Book;
use App\Models\BookItem;
use App\Models\Category;
use App\Models\Publisher;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;

class BookController extends Controller {


    public function index(Request $request) {
        if (count($request->all()) == 0) {

            $booksWithRelations = Book::with('authors')->with('categories')->with('publisher')->with('bookItems')->get();
        } else {
            if ($request->has('category')) {
                $category = Category::where('id', $request->category)->firstOrFail();
                $books = $category->books();
            }

            if ($request->has('title')) {
                $books = Book::where('title', '=~', '.*' . $request->title . '.*');
            }

            if ($request->has('isbn')) {
                $books = Book::where('isbn', (int)$request->isbn);
            }

            if ($request->has('author')) {
                $words = explode(" ", $request->author);
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

                if ($authors->count()) {

                    $authorIds = array();
                    foreach ($authors as $author) {
                        array_push($authorIds, $author->id);
                    }

                    $books = Author::find($authorIds[0])->books();

                    foreach ($authorIds as $index => $authorId) {
                        if ($index != 0) {
                            $subquery = Author::find($authorId)->books();
                            if ($subquery->count() > 0) {
                                $books = $books->merge($subquery);
                            }
                        }
                    }
                } else {
                    return response()->json(array());
                }
            }

            if ($request->has('publisher')) {
                $publishers = Publisher::where('name', '=~', '.*' . $request->publisher . '.*')->get();
                if ($publishers->count()) {

                    $publisherIds = array();
                    foreach ($publishers as $publisher) {
                        array_push($publisherIds, $publisher->id);
                    }

                    $books = Publisher::find($publisherIds[0])->books();
                    foreach ($publisherIds as $index => $publisherId) {
                        if ($index != 0) {
                            $subquery = Publisher::find($publisherId)->books();
                            if ($subquery->count() > 0) {
                                $books = $books->merge($subquery);
                            }
                        }
                    }
                } else {
                    return response()->json(array());
                }
            }

            $booksWithRelations = $books->with('authors')->with('categories')->with('publisher')->with('bookItems')->get();
        }
        return response()->json($booksWithRelations);
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
        ]);
    }
}
