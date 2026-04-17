

export const revenueData = [
  { month: "Jan", revenue: 42000, objectif: 40000 },
  { month: "Fév", revenue: 38500, objectif: 42000 },
  { month: "Mar", revenue: 51200, objectif: 45000 },
  { month: "Avr", revenue: 47800, objectif: 47000 },
  { month: "Mai", revenue: 53400, objectif: 50000 },
  { month: "Jun", revenue: 58900, objectif: 52000 },
  { month: "Jul", revenue: 55200, objectif: 54000 },
  { month: "Aoû", revenue: 61800, objectif: 56000 },
  { month: "Sep", revenue: 64300, objectif: 58000 },
  { month: "Oct", revenue: 59700, objectif: 60000 },
  { month: "Nov", revenue: 68100, objectif: 62000 },
  { month: "Déc", revenue: 72500, objectif: 65000 },
];

export const dealsByStage = [
  { name: "Prospection", value: 34, color: "hsl(var(--chart-1))" },
  { name: "Qualification", value: 22, color: "hsl(var(--chart-2))" },
  { name: "Proposition", value: 15, color: "hsl(var(--chart-3))" },
  { name: "Négociation", value: 8, color: "hsl(var(--chart-4))" },
  { name: "Gagné", value: 12, color: "hsl(var(--chart-1))" },
];

export const activityData = [
  { jour: "Lun", appels: 12, emails: 24, réunions: 3 },
  { jour: "Mar", appels: 18, emails: 31, réunions: 5 },
  { jour: "Mer", appels: 15, emails: 28, réunions: 2 },
  { jour: "Jeu", appels: 22, emails: 35, réunions: 7 },
  { jour: "Ven", appels: 9, emails: 19, réunions: 4 },
];

export type Contact = {
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

export const contacts: Contact[] = [
  { id: "1", nom: "Marie Laurent", email: "m.laurent@techcorp.fr", entreprise: "TechCorp", telephone: "+33 6 12 34 56 78", statut: "client", valeur: 45000, dernierContact: "2026-03-19", initials: "ML" },
  { id: "2", nom: "Thomas Dubois", email: "t.dubois@innovatech.fr", entreprise: "InnovaTech", telephone: "+33 6 98 76 54 32", statut: "prospect", valeur: 28000, dernierContact: "2026-03-18", initials: "TD" },
  { id: "3", nom: "Sophie Martin", email: "s.martin@dataviz.io", entreprise: "DataViz", telephone: "+33 6 45 67 89 01", statut: "relance", valeur: 15000, dernierContact: "2026-03-20", initials: "SM" },
  { id: "4", nom: "Lucas Bernard", email: "l.bernard@cloudnet.fr", entreprise: "CloudNet", telephone: "+33 6 23 45 67 89", statut: "client", valeur: 72000, dernierContact: "2026-03-17", initials: "LB" },
  { id: "5", nom: "Emma Petit", email: "e.petit@greentech.co", entreprise: "GreenTech", telephone: "+33 6 34 56 78 90", statut: "prospect", valeur: 33000, dernierContact: "2026-03-15", initials: "EP" },
  { id: "6", nom: "Hugo Moreau", email: "h.moreau@finpro.fr", entreprise: "FinPro", telephone: "+33 6 56 78 90 12", statut: "client", valeur: 89000, dernierContact: "2026-03-21", initials: "HM" },
  { id: "7", nom: "Léa Roux", email: "l.roux@mediasphere.fr", entreprise: "MediaSphere", telephone: "+33 6 67 89 01 23", statut: "inactif", valeur: 12000, dernierContact: "2026-02-28", initials: "LR" },
  { id: "8", nom: "Antoine Leroy", email: "a.leroy@buildex.fr", entreprise: "BuildEx", telephone: "+33 6 78 90 12 34", statut: "relance", valeur: 19500, dernierContact: "2026-03-16", initials: "AL" },
  { id: "9", nom: "Camille Girard", email: "c.girard@nexgen.io", entreprise: "NexGen", telephone: "+33 6 89 01 23 45", statut: "prospect", valeur: 41000, dernierContact: "2026-03-14", initials: "CG" },
  { id: "10", nom: "Nathan Fournier", email: "n.fournier@logipro.fr", entreprise: "LogiPro", telephone: "+33 6 90 12 34 56", statut: "client", valeur: 56000, dernierContact: "2026-03-20", initials: "NF" },
];

export type Deal = {
  id: string;
  titre: string;
  entreprise: string;
  valeur: number;
  etape: "prospection" | "qualification" | "proposition" | "negociation" | "gagne" | "perdu";
  probabilite: number;
  contact: string;
  dateCloture: string;
};

export const deals: Deal[] = [
  { id: "1", titre: "Contrat SaaS annuel", entreprise: "TechCorp", valeur: 45000, etape: "negociation", probabilite: 75, contact: "Marie Laurent", dateCloture: "2026-04-15" },
  { id: "2", titre: "Licence entreprise", entreprise: "InnovaTech", valeur: 28000, etape: "proposition", probabilite: 50, contact: "Thomas Dubois", dateCloture: "2026-05-01" },
  { id: "3", titre: "Consulting Data", entreprise: "DataViz", valeur: 15000, etape: "prospection", probabilite: 20, contact: "Sophie Martin", dateCloture: "2026-06-10" },
  { id: "4", titre: "Migration Cloud", entreprise: "CloudNet", valeur: 72000, etape: "gagne", probabilite: 100, contact: "Lucas Bernard", dateCloture: "2026-03-10" },
  { id: "5", titre: "Plateforme IoT", entreprise: "GreenTech", valeur: 33000, etape: "qualification", probabilite: 35, contact: "Emma Petit", dateCloture: "2026-05-20" },
  { id: "6", titre: "Solution FinTech", entreprise: "FinPro", valeur: 89000, etape: "negociation", probabilite: 80, contact: "Hugo Moreau", dateCloture: "2026-04-01" },
  { id: "7", titre: "Campagne digitale", entreprise: "MediaSphere", valeur: 12000, etape: "perdu", probabilite: 0, contact: "Léa Roux", dateCloture: "2026-03-05" },
  { id: "8", titre: "Audit sécurité", entreprise: "BuildEx", valeur: 19500, etape: "prospection", probabilite: 15, contact: "Antoine Leroy", dateCloture: "2026-06-30" },
  { id: "9", titre: "ERP sur mesure", entreprise: "NexGen", valeur: 41000, etape: "qualification", probabilite: 40, contact: "Camille Girard", dateCloture: "2026-05-15" },
  { id: "10", titre: "Support premium", entreprise: "LogiPro", valeur: 56000, etape: "proposition", probabilite: 55, contact: "Nathan Fournier", dateCloture: "2026-04-20" },
];

export const recentActivities = [
  { id: "1", type: "appel" as const, description: "Appel avec Marie Laurent - TechCorp", temps: "Il y a 2h" },
  { id: "2", type: "email" as const, description: "Proposition envoyée à InnovaTech", temps: "Il y a 3h" },
  { id: "3", type: "reunion" as const, description: "Réunion de suivi avec CloudNet", temps: "Il y a 5h" },
  { id: "4", type: "deal" as const, description: "Deal gagné : Migration Cloud (72 000 €)", temps: "Hier" },
  { id: "5", type: "email" as const, description: "Relance envoyée à GreenTech", temps: "Hier" },
];
