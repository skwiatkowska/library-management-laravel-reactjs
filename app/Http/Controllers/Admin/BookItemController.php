<?php

namespace App\Http\Controllers\Admin;

use App\Models\Book;
use App\Models\BookItem;
use App\Models\Category;
use App\Models\Publisher;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;

class BookItemController extends Controller {


    public function index() {
        $bookItems =  BookItem::with('book')->with('borrowings.user')->get();
        return response()->json($bookItems);
    }

    public function show($id) {
        $item = BookItem::where('id', $id)->with('book')->with('borrowings.user')->firstOrFail();
        return response()->json($item);
    }


    public function store(Request $request) {
        $book = Book::with('bookItems')->where('id', $request->book_id)->firstOrFail();
        foreach ($book->bookItems as $exisitingBookItem) {
            if ($exisitingBookItem->book_item_id == $request->order) {
                return response()->json(['message' => 'A book item with the given number for this book already exists'], 409);
            }
        }

        BookItem::createWith([
            'book_item_id' => $request->order,
            'status' =>  BookItem::AVAILABLE,
            'is_blocked' => False
        ], ['book' => $book]);
        return response()->json([
            'message' => 'A book item has been created',
            'book' => $book
        ]);
    }



    public function delete($id) {
        $item = BookItem::with('book')->with('borrowings')->where('id', $id)->firstOrFail();
        if ($item->status == BookItem::AVAILABLE) {
            if (!empty($item->borrowings)) {
                foreach ($item->borrowings as $b) {
                    $item->deleteRelatedBorrowing($b->id);
                }
            }

            if (!empty($item->reservations)) {
                foreach ($item->reservations as $r) {
                    $item->deleteRelatedReservation($r->id);
                }
            }

            $book = $item->book;
            $book->deleteRelatedBookItem($item->id);
            $item->delete();
            return response()->json([
                'message' => 'A book item has been deleted'
            ]);
        } else {
            return response()->json(['message' => 'You cannot delete this book item because it is not available now'], 403);
        }
    }


    public function update($id) {
        $item = BookItem::where('id', $id)->firstOrFail();
        $blocked = $item->is_blocked;
        if ($item->status != BookItem::AVAILABLE) {
            return response()->json(['message' => 'You cannot delete this book item because it is not available now'], 403);
        }
        $item->update(['is_blocked' => !$blocked]);
        return response()->json([
            'message' => 'A book item has been updated'
        ]);
    }
}
