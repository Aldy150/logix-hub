import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Inscription() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  interface Data {
    nom: string;
    prenom: string;
    email: string;
    password: string;
  }

  const [formData, setFormData] = useState<Data>({
    nom: "",
    prenom: "",
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
      !formData.nom.trim() ||
      !formData.prenom.trim() ||
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
      const response = await fetch("http://localhost:8000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      // Si le serveur renvoie une erreur (422, 500, etc.)
      if (!response.ok) {
        if (result.errors && result.errors.email) {
          alert("Erreur : Cet email est déjà utilisé veuillez vous connecter !");
          setFormData({ nom: "", prenom: "", email: "", password: "" });
        } else {
          alert(result.message || "Une erreur est survenue");
        }
        setIsLoading(false);
        return; // On arrête l'exécution ici
      }

      // Si c'est un succès (201)
      alert("Inscription réussie !");
      setFormData({ nom: "", prenom: "", email: "", password: "" });
      navigate("/connexion", { replace: true });

    } catch (err: any) {
      console.error(err);
      alert("Impossible de contacter le serveur.");
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
            <h3 className="text-white text-lg">Créer votre compte</h3>
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
            <h1 className="text-slate-900 text-2xl font-bold">Inscription</h1>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-slate-900 text-sm font-medium mb-2 block">Nom</label>
                <input name="nom" value={formData.nom} onChange={handleChange} type="text" required className="text-slate-900 bg-white border border-slate-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500" placeholder="Nom" />
              </div>
              <div>
                <label className="text-slate-900 text-sm font-medium mb-2 block">Prénom</label>
                <input name="prenom" value={formData.prenom} onChange={handleChange} type="text" required className="text-slate-900 bg-white border border-slate-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500" placeholder="Prénom" />
              </div>
            </div>

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