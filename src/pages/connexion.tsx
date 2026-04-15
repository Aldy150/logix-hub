import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../lib/axios"; // L'instance axios avec withCredentials: true

export default function Connexion() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  interface Data {
    email: string;
    password: string;
  }

  const [formData, setFormData] = useState<Data>({
    email: "",
    password: ""
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === 'password') {
      let strength = 0;
      if (value.length >= 8) strength += 25;
      if (/[A-Z]/.test(value)) strength += 25;
      if (/[0-9]/.test(value)) strength += 25;
      if (/[^A-Za-z0-9]/.test(value)) strength += 25;
      setPasswordStrength(strength);
    }
  }

  async function valider(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);

    // Validation locale (ton code)
    if (
      !/\S+@\S+\.\S+/.test(formData.email) ||
      !formData.password.trim()
    ) {
      alert("Veuillez renseigner tous les champs");
      setIsLoading(false);
      return;
    }

    if (passwordStrength < 75) {
      alert("Veuillez choisir un mot de passe plus fort");
      setIsLoading(false);
      return;
    }

    try {
      // --- AJOUT CONFIG AXIOS / SANCTUM ---
      // 1. Initialiser le cookie CSRF
      await api.get("/sanctum/csrf-cookie");

      // 2. Envoi des données (Laravel Breeze attend 'name' par défaut)
      const reponse = await api.post("/Login", { // On combine pour Laravel
        email: formData.email,
        password: formData.password,
        password_confirmation: formData.password, // Breeze exige une confirmation
      });

      // --- FIN CONFIG AXIOS ---

      alert("Inscription réussie !");
      
      setFormData({
        email: "",
        password: "",
      });
      
     navigate("/connexion", { replace: true });

    } catch (err: any) {
      console.error(err);
      // Gestion des erreurs Laravel (ex: email déjà pris)
      const message = err.response?.data?.message || "Erreur serveur";
      alert("Erreur lors de l'envoi : " + message);
      
      setFormData({
        email: "",
        password: ""
      });
    } finally {
      setIsLoading(false);
    }
  }

  const getPasswordStrengthColor = () => {
    if (passwordStrength >= 75) return 'bg-green-500';
    if (passwordStrength >= 50) return 'bg-yellow-500';
    if (passwordStrength >= 25) return 'bg-orange-500';
    return 'bg-red-500';
  };

  return (
    <div className="bg-white max-w-4xl flex items-center mx-auto md:min-h-screen p-4">
      <div className="grid md:grid-cols-3 items-center [box-shadow:0_2px_10px_-3px_rgba(14,14,14,0.3)] rounded-xl overflow-hidden">
        <div className="max-md:order-1 flex flex-col justify-center md:space-y-16 space-y-8 max-md:mt-16 min-h-full bg-gradient-to-r from-slate-900 to-slate-700 lg:px-8 px-4 py-4">
          <div>
            <h3 className="text-white text-lg">Connectez-vous en toute sécurité afin d'acceder à l'application</h3>
            <p className="text-[13px] text-slate-300 mt-3 leading-relaxed">Bienvenue sur notre page d'inscription ! Commencer par créer votre compte.</p>
          </div>
          <div>
            <h3 className="text-white text-lg">Inscription simple & Sécurisée</h3>
            <p className="text-[13px] text-slate-300 mt-3 leading-relaxed">
              Notre processus d'inscription est conçu pour être simple 
              et sécurisé. Nous accordons la priorité à la confidentialité et à la sécurité de vos donées..</p>
          </div>
        </div>

        {/* Ajout du onSubmit ici */}
        <form onSubmit={valider} className="md:col-span-2 w-full py-6 px-6 sm:px-14 max-w-lg mx-auto">
          <div className="mb-8">
            <h1 className="text-slate-900 text-2xl font-bold">Connexion</h1>
          </div>

          <div className="space-y-6">
            
            <div>
              <label className="text-slate-900 text-sm font-medium mb-2 block">Email</label>
              <input name="email" value={formData.email} onChange={handleChange} type="email" required className="text-slate-900 bg-white border border-slate-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500" placeholder="Entrez votre email" />
            </div>

            <div>
              <label className="text-slate-900 text-sm font-medium mb-2 block">Mot de passe</label>
              <div className="relative flex items-center">
                <input name="password" value={formData.password} onChange={handleChange} type={showPassword ? "text" : "password"} required className="text-slate-900 bg-white border border-slate-300 w-full text-sm pl-4 pr-10 py-2.5 rounded-md outline-blue-500" placeholder="Mot de passe" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 text-slate-400">
                  {showPassword ? "Masquer" : "Voir"}
                </button>
              </div>
              {/* Barre de force (ton design) */}
              <div className="mt-2 h-1 w-full bg-gray-200 rounded-full">
                <div className={`h-full rounded-full transition-all duration-300 ${getPasswordStrengthColor()}`} style={{ width: `${passwordStrength}%` }}></div>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <button type="submit" disabled={isLoading} className="w-full py-2.5 px-4 tracking-wider text-sm rounded-md text-white bg-slate-800 hover:bg-slate-900 focus:outline-none cursor-pointer disabled:bg-slate-500">
              {isLoading ? "Chargement..." : "Créer un compte"}
            </button>
          </div>
          <p className="text-slate-600 text-sm mt-6 text-center">Vous avez déjà un compte? <a href="/connexion" className="text-blue-600 font-medium hover:underline ml-1">Connexion</a></p>
        </form>
      </div>
    </div>
  );
}