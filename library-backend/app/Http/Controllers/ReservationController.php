<?php

namespace App\Http\Controllers;

use App\Models\BookItem;
use App\Models\Reservation;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class ReservationController extends Controller {

    public function index() {
        $now = new \DateTime();
        $expired = Reservation::with('bookItem')->where('due_date', '<', $now)->get();
        foreach ($expired as $exp) {
            $item = $exp->bookItem;
            $item->update(['status' => BookItem::AVAILABLE]);
            $exp->delete();
        }
        $reservations = Reservation::with('user')->with('bookItem.book.authors')->get();
        return response()->json($reservations);
    }


    public function show($id) {
        $reservation = Reservation::where('id', $id)->with('user')->with('bookItem.book.authors')->firstOrFail();
        return response()->json($reservation);
    }


    public function delete($id) {
        $reservation = Reservation::where('id', $id)->firstOrFail();
        $item = $reservation->bookItem;
        $item->update(['status' => BookItem::AVAILABLE]);

        $reservation->delete();
        return response()->json([
            'message' => 'A reservation has been deleted'
        ]);
    }

    public function deleteAsUser($id) {
        $reservation = Reservation::where('id', $id)->firstOrFail();
        if ($reservation->user->id == Auth::user()->id) {
            $item = $reservation->bookItem;
            $item->update(['status' => BookItem::AVAILABLE]);

            $reservation->delete();
            return response()->json([
                'message' => 'A reservation has been deleted'
            ]);
        } else {
            return response()->json(['message' => 'Cannot find a reservation assigned to this account'], 409);
        }
    }


    public function userReservations() {
        $user = Auth::user();
        $now = new \DateTime();
        $reservations = $user->reservations;
       
        foreach ($reservations as $reservation) {
            $reservation->bookItem = Reservation::where('id', $reservation->id)->with('bookItem.book.authors')->get()->first()->bookItem;
            if (new \DateTime($reservation->due_date) < $now) {
                $item = $reservation->bookItem;
                $item->update(['status' => BookItem::AVAILABLE]);
                $reservation->delete();
            }
        }
        return response()->json($reservations);
    }

}
