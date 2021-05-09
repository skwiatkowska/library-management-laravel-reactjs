<?php

use Faker\Generator as Faker;
use App\Models\Author;

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

$factory->define(App\Models\Author::class, function (Faker $faker) {
    $fname = $faker->unique()->firstName;
    $lname = $faker->unique()->lastName;
    $exisitingAuthor = Author::where('first_names', $fname)->where('last_name', $lname)->get()->first();
    if ($exisitingAuthor) {
        $exisitingAuthor->delete();
    }
    $exisitingAuthor = Author::where('last_name', $lname)->get()->first();
    if ($exisitingAuthor) {
        $exisitingAuthor->delete();
    }
    return [
        'first_names' => $fname,
        'last_name' => $lname,
    ];
});
