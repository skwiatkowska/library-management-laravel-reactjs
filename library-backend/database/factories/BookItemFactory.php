<?php

use Faker\Generator as Faker;
use App\Models\BookItem;

/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| This directory should contain each of the model factory definitions for
| your application. Factories provide a convenient way to generate new
| model instances for testing / seeding your application's database.
|
*/

$factory->define(App\Models\BookItem::class, function (Faker $faker) {
    
    return [
        'book_item_id' => $faker->numberBetween(1, 15),
        'status' => BookItem::AVAILABLE,
        'is_blocked' => false,
    ];
});
