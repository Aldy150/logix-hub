<?php

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Route;
use App\Models\Client;
use App\Http\Controllers\ClientController;


/* --- ROUTE REGISTER --- */


Route::post('/register', function (Request $request) {
    $validated = $request->validate([
        'name'      => 'required|string|max:255',
        'firstname' => 'required|string|max:255',
        'email'     => 'required|string|email|max:255|unique:users,email',
        'password'  => 'required|string|min:6', 
    ]);

    // 2. On crée l'utilisateur avec les bonnes colonnes de ta base
    $user = User::create([
        'name'      => $validated['name'],
        'firstname' => $validated['firstname'],
        'email'     => $validated['email'],
        'password'  => Hash::make($validated['password']),
    ]);

    $token = $user->createToken('auth_token')->plainTextToken;

    return response()->json([
        'message' => 'Inscription réussie',
        'token'   => $token,
        'user'    => $user
    ], 201)
        ->header('Access-Control-Allow-Origin', 'http://localhost:8080')
        ->header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')
        ->header('Access-Control-Allow-Headers', 'Content-Type, Accept, Authorization');
});

/* --- ROUTE LOGIN --- */
Route::post('/login', function (Request $request) {
    $validated = $request->validate([
        'email' => 'required|email',
        'password' => 'required',
    ]);

    $user = User::where('email', $validated['email'])->first();

    if (!$user || !Hash::check($validated['password'], $user->password)) {
        return response()->json([
            'message' => 'Identifiants incorrects',
        ], 401)
            ->header('Access-Control-Allow-Origin', 'http://localhost:8080');
    }

    $token = $user->createToken('auth_token')->plainTextToken;

    return response()->json([
        'message' => 'Connexion réussie',
        'token' => $token,
        'user' => $user,
    ], 200)
        ->header('Access-Control-Allow-Origin', 'http://localhost:8080')
        ->header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')
        ->header('Access-Control-Allow-Headers', 'Content-Type, Accept, Authorization');
});

// Routes clients
Route::get('clients', [ClientController::class, 'index']);
Route::post('clients', [ClientController::class, 'store']);