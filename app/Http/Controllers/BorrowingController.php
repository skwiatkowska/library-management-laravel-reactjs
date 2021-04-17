<?php

namespace App\Http\Controllers;

use App\Models\BookItem;
use App\Models\Borrowing;
use App\Models\User;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use DateTime;
use Illuminate\Support\Facades\Auth;

class BorrowingController extends Controller {

    public function index() {
        $borrowings = Borrowing::where('actual_return_date', null)->with('user')->with('bookItem.book')->get();
        return response()->json($borrowings);
    }


    public function userBooks() {
        $user = Auth::user();
        $borrowings = $user->borrowings->where('actual_return_date', null);
       
        foreach ($borrowings as $borrowing) {
            $borrowing->bookItem = Borrowing::where('id', $borrowing->id)->with('bookItem.book')->get()->first()->bookItem;
        }
        
        return response()->json($borrowings);
    }

    public function userReturnedBooks() {
        $user = Auth::user();
        $borrowings = $user->borrowings->where('actual_return_date','<>', '');
       
        foreach ($borrowings as $borrowing) {
            $borrowing->bookItem = Borrowing::where('id', $borrowing->id)->with('bookItem.book')->get()->first()->bookItem;
        }
        
        return response()->json($borrowings);
    }
   
}
