<?php
namespace App\Models;

use Vinelab\NeoEloquent\Eloquent\Model as NeoEloquent;
use App\Models\Book;


class Category extends NeoEloquent{
    
    protected $label = 'Category';

    protected $fillable = [
        'id',
        'name',
        'created_at',
        'updated_at'
    ];


    protected $hidden = [
        'created_at',
        'updated_at'
    ];


    public function books(){
        return $this->hasMany(Book::class,'HAS_BOOK');
    }

}
