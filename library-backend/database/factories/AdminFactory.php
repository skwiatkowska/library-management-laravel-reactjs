<?php

use Faker\Generator as Faker;
use App\Models\Admin;

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

$factory->define(App\Models\Admin::class, function (Faker $faker) {
    $email = $faker->unique()->safeEmail;
    $exisitingAdmin = Admin::where('email', $email)->get()->first();
    if ($exisitingAdmin) {
        $exisitingAdmin->delete();
    }
    return [
        'email' => $faker->unique()->safeEmail,
        'password' => bcrypt('password'),
    ];
});
