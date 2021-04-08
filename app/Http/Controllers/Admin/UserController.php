<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\BookItem;
use Illuminate\Support\Facades\Hash;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller {


    public function show($id) {
        $user = User::where('id', $id)->with('borrowings.bookItem.book.authors')->firstOrFail();
        return response()->json($user);
    }


    public function storeUser(Request $request) {
        $existingUser = User::where('pesel', $request->pesel)->get();
        if ($existingUser->count() > 0) {
            return redirect()->back()->withErrors('Istnieje już użytkownik o podanym numerze PESEL');
        }
        $existingUser = User::where('email', $request->email)->get();
        if ($existingUser->count() > 0) {
            return redirect()->back()->withErrors('Istnieje już użytkownik o podanym adresie email');
        }
        $user = User::create([
            'first_name' => $request->fname,
            'last_name' => $request->lname,
            'pesel' => $request->pesel,
            'email' => $request->email,
            'phone' => $request->phone,
            'street' => $request->street,
            'house_number' => $request->house_number,
            'zipcode' => $request->zipcode,
            'city' => $request->city,
            'password' => Hash::make($request->pesel)
        ]);
        if ($request->isModal == 'true') {
            return response()->json(['success' => 'Dodano nowego Czytelnika: ' . $request->fname . ' ' . $request->lname]);
        }
        return redirect('/pracownik/czytelnicy/' . $user->id)->with(['success' => 'Dodano nowego użytkownika: ' . $request->fname . ' ' . $request->lname]);
    }



    public function updateUser(Request $request, $id) {
        $user = User::where('id', $id)->firstOrFail();
        if ($request->name == "fname" && $user->first_name != $request->value) {
            $user->first_name = $request->value;
        } else if ($request->name == "lname" && $user->last_name != $request->value) {
            $user->last_name = $request->value;
        } else if ($request->name == "pesel" && $user->pesel != $request->value) {
            $existingUser = User::where('pesel', $request->value)->get();
            if ($existingUser->count() > 0) {
                return redirect()->back()->withErrors('Istnieje już użytkownik o podanym numerze PESEL');
            }
            $user->pesel = $request->value;
        } else if ($request->name == "phone" && $user->phone != $request->value) {
            $user->phone = $request->value;
        } else if ($request->name == "email" && $user->email != $request->value) {
            $existingUser = User::where('email', $request->value)->get();
            if ($existingUser->count() > 0) {
                return redirect()->back()->withErrors('Istnieje już użytkownik o podanym adresie email');
            }
            $user->email = $request->value;
        } else if ($request->name == "street" && $user->street != $request->value) {
            $user->street = $request->value;
        } else if ($request->name == "house_number" && $user->house_number != $request->value) {
            $user->house_number = $request->value;
        } else if ($request->name == "zipcode" && $user->zipcode != $request->value) {
            $user->zipcode = $request->value;
        } else if ($request->name == "city" && $user->city != $request->value) {
            $user->city = $request->value;
        }
        $user->save();
        return response()->json(['success' => 'Dane zostały zmienione']);
    }

    public function findUser(Request $request) {
        if ($request->all()) {
            $searchIn = $request->searchIn;
            $phrase = $request->phrase;
            $searchInMode = null;
            if ($searchIn == "pesel") {
                $users = User::where('pesel', $phrase)->get();
                $searchInMode = "PESEL";
            } elseif ($searchIn == "lname") {
                $users = User::where('last_name', '=~', '.*' . $phrase . '.*')->get();
                $searchInMode = "nazwisko";
            }

            if (!$users->count()) {
                $users = collect();
                return view('/admin/findUser', ['users' => $users])->withErrors("Nie znaleziono Czytelników spełniających podane kryterium wyszukiwania: " . $phrase . " (" . $searchInMode . ")");
            }
            return view('/admin/findUser', ['users' => $users, 'phrase' => $phrase]);
        } else {
            $users = User::all();
            return view('/admin/findUser', ['users' => $users]);
        }
    }


    public function deleteUser(Request $request) {
        $user = User::with('borrowings.bookItem')->with('reservations.bookItem')->where('id', $request->id)->firstOrFail();
        if (!empty($user->borrowings)) {
            foreach ($user->borrowings as $borrowing) {
                if (!isset($borrowing->actual_return_date)) {
                    return back()->withErrors("Nie można usunąć użytkownika z wypożyczonymi książkami");
                }
            }
        }
        if (!empty($user->reservations)) {
            foreach ($user->reservations as $reservation) {
                if (!isset($reservation->actual_return_date)) {
                    return back()->withErrors("Nie można usunąć użytkownika z zarezerwowanymi książkami");
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
        return redirect('/pracownik/czytelnicy')->with("success", "Czytelnik " . $user->first_name . " " . $user->last_name . " został usunięty na stałe");
    }
}
