<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller {



    public function index(Request $request) {
        $users = User::all();
        if ($request->has('pesel')) {
            $users = User::where('pesel', $request->pesel)->get();
        }

        if ($request->has('lname')) {
            $users = User::where('last_name', '=~', '.*' . $request->lname . '.*')->get();
        }

        if ($request->has('email')) {
            $users = User::where('email', $request->email)->get();
        }

        if ($request->has('phone')) {
            $users = User::where('phone', $request->email)->get();
        }

        return response()->json($users);
    }

    public function show($id) {
        $user = User::where('id', $id)->firstOrFail();
        return response()->json($user);
    }


    public function store(Request $request) {
        $validator = Validator::make($request->all(), [
            'fname' => 'required',
            'fname' => 'required',
            'email' => 'required',
            'password' => 'required',
            'phone' => 'required',
            'pesel' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Fields validation failed',
                'errors' => $validator->errors()
            ], 400);
        }

        $existingUser = User::where('pesel', $request->pesel)->get();
        if ($existingUser->count() > 0) {
            return response()->json(['message' => 'A user with the given PESEL already exists'], 409);
        }
        $existingUser = User::where('email', $request->email)->get();
        if ($existingUser->count() > 0) {
            return response()->json(['message' => 'A user with the given email already exists'], 409);
        }
        $user = User::create([
            'fname' => $request->fname,
            'lname' => $request->lname,
            'pesel' => $request->pesel,
            'email' => $request->email,
            'phone' => $request->phone,
            'password' => Hash::make($request->pesel)
        ]);
        return response()->json([
            'message' => 'A user has been created',
            'publisher' => $user
        ]);
    }



    public function update(Request $request, $id) {
        $user = User::where('id', $id)->firstOrFail();

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



    public function delete($id) {
        $user = User::where('id', $id)->firstOrFail();
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
