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
      [name]: name === "valeur" ? (parseFloat(value) || 0) : value,
    });
  }

  async function valider(e: React.FormEvent) {
    e.preventDefault();
    // Validation locale (ton code)
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

    // Envoi des données au backend (ton code)
    try {
      const response = await fetch("/api/clients", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(clientData),
      });

      if (response.ok) {
        alert("Fiche client créée avec succès !");
        // Réinitialiser le formulaire ou rediriger
        setClientData({
          nom: "",
          entreprise: "",
          email: "",
          statut: "",
          valeur: 0,
        });
        navigate("/contact", { replace: true }); // Redirige vers la liste des clients
      } else {
        alert("Erreur lors de la création de la fiche client");
      }
    } catch (error) {
      console.error("Erreur:", error);
      alert("Une erreur est survenue. Veuillez réessayer.");
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-2xl">
        <div className="flex flex-col items-center mb-8">
          <h1 className="text-green-600 text-3xl font-extrabold">Logix Hub</h1>
          <p className="text-gray-500 mt-2">Nouveau profil client</p>
        </div>

        <form action="" method="post" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Nom */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Nom</label>
              <input
                type="text"
                placeholder="Ex: Jean Dupont"
                className="w-full px-4 py-2 border border-gray-300
                 rounded-md focus:ring-2 focus:ring-green-500
                  outline-none transition"
                name="nom"
                value={clientData.nom}
                onChange={handleChange}
              />
            </div>

            {/* Entreprise */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Entreprise</label>
              <input
                type="text"
                placeholder="Nom de la société"
                className="w-full px-4 py-2 border
                 border-gray-300 rounded-md focus:ring-2
                  focus:ring-green-500 outline-none 
                  transition"
                name="entreprise"
                value={clientData.entreprise}
                onChange={handleChange}
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
              <input
                type="email"
                placeholder="jean@logix.com"
                className="w-full px-4 py-2 border
                 border-gray-300 rounded-md focus:ring-2
                  focus:ring-green-500 outline-none
                   transition"
                name="email"
                value={clientData.email}
                onChange={handleChange}
              />
            </div>

            {/* Statut (Select) */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Statut</label>
              <select
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 outline-none transition bg-white"
                name="statut"
                value={clientData.statut}
                onChange={handleChange}
              >
                <option value="">Sélectionnez un statut</option>
                <option value="prospect">Prospect</option>
                <option value="client">Client Actif</option>
                <option value="relance">À relancer</option>
              </select>
            </div>

            {/* Valeur (Numérique) */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-1">Valeur du contrat (€)</label>
              <input
                type="number"
                name="valeur"
                value={clientData.valeur}
                onChange={handleChange}
                placeholder="0.00"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 outline-none transition"
              />
            </div>

          </div>

          {/* Bouton */}
          <button
            type="submit"
            onSubmit={valider}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-md shadow-md transition duration-300 transform hover:-translate-y-0.5"
          >
            Créer la fiche client
          </button>
        </form>
      </div>
    </div>
  );
}