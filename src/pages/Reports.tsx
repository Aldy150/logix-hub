import { revenueData, dealsByStage, contacts } from "@/data/crmData";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  BarChart, Bar,
} from "recharts";

const conversionData = [
  { mois: "Jan", taux: 28 },
  { mois: "Fév", taux: 31 },
  { mois: "Mar", taux: 27 },
  { mois: "Avr", taux: 33 },
  { mois: "Mai", taux: 36 },
  { mois: "Jun", taux: 34 },
  { mois: "Jul", taux: 38 },
  { mois: "Aoû", taux: 35 },
  { mois: "Sep", taux: 40 },
  { mois: "Oct", taux: 37 },
  { mois: "Nov", taux: 42 },
  { mois: "Déc", taux: 44 },
];

const performanceData = [
  { sujet: "Appels", valeur: 85 },
  { sujet: "Emails", valeur: 72 },
  { sujet: "Réunions", valeur: 65 },
  { sujet: "Closing", valeur: 78 },
  { sujet: "Suivi", valeur: 90 },
  { sujet: "Upsell", valeur: 55 },
];

const topClients = contacts
  .filter((c) => c.statut === "client")
  .sort((a, b) => b.valeur - a.valeur)
  .slice(0, 5)
  .map((c) => ({ nom: c.entreprise, valeur: c.valeur }));

const tooltipStyle = {
  backgroundColor: "hsl(var(--card))",
  border: "1px solid hsl(var(--border))",
  borderRadius: "8px",
  fontSize: "12px",
};

export default function Reports() {
  return (
    <div className="space-y-6 max-w-7xl">
      <div className="animate-fade-up">
        <h1 className="text-2xl font-semibold tracking-tight">Rapports</h1>
        <p className="text-sm text-muted-foreground mt-1">Analyses détaillées de votre performance</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Conversion rate */}
        <div className="rounded-xl border bg-card p-5 shadow-sm animate-fade-up stagger-1">
          <h2 className="text-sm font-medium mb-4">Taux de conversion mensuel</h2>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={conversionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="mois" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
              <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" tickFormatter={(v) => `${v}%`} />
              <Tooltip contentStyle={tooltipStyle} formatter={(v: number) => [`${v}%`, "Taux"]} />
              <Line type="monotone" dataKey="taux" stroke="hsl(var(--chart-1))" strokeWidth={2.5} dot={{ r: 3, fill: "hsl(var(--chart-1))" }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Radar performance */}
        <div className="rounded-xl border bg-card p-5 shadow-sm animate-fade-up stagger-2">
          <h2 className="text-sm font-medium mb-4">Performance commerciale</h2>
          <ResponsiveContainer width="100%" height={260}>
            <RadarChart data={performanceData}>
              <PolarGrid stroke="hsl(var(--border))" />
              <PolarAngleAxis dataKey="sujet" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
              <PolarRadiusAxis tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" />
              <Radar dataKey="valeur" stroke="hsl(var(--chart-1))" fill="hsl(var(--chart-1))" fillOpacity={0.15} strokeWidth={2} />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Top clients */}
        <div className="rounded-xl border bg-card p-5 shadow-sm animate-fade-up stagger-3">
          <h2 className="text-sm font-medium mb-4">Top clients par valeur</h2>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={topClients} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis type="number" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" tickFormatter={(v) => `${v / 1000}k €`} />
              <YAxis type="category" dataKey="nom" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" width={80} />
              <Tooltip contentStyle={tooltipStyle} formatter={(v: number) => [`${v.toLocaleString("fr-FR")} €`, "Valeur"]} />
              <Bar dataKey="valeur" fill="hsl(var(--chart-1))" radius={[0, 6, 6, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Revenue vs objectif */}
        <div className="rounded-xl border bg-card p-5 shadow-sm animate-fade-up stagger-4">
          <h2 className="text-sm font-medium mb-4">Revenu vs Objectif</h2>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
              <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" tickFormatter={(v) => `${v / 1000}k`} />
              <Tooltip contentStyle={tooltipStyle} formatter={(v: number) => [`${v.toLocaleString("fr-FR")} €`, ""]} />
              <Bar dataKey="objectif" fill="hsl(var(--border))" radius={[4, 4, 0, 0]} name="Objectif" />
              <Bar dataKey="revenue" fill="hsl(var(--chart-1))" radius={[4, 4, 0, 0]} name="Revenu" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
