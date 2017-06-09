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

Route::post('/register', 'RegistrationController@store');
Route::post('/login', 'SessionsController@store');

Route::group(['prefix' => 'api/v1', 'middleware' => 'auth:api'], function () {
    Route::get('test', function () {
        return response("Hello world", 200);
    });
    Route::get('notes', 'NoteController@index');
    Route::get('notes/{note}', 'NoteController@show');
    Route::put('notes/{note}', 'NoteController@update');
    Route::delete('notes/{note}', 'NoteController@destroy');
    Route::post('notes', 'NoteController@store');
});