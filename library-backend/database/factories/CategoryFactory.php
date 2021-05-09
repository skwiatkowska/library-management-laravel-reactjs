<?php

use Faker\Generator as Faker;
use App\Models\Category;

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

$factory->define(App\Models\Category::class, function (Faker $faker) {
    $name = $faker->unique()->name;
    $exisitingCategory = Category::where('name', $name)->get()->first();
    if ($exisitingCategory) {
        $exisitingCategory->delete();
    }
    return [
        'name' => $name
    ];
});
