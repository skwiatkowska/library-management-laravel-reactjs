<?php

use Faker\Generator as Faker;
use App\Models\Book;

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


$factory->define(App\Models\Book::class, function (Faker $faker) {
    $sentence = $faker->unique()->sentence(rand(1, 5));
    $title = substr($sentence, 0, strlen($sentence) - 1);

    return [
        'title' => $title,
        'isbn' => $faker->unique()->numberBetween(1, 999999999), 
        'publication_year' => $faker->numberBetween(1910, 2020),
    ];
});

