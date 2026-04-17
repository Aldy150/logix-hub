<?php

use Illuminate\Support\Facades\Route;
use App\Http\Middleware\EnsureTokenIsValid;

Route::get('/', function () {
    return ['Laravel' => app()->version()];
});

require __DIR__.'/auth.php';


Route::middleware([EnsureTokenIsValid::class])->group(function () {
    Route::get('/dashboard', function () {
        return view('dashboard');
    });

    Route::get('/profile', function () {
        return view('profile');
    });
});

