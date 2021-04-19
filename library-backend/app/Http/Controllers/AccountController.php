<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;

class AccountController extends Controller {

    public function getAuthUser() {
        $guard = 'users';
        $user = auth($guard)->user();
        if(!$user){
            $guard = 'admins';
            $user = auth($guard)->user();
        }
        return response()->json(['user' => $user, 'type' => $guard]);
    }

    public function index() {
        $user = Auth::user();
        return response()->json(['user' => $user]);
    }

    public function update(Request $request) {
        $user = Auth::user();

        if ($user->fname != $request->fname) {
            $user->fname = $request->fname;
        }
        if ($user->lname != $request->lname) {
            $user->lname = $request->lname;
        }
        if ($user->pesel != $request->pesel) {
            $existingUser = User::where('pesel', $request->pesel)->get();
            if ($existingUser->count() > 0) {
                return response()->json(['message' => 'A user with the given PESEL already exists'], 409);
            }
            $user->pesel = $request->pesel;
        }
        if ($user->phone != $request->phone) {
            $user->phone = $request->phone;
        }
        if ($user->email != $request->email) {
            $existingUser = User::where('email', $request->email)->get();
            if ($existingUser->count() > 0) {
                return response()->json(['message' => 'A user with the given email already exists'], 409);
            }
            $user->email = $request->email;
        }
        $user->save();
        return response()->json([
            'message' => 'A user has been updated',
            'publisher' => $user
        ]);
    }

    public function delete() {
        $user = Auth::user();
        if (!empty($user->borrowings)) {
            foreach ($user->borrowings as $borrowing) {
                if (!isset($borrowing->actual_return_date)) {
                    return response()->json(['message' => 'You cannot delete a user with borrowed books'], 409);
                }
            }
        }
        if (!empty($user->reservations)) {
            foreach ($user->reservations as $reservation) {
                if (!isset($reservation->actual_return_date)) {
                    return response()->json(['message' => 'You cannot delete a user with reserved books'], 409);
                }
            }
        }

        if (!empty($user->borrowings)) {
            foreach ($user->borrowings as $borrowing) {
                $borrowing->bookItem->deleteRelatedBorrowing($borrowing->id);
            }
        }
        if (!empty($user->reservations)) {
            foreach ($user->reservations as $reservation) {
                $reservation->bookItem->deleteRelatedReservation($reservation->id);
            }
        }
        $user->delete();
        return response()->json([
            'message' => 'A user has been deleted'
        ]);
    }
}
