<?php

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::get('/admin/authors', 'Admin\AuthorController@index');
Route::get('/admin/authors/{id}', 'Admin\AuthorController@show');

Route::group(['middleware' => ['assign.guard:admins', 'jwt.auth']], function () {
    Route::post('/admin/authors', 'Admin\AuthorController@store');
    Route::put('/admin/authors/{id}', 'Admin\AuthorController@update');
    Route::delete('/admin/authors/{id}', 'Admin\AuthorController@delete');
});



Route::get('/admin/categories', 'Admin\CategoryController@index');
Route::get('/admin/categories/{id}', 'Admin\CategoryController@show');

Route::group(['middleware' => ['assign.guard:admins', 'jwt.auth']], function () {
    Route::post('/admin/categories', 'Admin\CategoryController@store');
    Route::put('/admin/categories/{id}', 'Admin\CategoryController@update');
    Route::delete('/admin/categories/{id}', 'Admin\CategoryController@delete');
});



Route::get('/admin/publishers', 'Admin\PublisherController@index');
Route::get('/admin/publishers/{id}', 'Admin\PublisherController@show');


Route::group(['middleware' => ['assign.guard:admins', 'jwt.auth']], function () {
    Route::post('/admin/publishers', 'Admin\PublisherController@store');
    Route::put('/admin/publishers/{id}', 'Admin\PublisherController@update');
    Route::delete('/admin/publishers/{id}', 'Admin\PublisherController@delete');
});



Route::get('/admin/books', 'Admin\BookController@index');
Route::post('/admin/books', 'Admin\BookController@store');
Route::get('/admin/books/{id}', 'Admin\BookController@show');
Route::put('/admin/books/{id}', 'Admin\BookController@update');
Route::delete('/admin/books/{id}', 'Admin\BookController@delete');



Route::get('/admin/book-items', 'Admin\BookItemController@index');
Route::post('/admin/book-items', 'Admin\BookItemController@store');
Route::get('/admin/book-items/{id}', 'Admin\BookItemController@show');
Route::put('/admin/book-items/{id}', 'Admin\BookItemController@update');
Route::delete('/admin/book-items/{id}', 'Admin\BookItemController@delete');


Route::group(['prefix' => 'admin', 'middleware' => ['assign.guard:admins', 'jwt.auth']], function () {

Route::get('/users', 'Admin\UserController@index');
Route::get('/users/{id}', 'Admin\UserController@show');
Route::post('/users', 'Admin\UserController@store');
Route::put('/users/{id}', 'Admin\UserController@update');
Route::delete('/users/{id}', 'Admin\UserController@delete');
});

Route::group(['prefix' => 'users', 'middleware' => ['assign.guard:users', 'jwt.auth']], function () {
    Route::post('/logout', 'Auth\UserController@logout');

});

Route::group(['prefix' => 'admin', 'middleware' => ['assign.guard:admins', 'jwt.auth']], function () {
    Route::post('/logout', 'Auth\AdminController@logout');
    Route::post('/register', 'Auth\AdminController@register');
});


Route::get('/users/me', 'Auth\UserController@getAuthUser');
Route::post('/users/login', 'Auth\UserController@login');
Route::post('/users/register', 'Auth\UserController@register');
Route::post('/admin/login', 'Auth\AdminController@login');
