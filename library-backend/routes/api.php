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
Route::group(['prefix' => 'admin'], function () {
    Route::post('/login', 'Auth\AdminController@login');
});


Route::group(['prefix' => 'user', ], function () {
    Route::post('/login', 'Auth\UserController@login');
    Route::post('/register', 'Auth\UserController@register');

    Route::get('/publishers', 'PublisherController@index');
    Route::get('/publishers/{id}', 'PublisherController@show');   

    Route::get('/categories', 'CategoryController@index');
    Route::get('/categories/{id}', 'CategoryController@show');

    Route::get('/authors', 'AuthorController@index');
    Route::get('/authors/{id}', 'AuthorController@show');

    Route::get('/books', 'BookController@index');
    Route::get('/books/{id}', 'BookController@show');

    Route::get('/book-items', 'BookItemController@index');
    Route::get('/book-items/{id}', 'BookItemController@show');
});


Route::group(['prefix' => 'user', 'middleware' => ['assign.guard:users', 'jwt.auth']], function () {
    Route::get('/me', 'AccountController@getAuthUser');
    Route::post('/logout', 'Auth\UserController@logout');

    Route::get('/my-account', 'AccountController@index');
    Route::put('/my-account', 'AccountController@update');
    Route::delete('/my-account', 'AccountController@delete');

    Route::post('/book-items/{id}/reserve', 'BookItemController@reserve');

    Route::get('/my-reservations', 'ReservationController@userReservations');
    Route::delete('/my-reservations/{id}', 'ReservationController@deleteAsUser');

    Route::get('/my-books', 'BorrowingController@userBooks');
    Route::get('/my-history', 'BorrowingController@userReturnedBooks');

});

Route::group(['prefix' => 'admin', 'middleware' => ['assign.guard:admins', 'jwt.auth', ]], function () {
    Route::get('/me', 'AccountController@getAuthUser');
    Route::post('/logout', 'Auth\AdminController@logout');
    Route::post('/register', 'Auth\AdminController@register');

    Route::get('/users', 'UserController@index');
    Route::get('/users/{id}', 'UserController@show');
    Route::post('/users', 'UserController@store');
    Route::put('/users/{id}', 'UserController@update');
    Route::delete('/users/{id}', 'UserController@delete');

    Route::get('/publishers', 'PublisherController@index');
    Route::get('/publishers/{id}', 'PublisherController@show');   
    Route::post('/publishers', 'PublisherController@store');
    Route::put('/publishers/{id}', 'PublisherController@update');
    Route::delete('/publishers/{id}', 'PublisherController@delete');

    Route::get('/categories', 'CategoryController@index');
    Route::get('/categories/{id}', 'CategoryController@show');
    Route::post('/categories', 'CategoryController@store');
    Route::put('/categories/{id}', 'CategoryController@update');
    Route::delete('/categories/{id}', 'CategoryController@delete');

    Route::get('/authors', 'AuthorController@index');
    Route::get('/authors/{id}', 'AuthorController@show');
    Route::post('/authors', 'AuthorController@store');
    Route::put('/authors/{id}', 'AuthorController@update');
    Route::delete('/authors/{id}', 'AuthorController@delete');

    Route::get('/books', 'BookController@index');
    Route::get('/books/{id}', 'BookController@show');
    Route::post('/books', 'BookController@store');
    Route::put('/books/{id}', 'BookController@update');
    Route::delete('/books/{id}', 'BookController@delete');

    Route::get('/book-items', 'BookItemController@index');
    Route::get('/book-items/{id}', 'BookItemController@show');
    Route::post('/book-items', 'BookItemController@store');
    Route::put('/book-items/{id}', 'BookItemController@update');
    Route::delete('/book-items/{id}', 'BookItemController@delete');

    Route::post('/book-items/{id}/borrow', 'BookItemController@borrowBook');
    Route::post('/book-items/{id}/return', 'BookItemController@returnBook');

    Route::get('/borrowings', 'BorrowingController@index');

    Route::get('/reservations', 'ReservationController@index');
    Route::get('/reservations/{id}', 'ReservationController@show');
    Route::delete('/reservations/{id}', 'ReservationController@delete');
});




