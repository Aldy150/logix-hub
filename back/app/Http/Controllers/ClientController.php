<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Client;

class ClientController extends Controller
{
    // Récupérer UNIQUEMENT les clients de l'utilisateur connecté
    public function index(Request $request)
    {
        // On récupère l'utilisateur via son Token
        $user = $request->user();

        // On récupère uniquement ses clients à lui
        $clients = $user->clients;
    
        // On calcule la somme de la colonne 'valeur' uniquement pour ses clients
        $totalRevenus = $user->clients()->sum('valeur');

        return response()->json([
            'clients' => $clients,
            'total_revenus' => $totalRevenus
        ], 200);
    }

    // Ajouter un client lié à l'utilisateur connecté
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nom' => 'required|string|max:255',
            'entreprise' => 'required|string|max:255',
            // On enlève le 'unique' global pour que chaque user puisse avoir ses propres contacts
            'email' => 'required|string|email|max:255', 
            'telephone' => 'required|string|max:255',
            'statut' => 'required|string|max:255',
            'valeur' => 'required|integer|min:0',
            'initial' => 'required|string|max:255',
        ]);

        // On crée le client EN l'attachant à l'utilisateur connecté
        // Laravel va remplir tout seul la colonne 'user_id'
        $client = $request->user()->clients()->create($validated);

        return response()->json([
            'message' => 'Client ajouté avec succès',
            'client' => $client
        ], 201);
    }
}