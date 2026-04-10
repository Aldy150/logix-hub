import { Phone, Mail, Video, Trophy, Plus, Calendar } from "lucide-react";

const activities = [
  { id: "1", type: "appel", description: "Appel de suivi avec Marie Laurent", contact: "TechCorp", date: "21 mars 2026", heure: "14:30", duree: "25 min", statut: "terminé" },
  { id: "2", type: "email", description: "Envoi proposition commerciale", contact: "InnovaTech", date: "21 mars 2026", heure: "11:00", duree: "-", statut: "terminé" },
  { id: "3", type: "reunion", description: "Démo produit - phase 2", contact: "CloudNet", date: "21 mars 2026", heure: "16:00", duree: "1h", statut: "planifié" },
  { id: "4", type: "appel", description: "Premier contact avec prospect", contact: "GreenTech", date: "20 mars 2026", heure: "10:00", duree: "15 min", statut: "terminé" },
  { id: "5", type: "deal", description: "Contrat Migration Cloud signé", contact: "CloudNet", date: "20 mars 2026", heure: "09:00", duree: "-", statut: "terminé" },
  { id: "6", type: "reunion", description: "Revue trimestrielle", contact: "FinPro", date: "19 mars 2026", heure: "14:00", duree: "45 min", statut: "terminé" },
  { id: "7", type: "email", description: "Relance devis en attente", contact: "NexGen", date: "19 mars 2026", heure: "09:30", duree: "-", statut: "terminé" },
  { id: "8", type: "appel", description: "Négociation finale tarifs", contact: "FinPro", date: "18 mars 2026", heure: "11:00", duree: "40 min", statut: "terminé" },
  { id: "9", type: "deal", description: "Relance client", contact: "Fluno", date: "26 fevrier 2026", heure: "16:00", duree: "20 min", statut: "terminé" }
] 

const typeConfig: Record<string, { icon: typeof Phone; bg: string }> = {
  appel: { icon: Phone, bg: "bg-primary/10 text-primary" },
  email: { icon: Mail, bg: "bg-[hsl(var(--chart-2))]/10 text-[hsl(var(--chart-2))]" },
  reunion: { icon: Video, bg: "bg-[hsl(var(--chart-3))]/10 text-[hsl(var(--chart-3))]" },
  deal: { icon: Trophy, bg: "bg-warning/10 text-warning" },
};

export default function Activities() {
  const grouped = activities.reduce((acc, a) => {
    if (!acc[a.date]) acc[a.date] = [];
    acc[a.date].push(a);
    return acc;
  }, {} as Record<string, typeof activities>);

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between animate-fade-up">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Activités</h1>
          <p className="text-sm text-muted-foreground mt-1">Historique de vos interactions</p>
        </div>
        <button className="inline-flex items-center gap-2 h-9 px-4 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors active:scale-[0.97]">
          <Plus className="h-4 w-4" />
          Nouvelle activité
        </button>
      </div>

      <div className="space-y-8 animate-fade-up stagger-1">
        {Object.entries(grouped).map(([date, acts]) => (
          <div key={date}>
            <div className="flex items-center gap-2 mb-3">
              <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
              <h3 className="text-sm font-medium text-muted-foreground">{date}</h3>
            </div>
            <div className="space-y-2 ml-5 border-l-2 border-border pl-5">
              {acts.map((a) => {
                const config = typeConfig[a.type];
                const Icon = config.icon;
                return (
                  <div key={a.id} className="flex items-start gap-3 rounded-xl border bg-card p-4 shadow-sm hover:shadow-md transition-shadow group">
                    <div className={`h-9 w-9 rounded-lg ${config.bg} flex items-center justify-center shrink-0`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">{a.description}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{a.contact} · {a.heure} · {a.duree}</p>
                    </div>
                    <span className={`text-[11px] px-2 py-0.5 rounded-md shrink-0 ${
                      a.statut === "planifié" ? "bg-primary/10 text-primary" : "bg-secondary text-muted-foreground"
                    }`}>
                      {a.statut === "planifié" ? "Planifié" : "Terminé"}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
