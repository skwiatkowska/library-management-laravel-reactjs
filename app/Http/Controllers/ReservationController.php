<?php

namespace App\Http\Controllers;

use App\Models\BookItem;
use App\Models\Reservation;
use App\Http\Controllers\Controller;

class ReservationController extends Controller {

    public function index() {
        $now = new \DateTime();
        $expired = Reservation::with('bookItem')->where('due_date', '<', $now)->get();
        foreach ($expired as $exp) {
            $item = $exp->bookItem;
            $item->update(['status' => BookItem::AVAILABLE]);
            $exp->delete();
        }
        $reservations = Reservation::with('user')->with('bookItem.book')->get();
        return response()->json($reservations);
    }


    public function show($id) {
        $reservation = Reservation::where('id', $id)->firstOrFail();
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

}
