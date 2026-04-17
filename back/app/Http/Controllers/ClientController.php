<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Client; // N'oublie pas d'importer ton modèle !

class ClientController extends Controller
{
    // Récupérer tous les clients
    public function index()
    {
        return response()->json(Client::all(), 200);
    }

    // Ajouter un client
    public function store(Request $request)
    {
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
    }
}