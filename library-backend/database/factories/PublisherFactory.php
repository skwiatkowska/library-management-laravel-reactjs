<?php

use Faker\Generator as Faker;
use App\Models\Publisher;

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

$factory->define(App\Models\Publisher::class, function (Faker $faker) {
    $name = $faker->unique()->name;
    $exisitingPublisher = Publisher::where('name', $name)->get()->first();
    if ($exisitingPublisher) {
        $exisitingPublisher->delete();
    }
    return [
        'name' => $name
    ];
});
