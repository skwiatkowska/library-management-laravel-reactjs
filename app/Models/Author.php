<?php

namespace App\Models;

use Vinelab\NeoEloquent\Eloquent\Model as NeoEloquent;
use App\Models\Book;


class Author extends NeoEloquent {
    protected $label = 'Author';

    protected $fillable = [
        'id',
        'first_names',
        'last_name',
        'created_at',
        'updated_at'
    ];


    protected $hidden = [
        'created_at',
        'updated_at'
    ];

    public function books(){
        return $this->hasMany(Book::class,'WROTE');
    }

    
}
