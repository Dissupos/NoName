<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/


Route::group(['prefix' => 'api/v1'], function () {
    Route::post('register', 'RegistrationController@store');
    Route::post('login', 'SessionsController@store');

    /**
     * Routes only for authenticated users
     */
    Route::group(['middleware' => 'auth:api'], function () {
        Route::post('user', 'SessionsController@index');
        Route::get('notes', 'NoteController@index');
        Route::get('notes/tag/{tag}', 'TagController@index');
        Route::get('notes/{note}', 'NoteController@show');
        Route::put('notes/{note}', 'NoteController@update');
        Route::delete('notes/{note}', 'NoteController@destroy');
        Route::post('notes', 'NoteController@store');
    });


});