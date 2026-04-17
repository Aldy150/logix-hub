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
        'nom' => 'required|string|max:255',
        'prenom' => 'required|string|max:255',
        'email' => 'required|string|email|max:255|unique:users,email',
        'password' => 'required|string|min:6',
    ]);

    $user = User::create([
        'name' => $validated['prenom'] . ' ' . $validated['nom'],
        'email' => $validated['email'],
        'password' => Hash::make($validated['password']),
    ]);

    $token = $user->createToken('auth_token')->plainTextToken;

    return response()->json([
        'message' => 'Inscription réussie',
        'token' => $token,
        'user' => $user
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

    // Vérification de l'utilisateur et du mot de passe
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
/*
// Route pour ajouter un client
Route::post('clients', function (Request $request) {
    $validated = $request->validate([
        'nom' => 'required|string|max:255',
        'entreprise' => 'required|string|max:255',
        'email' => 'required|string|email|max:255|unique:clients,email',
        'telephone' => 'required|string|max:255',  // ← AJOUTEZ CETTE LIGNE !
        'statut' => 'required|string|max:255',
        'valeur' => 'required|integer|min:0',
        'initial' => 'required|string|max:255',
    ]);

    $client = Client::create($validated);

    return response()->json([
        'message' => 'Client ajouté avec succès',
        'client' => $client
    ], 201);
});

// Route pour RÉCUPÉRER tous les clients (C'est celle-ci dont tu as besoin)
Route::get('clients', function () {
    // On récupère simplement tous les clients dans la base de données
    $clients = Client::all(); 

    return response()->json($clients);
});

// Route pour AJOUTER un client (Garde celle-là telle quelle, elle est correcte)
Route::post('clients', function (Request $request) {
    $validated = $request->validate([
        'nom' => 'required|string|max:255',
        'entreprise' => 'required|string|max:255',
        'email' => 'required|string|email|max:255|unique:clients,email',
        'telephone' => 'required|string|max:255',
        'statut' => 'required|string|max:255',
        'valeur' => 'required|integer|min:0',
        'initial' => 'required|string|max:255',
    ]);

    $client = Client::create($validated);

    return response()->json([
        'message' => 'Client ajouté avec succès',
        'client' => $client
    ], 201);
});
*/

// Laravel sait faire la différence grâce au GET et au POST
Route::get('clients', [ClientController::class, 'index']); // Pour la liste
Route::post('clients', [ClientController::class, 'store']); // Pour l'ajout