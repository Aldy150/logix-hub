<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('clients', function (Blueprint $table) {
            $table->id();
            $table->string('nom');           // Pour le nom complet
            $table->string('entreprise');    // Pour le nom de la société
            $table->string('email')->unique(); // Email unique pour éviter les doublons
            $table->string('statut');        // Prospect, Client Actif, etc.
            $table->bigInteger('valeur'); 
            $table->string('initial') ;
            $table->string('telephone'); // Utilisation de bigInteger pour les gros montants FCFA
            $table->timestamps();            // created_at et updated_at
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('clients');
    }
};
