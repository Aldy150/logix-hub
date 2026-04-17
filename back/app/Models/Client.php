<?php

namespace App\Models; // <--- Vérifie bien cette ligne

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Client extends Model
{
    use HasFactory;

    // Autorise Laravel à remplir ces colonnes
    protected $fillable = ['nom', 'entreprise', 'email', 'statut', 'valeur'];
}