<?php

use Illuminate\Database\Seeder;
use App\Models\Author;
use App\Models\Book;
use App\Models\BookItem;
use App\Models\Borrowing;
use App\Models\Category;
use App\Models\Publisher;
use App\Models\Reservation;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class ObjectSeeder extends Seeder {
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run() {
        $cypher = "MATCH (n) DETACH DELETE n;";
        DB::select($cypher);

        $users = factory(User::class)->times(50)->create();
        foreach ($users as $user) {
            if (rand(0, 5) != 0) {
                $user->update(['created_at' => new \DateTime("-1 month")]);
            }
        }
        $books = factory(Book::class)->times(20)->create();
        $authors = factory(Author::class)->times(12)->create();
        $publishers = factory(Publisher::class)->times(5)->create();
        $categories = factory(Category::class)->times(5)->create();

        $action = ["reservation", "borrowing", "return", null];


        foreach ($books as $book) {
            $bookItems = factory(BookItem::class)->times(rand(2,2))->create();
            foreach ($bookItems as $item) {
                if (rand(0, 15) != 0) {
                    $item->update(['created_at' => new \DateTime("-1 month")]);
                }
            }
            foreach ($bookItems as $bookItem) {
                $existing = false;
                foreach($book->bookItems as $item){
                    if($item->book_item_id == $bookItem->book_item_id){
                        $existing = true;
                    }
                }
                if(!$existing){
                $book->bookItems()->save($bookItem);
                for ($i = 0; $i < 2; $i++) {
                    $randomAction = array_rand($action);

                    if ($randomAction == 0) { //reservation
                        if (!$bookItem->reservations->count()) {
                            $user = $users[rand(0, $users->count() - 1)];
                            $reservation =  new Reservation(['due_date' =>  new DateTime("+3 days")]);
                            $user->reservations($bookItem)->save($reservation);
                            $bookItem->update(['status' => BookItem::RESERVED]);
                            if (rand(0, 7) != 0) {
                                $reservation->update(['created_at' => new \DateTime("-1 month")]);
                            }
                        }
                    } elseif ($randomAction == 1) { //borrowing
                        if (!$bookItem->reservations->count()) {
                            $borrowDate = [null, "-1 day", "-2 days", "-3 days", "-7 days"];
                            $randomBorrowDate = $borrowDate[array_rand($borrowDate)];
                            $dueDate = ["+1 month", "+14 days", "+3 days"];
                            $randomDueDate = $dueDate[array_rand($dueDate)];
                            $user = $users[rand(0, $users->count() - 1)];
                            $borrowing =  new Borrowing(['borrow_date' => new DateTime($randomBorrowDate), 'due_date' => new DateTime($randomDueDate), 'was_prolonged' => false]);
                            $user->borrowings($bookItem)->save($borrowing);
                            $bookItem->update(['status' => BookItem::BORROWED]);
                            if (rand(0, 7) != 0) {
                                $borrowing->update(['created_at' => new \DateTime("-1 month")]);
                            }
                        }
                    } elseif ($randomAction == 2) { //return
                        if (!$bookItem->reservations->count()) {
                            $borrowDate = [null, "-1 month", "-2 months", "-14 days", '-7 days'];
                            $randomBorrowDate = $borrowDate[array_rand($borrowDate)];
                            $dueDate = ["+1 day", "-10 days", "-5 days", "+2 days", "+7 days"];
                            $randomDueDate = $dueDate[array_rand($dueDate)];
                            $user = $users[rand(0, $users->count() - 1)];
                            $due = new DateTime($randomDueDate);
                            $borrowing =  new Borrowing(['borrow_date' => new DateTime($randomBorrowDate), 'due_date' => $due, 'was_prolonged' => false]);
                            $user->borrowings($bookItem)->save($borrowing);
                            $borrowing->update(['actual_return_date' => new DateTime()]);
                            $bookItem->update(['status' => BookItem::AVAILABLE]);
                            if ($borrowing->due_date < new DateTime()) {
                                $now = new DateTime();
                                $interval = $now->diff($due);
                                $fee = $interval->d * 0.5;
                                $borrowing->overdue_fee = $fee;
                            }
                        }
                    }
                }}
            }

            for ($i = 0; $i <= rand(0, 2); $i++) {
                $author = $authors[rand(0, $authors->count() - 1)];
                $book->authors()->save($author);
            }

            $publisher = $publishers[rand(0, $publishers->count() - 1)];
            $publisher->books()->save($book);

            for ($i = 0; $i <= rand(0, 2); $i++) {
                $category = $categories[rand(0, $categories->count() - 1)];
                $book->categories()->save($category);
            }
        }

        // delete duplicated relationships
        $cypher = "MATCH ()-[R]->() 
            MATCH (S)-[R]->(E)  
            WITH S,E,TYPE(R) AS TYP, 
            TAIL(COLLECT(R)) AS COLL 
            FOREACH(X IN COLL | DELETE X)";
        DB::select($cypher);
    }
}
