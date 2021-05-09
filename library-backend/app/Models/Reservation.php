<?php

namespace App\Models;
use Vinelab\NeoEloquent\Eloquent\Model as NeoEloquent;
use App\Models\BookItem;
use App\Models\User;

class Reservation extends NeoEloquent {

    protected $label = 'Reservation';

    protected $fillable = [
        'id',
        'due_date',
        'created_at',
        'updated_at'
    ];


    protected $hidden = [
        'updated_at'
    ];


    public function bookItem() {
        return $this->morphTo(BookItem::class, 'ON');
    }

    public function user() {
        return $this->belongsTo(User::class, 'RESERVED');
    }

}
