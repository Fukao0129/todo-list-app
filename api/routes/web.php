<?php

use Illuminate\Support\Facades\Route;

// 認証
Route::post('/login', 'App\Http\Controllers\LoginController@login')->name('login');
Route::post('/logout', 'App\Http\Controllers\LoginController@logout');

Route::get('/', function () {
    return view('welcome');
});