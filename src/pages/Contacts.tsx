import { useState } from "react";
import { Search, Plus, MoreHorizontal, ArrowUpDown, X } from "lucide-react";
import { contacts, Contact } from "@/data/crmData";
import AjoutClient from "./AjoutClient"; // Assure-toi que le nom du fichier est correct

const statutColors: Record<Contact["statut"], string> = {
  client: "bg-primary/10 text-primary",
  prospect: "bg-chart-2/10 text-[hsl(var(--chart-2))]",
  lead: "bg-warning/10 text-warning",
  inactif: "bg-muted text-muted-foreground",
};

const statutLabels: Record<Contact["statut"], string> = {
  client: "Client",
  prospect: "Prospect",
  lead: "Lead",
  inactif: "Inactif",
};

export default function Contacts() {
  const [search, setSearch] = useState("");
  const [filterStatut, setFilterStatut] = useState<string>("tous");
  
  // États pour la modale et le chargement
  const [showClientForm, setShowClientForm] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const filtered = contacts.filter((c) => {
    const matchSearch =
      c.nom.toLowerCase().includes(search.toLowerCase()) ||
      c.entreprise.toLowerCase().includes(search.toLowerCase());
    const matchStatut = filterStatut === "tous" || c.statut === filterStatut;
    return matchSearch && matchStatut;
  });

  // Fonction avec le setTimeout
  const handleOpenModal = () => {
    setIsPending(true);
    // On attend 500ms avant d'afficher la modale pour l'effet de style
    setTimeout(() => {
      setIsPending(false);
      setShowClientForm(true);
    }, 500);
  };

  return (
    <div className="relative space-y-6 max-w-7xl">
      
      {/* --- MODALE --- */}
      {showClientForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-xl shadow-2xl animate-in fade-in zoom-in duration-200">
            {/* Bouton pour fermer la modale */}
            <button 
              onClick={() => setShowClientForm(false)}
              className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors z-10"
            >
              <X className="h-6 w-6 text-gray-500" />
            </button>
            
            <AjoutClient /> 
          </div>
        </div>
      )}

      {/* --- HEADER --- */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 animate-fade-up">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Contacts</h1>
          <p className="text-sm text-muted-foreground mt-1">{contacts.length} contacts au total</p>
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
          {isPending ? "Chargement..." : "Nouveau contact"}
        </button>
      </div>

      {/* --- FILTRES --- */}
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
          {["tous", "client", "prospect", "lead", "inactif"].map((s) => (
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

      {/* --- TABLEAU --- */}
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
              {filtered.map((c) => (
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
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}