<?php

namespace App\Models;

use Illuminate\Support\Facades\DB;
use App\Models\Borrowing;
use Vinelab\NeoEloquent\Eloquent\Model as NeoEloquent;

class BookItem extends NeoEloquent {

    const AVAILABLE = "Available";
    const RESERVED = "Reserved";
    const BORROWED = "Borrowed";


    protected $label = 'BookItem';

    protected $fillable = [
        'id',
        'book_item_id',
        'status',
        'is_blocked',
        'created_at',
        'updated_at'
    ];


    protected $hidden = [
        'created_at',
        'updated_at'
    ];



    public function book() {
        return $this->belongsTo(Book::class, 'HAS_ITEM');
    }

    public function borrowings() {
        return $this->morphMany(Borrowing::class, 'ON');
    }

    public function reservations() {
        return $this->morphMany(Reservation::class, 'ON');
    }

    public function deleteRelatedBorrowing($borrowingId) {
        $cypher = "MATCH (b:Borrowing)-[rel1:ON]->(item:BookItem) 
                        WHERE ID(b)=$borrowingId AND ID(item)=$this->id 
                    MATCH (b:Borrowing)<-[rel2:BORROWED]-(u:User) 
                        WHERE ID(b)=$borrowingId
                    DELETE rel1, rel2;";
        return DB::select($cypher);
    }


    public function deleteRelatedReservation($reservationId) {
        $cypher = "MATCH (r:Reservation)-[rel1:ON]->(item:BookItem) 
                        WHERE ID(r)=$reservationId AND ID(item)=$this->id 
                    MATCH (r:Reservation)<-[rel2:RESERVED]-(u:User) 
                        WHERE ID(r)=$reservationId
                    DELETE rel1, rel2;";
        return DB::select($cypher);
    }
}
