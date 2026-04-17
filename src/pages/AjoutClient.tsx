import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AjoutClient() {
  const navigate = useNavigate();

  interface ClientData {
    nom: string;
    entreprise: string;
    email: string;
    statut: string;
    valeur: number;
  }

  const [clientData, setClientData] = useState<ClientData>({
    nom: "",
    entreprise: "",
    email: "",
    statut: "",
    valeur: 0,
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setClientData({
      ...clientData,
      // On utilise parseInt pour le FCFA (nombres entiers)
      [name]: name === "valeur" ? (value === "" ? 0 : parseInt(value)) : value,
    });
  }

  async function valider(e: React.FormEvent) {
    e.preventDefault(); // Bloque le rechargement de la page
    
    // Validation locale
    if (
      !clientData.nom.trim() ||
      !clientData.entreprise.trim() ||
      !/\S+@\S+\.\S+/.test(clientData.email) ||
      !clientData.statut.trim() ||
      clientData.valeur <= 0
    ) {
      alert("Veuillez renseigner tous les champs correctement");
      return;
    }

    try {
      // APPEL VERS LARAVEL (Port 8000)
      const response = await fetch("http://127.0.0.1:8000/api/clients", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json", // Pour recevoir les erreurs Laravel proprement
        },
        body: JSON.stringify(clientData),
      });

      const result = await response.json();

      if (response.ok) {
        alert("Fiche client créée avec succès !");
        setClientData({ nom: "", entreprise: "", email: "", statut: "", valeur: 0 });
        navigate("/contact", { replace: true });
      } else {
        // Affiche l'erreur spécifique du back (ex: email déjà pris)
        alert("Erreur : " + (result.message || "Impossible de créer le client"));
        console.error("Back-end error:", result);
      }
    } catch (error) {
      console.error("Erreur réseau/CORS:", error);
      alert("Erreur de connexion au serveur Laravel (127.0.0.1:8000)");
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 font-sans">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-2xl border border-gray-100">
        <div className="flex flex-col items-center mb-8">
          <h1 className="text-green-600 text-3xl font-extrabold tracking-tight">Logix Hub</h1>
          <p className="text-gray-500 mt-1">Nouveau profil client</p>
        </div>

        {/* CORRECTION : Le onSubmit est ICI sur le form, pas sur le bouton */}
        <form onSubmit={valider} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Nom */}
            <div className="flex flex-col">
              <label className="text-sm font-bold text-gray-700 mb-1">Nom complet</label>
              <input
                type="text"
                name="nom"
                placeholder="Ex: Jean Dupont"
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none transition shadow-sm"
                value={clientData.nom}
                onChange={handleChange}
              />
            </div>

            {/* Entreprise */}
            <div className="flex flex-col">
              <label className="text-sm font-bold text-gray-700 mb-1">Entreprise</label>
              <input
                type="text"
                name="entreprise"
                placeholder="Nom de la société"
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none transition shadow-sm"
                value={clientData.entreprise}
                onChange={handleChange}
              />
            </div>

            {/* Email */}
            <div className="flex flex-col">
              <label className="text-sm font-bold text-gray-700 mb-1">Email</label>
              <input
                type="email"
                name="email"
                placeholder="jean@logix.com"
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none transition shadow-sm"
                value={clientData.email}
                onChange={handleChange}
              />
            </div>

            {/* Statut */}
            <div className="flex flex-col">
              <label className="text-sm font-bold text-gray-700 mb-1">Statut</label>
              <select
                name="statut"
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none transition bg-white shadow-sm"
                value={clientData.statut}
                onChange={handleChange}
              >
                <option value="">Sélectionnez un statut</option>
                <option value="prospect">Prospect</option>
                <option value="client">Client Actif</option>
                <option value="relance">À relancer</option>
              </select>
            </div>

            {/* Valeur du contrat (FCFA) - Ton design préféré */}
            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-gray-700 mb-1">
                Valeur du contrat
              </label>
              <div className="relative group">
                <input
                  type="number"
                  name="valeur"
                  value={clientData.valeur === 0 ? "" : clientData.valeur}
                  onChange={handleChange}
                  placeholder="Ex: 500000"
                  className="w-full pl-4 pr-20 py-3 border-2 border-gray-200 rounded-lg 
                             focus:border-green-500 focus:ring-0 outline-none transition-all 
                             font-semibold text-lg
                             [appearance:textfield] 
                             [&::-webkit-outer-spin-button]:appearance-none 
                             [&::-webkit-inner-spin-button]:appearance-none"
                />
                <div className="absolute right-0 top-0 h-full flex items-center px-4 
                                bg-gray-100 border-l border-gray-200 rounded-r-lg 
                                text-gray-500 font-bold group-focus-within:bg-green-50 
                                group-focus-within:text-green-600 transition-colors pointer-events-none">
                  FCFA
                </div>
              </div>
            </div>

          </div>

          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white font-black py-4 rounded-lg shadow-md transition duration-300 transform hover:-translate-y-0.5 active:scale-95"
          >
            CRÉER LA FICHE CLIENT
          </button>
        </form>
      </div>
    </div>
  );
}