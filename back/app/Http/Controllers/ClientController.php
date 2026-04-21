<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Client;

class ClientController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();

        // On récupère les clients et le total en restant sur la requête SQL
        $clients = $user->clients()->latest()->get();
        $totalRevenus = $user->clients()->sum('valeur');

        return response()->json([
            'clients' => $clients,
            'total_revenus' => $totalRevenus
        ], 200);
    }

    public function store(Request $request)
    {
        $user = $request->user();

        $validated = $request->validate([
            'nom' => 'required|string|max:255',
            'entreprise' => 'required|string|max:255',
            // Optionnel : Unique seulement pour cet utilisateur
            'email' => 'required|email|max:255', 
            'telephone' => 'required|string|max:255',
            'statut' => 'required|string|in:prospect,client,relance,inactif', // Sécurise les choix
            'valeur' => 'required|integer|min:0',
            'initial' => 'required|string|max:3',
        ]);

        // Création sécurisée liée à l'user_id
        $client = $user->clients()->create($validated);

        return response()->json([
            'message' => 'Client ajouté avec succès',
            'client' => $client
        ], 201);
    }
}