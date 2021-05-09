<?php

use Faker\Generator as Faker;
use App\Models\User;

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

$factory->define(App\Models\User::class, function (Faker $faker) {
    $pesel = $faker->unique()->numberBetween(1, 99999999999);
    $exisitingUser = User::where('pesel', $pesel)->get()->first();
    if ($exisitingUser) {
        $exisitingUser->delete();
    }
    return [
        'first_name' => $faker->firstName,
        'last_name' => $faker->lastName,
        'email' => $faker->unique()->safeEmail,
        'pesel' => $pesel,
        'password' => bcrypt('password'),
    ];
});
