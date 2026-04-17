import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface ClientData {
  nom: string;
  entreprise: string;
  email: string;
  telephone: string;
  statut: string;
  valeur: number;
  initial: string;
}

// AJOUTER CETTE INTERFACE
interface AjoutClientProps {
  onSuccess?: () => void;
}

// MODIFIER CETTE LIGNE
export default function AjoutClient({ onSuccess }: AjoutClientProps = {}) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [clientData, setClientData] = useState<ClientData>({
    nom: "",
    entreprise: "",
    email: "",
    telephone: "",
    statut: "",
    valeur: 0,
    initial: "",
  });

  const inputStyle = "w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all duration-200 text-gray-700";

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;

    if (name === "nom") {
      const initials = value
        .trim()
        .split(/\s+/)
        .map(n => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 3);

      setClientData(prev => ({ ...prev, nom: value, initial: initials }));
      return;
    }

    setClientData(prev => ({
      ...prev,
      [name]: name === "valeur" ? (value === "" ? 0 : parseInt(value)) : value,
    }));
  }

  async function valider(e: React.FormEvent) {
    e.preventDefault();
    if (!clientData.nom.trim() || !clientData.entreprise.trim() || !clientData.email.trim() || !clientData.telephone.trim() || !clientData.statut.trim()) {
      alert("Veuillez remplir tous les champs obligatoires.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("http://localhost:8000/api/clients", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify(clientData),
      });

      if (response.ok) {
        // MODIFIER CETTE PARTIE
        if (onSuccess) {
          onSuccess(); // Appeler le callback si fourni
        } else {
          navigate("/contact"); // Comportement par défaut
        }
      } else {
        const result = await response.json();
        alert("Erreur : " + (result.message || "Une erreur est survenue"));
      }
    } catch (error) {
      alert("Erreur de connexion au serveur.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6 font-sans text-gray-800">
      <div className="bg-white p-10 rounded-2xl shadow-sm w-full max-w-2xl border border-gray-200">
        
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
             <span className="text-green-700 text-xl font-bold">{clientData.initial || "LH"}</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Logix Hub</h1>
          <p className="text-gray-500 text-sm mt-1">Nouveau profil client</p>
        </div>

        <form onSubmit={valider} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
            
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-500 ml-1">Nom complet</label>
              <input
                type="text"
                name="nom"
                placeholder="Ex: Jean Dupont"
                className={inputStyle}
                value={clientData.nom}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-500 ml-1">Entreprise</label>
              <input
                type="text"
                name="entreprise"
                placeholder="Ex: Logix SARL"
                className={inputStyle}
                value={clientData.entreprise}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-500 ml-1">Adresse Email</label>
              <input
                type="email"
                name="email"
                placeholder="nom@mail.com"
                className={inputStyle}
                value={clientData.email}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-500 ml-1">Téléphone</label>
              <input
                type="tel"
                name="telephone"
                placeholder="+242 06 000 00 00"
                className={inputStyle}
                value={clientData.telephone}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-500 ml-1">Statut</label>
              <select
                name="statut"
                className={inputStyle}
                value={clientData.statut}
                onChange={handleChange}
              >
                <option value="">Choisir un statut</option>
                <option value="prospect">Prospect</option>
                <option value="client">Client</option>
                <option value="relance">Relance</option>
                <option value="inactif">Inactif</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-500 ml-1">Valeur (FCFA)</label>
              <input
                type="number"
                name="valeur"
                placeholder="0"
                className={inputStyle}
                value={clientData.valeur || ""}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-4 rounded-lg font-bold text-white transition-colors ${
                loading 
                ? "bg-gray-400 cursor-not-allowed" 
                : "bg-green-600 hover:bg-green-700"
              }`}
            >
              {loading ? "Chargement..." : "Enregistrer le client"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}