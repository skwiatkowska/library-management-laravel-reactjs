<?php

namespace App\Http\Controllers;

use App\Models\Book;
use App\Models\BookItem;
use App\Models\User;
use App\Models\Reservation;
use App\Models\Borrowing;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use DateTime;
use Illuminate\Support\Facades\Auth;

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


    public function borrowBook(Request $request, $id) {
        $user = User::where('id', '=', $request->user_id)->firstOrFail();

        $item = BookItem::with('book')->with('borrowings')->where('id', $id)->firstOrFail();
        if ($item->status == BookItem::BORROWED || $item->is_blocked) {
            return response()->json(['message' => 'You cannot reserve a borrowed or blocked book'], 409);
        }

        if ($request->has('reservation_id')) {
            $reservation = Reservation::where('id', $request->reservation_id)->get()->first();

            if ($reservation->user->id != $user->id) {
                return response()->json(['message' => 'You cannot borrow a book that is already reserved by someone else'], 409);
            } else {
                $reservation->delete();
            }
        }

        $borrowing = new Borrowing(['borrow_date' => new DateTime(), 'due_date' => new DateTime("+1 month"), 'was_prolonged' => false]);
        $item->update(['status' => BookItem::BORROWED]);
        $user->borrowings($item)->save($borrowing);

        return response()->json([
            'message' => 'A book has been borrowed'
        ]);
    }



    public function returnBook($id) {
        $item = BookItem::with('borrowings')->where('id', $id)->firstOrFail();
        foreach ($item->borrowings as $borrowing) {
            if (!isset($borrowing->actual_return_date)) {
                $borrowing->update(['actual_return_date' => new DateTime()]);
                $item->update(['status' => BookItem::AVAILABLE]);
                if ($borrowing->due_date < new DateTime()) {
                    $now = new DateTime();
                    $interval = $now->diff(new DateTime($borrowing->due_date));
                    $fee = $interval->d * 0.5;
                    $borrowing->overdue_fee = $fee;
                }
            }
        }
        return response()->json([
            'message' => 'A book has been returned'
        ]);
    }


    public function reserve($id) {
        $user = Auth::user();
        $item = BookItem::with('book')->with('borrowings')->where('id', $id)->firstOrFail();
        if ($item->status != BookItem::AVAILABLE || $item->is_blocked) {
            return response()->json(['message' => 'You cannot reserve a borrowed, reserved or blocked book'], 409);
        }
        $dueDate = new DateTime("+3 days");
        if (date('w', strtotime("+3 days")) == 0) { //sunday
            $dueDate = new DateTime("+4 days");
        } else if (date('w', strtotime("+3 days")) == 6) { //saturday
            $dueDate = new DateTime("+5 days");
        }
        $reservation = new Reservation(['due_date' => $dueDate]);
        $item->update(['status' => BookItem::RESERVED]);
        $user->reservations($item)->save($reservation);
        return response()->json([
            'message' => 'A book has been reserved'
        ]);
    }
}
