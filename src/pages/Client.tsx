// Contacts.tsx
import { useState, useEffect } from "react";
import { Search, Plus, MoreHorizontal, ArrowUpDown, X } from "lucide-react";
import AjoutClient from "./AjoutClient";

// Définissez le type Contact ici ou importez-le de crmData
type Contact = {
  id: string;
  nom: string;
  email: string;
  entreprise: string;
  telephone: string;
  statut: "client" | "prospect" | "relance" | "inactif";
  valeur: number;
  dernierContact: string;
  initials: string;
};

const statutColors: Record<Contact["statut"], string> = {
  client: "bg-primary/10 text-primary",
  prospect: "bg-chart-2/10 text-[hsl(var(--chart-2))]",
  relance: "bg-warning/10 text-warning",
  inactif: "bg-muted text-muted-foreground",
};

const statutLabels: Record<Contact["statut"], string> = {
  client: "Client",
  prospect: "Prospect",
  relance: "relance",
  inactif: "Inactif",
};

export default function Contacts() {
  const [search, setSearch] = useState("");
  const [filterStatut, setFilterStatut] = useState<string>("tous");
  const [showClientForm, setShowClientForm] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);

  // Récupérer les contacts depuis l'API
  const fetchContacts = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:8000/api/clients");
      if (response.ok) {
        const data = await response.json();
        const formattedContacts = data.map((client: any) => ({
          id: client.id.toString(),
          nom: client.nom,
          email: client.email,
          entreprise: client.entreprise,
          telephone: client.telephone,
          statut: client.statut,
          valeur: client.valeur,
          dernierContact: new Date().toISOString().split('T')[0],
          initials: client.initial || client.nom.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2)
        }));
        setContacts(formattedContacts);
      }
    } catch (error) {
      console.error("Erreur:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const filtered = contacts.filter((c) => {
    const matchSearch =
      c.nom.toLowerCase().includes(search.toLowerCase()) ||
      c.entreprise.toLowerCase().includes(search.toLowerCase());
    const matchStatut = filterStatut === "tous" || c.statut === filterStatut;
    return matchSearch && matchStatut;
  });

  const handleOpenModal = () => {
    setIsPending(true);
    setTimeout(() => {
      setIsPending(false);
      setShowClientForm(true);
    }, 500);
  };

  // Rafraîchir la liste après ajout
  const handleClientAdded = () => {
    setShowClientForm(false);
    fetchContacts();
  };

  return (
    <div className="relative space-y-6 max-w-7xl">
      
      {/* MODALE - inchangée */}
      {showClientForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-xl shadow-2xl animate-in fade-in zoom-in duration-200">
            <button 
              onClick={() => setShowClientForm(false)}
              className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors z-10"
            >
              <X className="h-6 w-6 text-gray-500" />
            </button>
            
            {/* Ajout du callback onSuccess */}
            <AjoutClient onSuccess={handleClientAdded} />
          </div>
        </div>
      )}

      {/* HEADER - inchangé sauf l'affichage du compteur */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 animate-fade-up">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Nouveau Client</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {loading ? "Chargement..." : `${contacts.length} clients au total`}
          </p>
        </div>
        
        <button 
          className={`inline-flex items-center gap-2 h-10 px-4 rounded-lg text-sm font-medium transition-all active:scale-[0.97] ${
            isPending ? "bg-gray-400 cursor-wait" : "bg-primary text-primary-foreground hover:bg-primary/90"
          }`}
          onClick={handleOpenModal}
          disabled={isPending}
        >
          {isPending ? (
            <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <Plus className="h-4 w-4" />
          )}
          {isPending ? "Chargement..." :"Ajouter un client"}
        </button>
      </div>

      {/* FILTRES - inchangé */}
      <div className="flex flex-col sm:flex-row gap-3 animate-fade-up stagger-1">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Rechercher un contact..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-9 rounded-lg border bg-card pl-9 pr-3 text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
          />
        </div>
        <div className="flex gap-1.5 overflow-x-auto pb-2">
          {["tous", "client", "prospect", "relance", "inactif"].map((s) => (
            <button
              key={s}
              onClick={() => setFilterStatut(s)}
              className={`px-3 h-9 rounded-lg text-sm whitespace-nowrap transition-all active:scale-95 ${
                filterStatut === s
                  ? "bg-primary text-primary-foreground"
                  : "bg-card border hover:bg-secondary"
              }`}
            >
              {s === "tous" ? "Tous" : statutLabels[s as Contact["statut"]]}
            </button>
          ))}
        </div>
      </div>

      {/* TABLEAU - inchangé mais avec gestion du chargement */}
      <div className="rounded-xl border bg-card shadow-sm overflow-hidden animate-fade-up stagger-2">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="border-b bg-secondary/30">
                <th className="py-3 px-4 font-medium text-muted-foreground">Nom</th>
                <th className="py-3 px-4 font-medium text-muted-foreground hidden md:table-cell">Entreprise</th>
                <th className="py-3 px-4 font-medium text-muted-foreground hidden lg:table-cell">Email</th>
                <th className="py-3 px-4 font-medium text-muted-foreground">Statut</th>
                <th className="py-3 px-4 font-medium text-muted-foreground text-right hidden sm:table-cell">Valeur</th>
                <th className="w-10 py-3 px-4"></th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-muted-foreground">
                    Chargement...
                  </td>
                </tr>
              ) : (
                filtered.map((c) => (
                  <tr key={c.id} className="border-b last:border-0 hover:bg-secondary/20 transition-colors group">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-semibold">
                          {c.initials}
                        </div>
                        <p className="font-medium">{c.nom}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4 hidden md:table-cell text-muted-foreground">{c.entreprise}</td>
                    <td className="py-3 px-4 hidden lg:table-cell text-muted-foreground">{c.email}</td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex px-2 py-0.5 rounded-md text-xs font-medium ${statutColors[c.statut]}`}>
                        {statutLabels[c.statut]}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right tabular-nums hidden sm:table-cell">
                      {c.valeur.toLocaleString("fr-FR")} FCFA
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button className="p-1 rounded hover:bg-secondary opacity-0 group-hover:opacity-100 transition-all">
                        <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}