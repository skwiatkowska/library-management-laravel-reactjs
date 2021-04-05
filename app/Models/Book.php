<?php

namespace App\Models;

use Illuminate\Support\Facades\DB;
use Vinelab\NeoEloquent\Eloquent\Model as NeoEloquent;
use App\Models\Category;
use App\Models\Author;
use App\Models\Publisher;
use App\Models\BookItem;

class Book extends NeoEloquent {

    protected $label = 'Book';

    protected $fillable = [
        'id',
        'title',
        'isbn',
        'publication_year',
        'created_at',
        'updated_at'
    ];


    protected $hidden = [
        'created_at',
        'updated_at'
    ];

    public function categories() {
        return $this->belongsToMany(Category::class, 'HAS_BOOK');
    }

    public function authors() {
        return $this->belongsToMany(Author::class, 'WROTE');
    }

    public function publisher() {
        return $this->belongsTo(Publisher::class, 'PUBLISHED');
    }

    public function bookItems() {
        return $this->hasMany(BookItem::class, 'HAS_ITEM');
    }

    public function deleteRelatedCategory($categoryId) {
        $cypher = "MATCH (cat:Category)-[c:HAS_BOOK]->(book:Book) WHERE ID(cat)=$categoryId AND ID(book)=$this->id DELETE c;";
        return DB::select($cypher);
    }

    public function deleteRelatedAuthor($authorId) {
        $cypher = "MATCH (author:Author)-[w:WROTE]->(book:Book) WHERE ID(author)=$authorId AND ID(book)=$this->id DELETE w;";
        return DB::select($cypher);
    }

    public function deleteRelatedPublisher($publisherId) {
        $cypher = "MATCH (publisher:Publisher)-[p:PUBLISHED]->(book:Book) WHERE ID(publisher)=$publisherId AND ID(book)=$this->id DELETE p;";
        return DB::select($cypher);
    }

    public function deleteRelatedBookItem($bookItemId) {
        $cypher = "MATCH (book:Book)-[h:HAS_ITEM]->(item:BookItem) WHERE ID(item)=$bookItemId AND ID(book)=$this->id DELETE h;";
        return DB::select($cypher);
    }
}
