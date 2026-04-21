<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Client extends Model
{
    use HasFactory;

    // Autorise Laravel à remplir ces colonnes
   protected $fillable = ['user_id', 'nom', 'entreprise', 'email', 'statut', 'valeur', 'initial', 'telephone'];
}