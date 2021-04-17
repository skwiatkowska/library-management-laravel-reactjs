<?php

namespace App\Http\Controllers;

use App\Models\BookItem;
use App\Models\Borrowing;
use App\Models\User;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use DateTime;

class BorrowingController extends Controller {

    public function index() {
        $borrowings = Borrowing::all()->filter(function ($value) {
            return !isset($value->actual_return_date);
        });
        return response()->json($borrowings);
    }
   
}
