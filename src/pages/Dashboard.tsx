import { Users, Euro, Handshake, Target, Phone, Mail, Video, Trophy,ShoppingCart } from "lucide-react";
import { KPICard } from "@/components/KPICard";
import { revenueData, dealsByStage, activityData, recentActivities } from "@/data/crmData";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, BarChart, Bar, Legend,
} from "recharts";

const activityIcons: Record<string, typeof Phone> = {
  appel: Phone,
  email: Mail,
  reunion: Video,
  deal: Trophy,
};

export default function Dashboard() {
  return (
    <div className="space-y-6 max-w-7xl">
      <div className="animate-fade-up">
        <h1 className="text-2xl font-semibold tracking-tight">Tableau de bord</h1>
        <p className="text-sm text-muted-foreground mt-1">Vue d'ensemble de votre activité commerciale</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard title="Revenu total" value="72 500 €" change={12.3} icon={<Euro className="h-5 w-5" />} className="animate-fade-up stagger-1" />
        <KPICard title="Nouveaux clients" value="147" change={8.1} icon={<Users className="h-5 w-5" />} className="animate-fade-up stagger-2" />
        <KPICard title="Deals en cours" value="23" change={-3.2} icon={<Handshake className="h-5 w-5" />} className="animate-fade-up stagger-3" />
        <KPICard title="Taux de conversion" value="34.2%" change={5.7} icon={<Target className="h-5 w-5" />} className="animate-fade-up stagger-4" />
        <KPICard title="Nombre de ventes" value="153" change={5.7} icon={<ShoppingCart className="h-5 w-5" />} className="animate-fade-up stagger-4" />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Revenue chart */}
        <div className="lg:col-span-2 rounded-xl border bg-card p-5 shadow-sm animate-fade-up stagger-3">
          <h2 className="text-sm font-medium mb-4">Revenu mensuel</h2>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
              <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" tickFormatter={(v) => `${v / 1000}k`} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                  fontSize: "12px",
                }}
                formatter={(value: number) => [`${value.toLocaleString("fr-FR")} €`, ""]}
              />
              <Area type="monotone" dataKey="objectif" stroke="hsl(var(--muted-foreground))" strokeDasharray="4 4" strokeWidth={1.5} fill="none" name="Objectif" />
              <Area type="monotone" dataKey="revenue" stroke="hsl(var(--chart-1))" strokeWidth={2} fill="url(#colorRevenue)" name="Revenu" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Deals by stage */}
        <div className="rounded-xl border bg-card p-5 shadow-sm animate-fade-up stagger-4">
          <h2 className="text-sm font-medium mb-4">Deals par étape</h2>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={dealsByStage}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={3}
                dataKey="value"
              >
                {dealsByStage.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                  fontSize: "12px",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2">
            {dealsByStage.map((s) => (
              <div key={s.name} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: s.color }} />
                {s.name}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Activity + Recent */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 rounded-xl border bg-card p-5 shadow-sm animate-fade-up stagger-4">
          <h2 className="text-sm font-medium mb-4">Activité hebdomadaire</h2>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={activityData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="jour" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
              <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                  fontSize: "12px",
                }}
              />
              <Legend wrapperStyle={{ fontSize: "12px" }} />
              <Bar dataKey="appels" fill="hsl(var(--chart-1))" radius={[4, 4, 0, 0]} name="Appels" />
              <Bar dataKey="emails" fill="hsl(var(--chart-2))" radius={[4, 4, 0, 0]} name="Emails" />
              <Bar dataKey="réunions" fill="hsl(var(--chart-3))" radius={[4, 4, 0, 0]} name="Réunions" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-xl border bg-card p-5 shadow-sm animate-fade-up stagger-5">
          <h2 className="text-sm font-medium mb-4">Activité récente</h2>
          <div className="space-y-3">
            {recentActivities.map((a) => {
              const Icon = activityIcons[a.type] || Phone;
              return (
                <div key={a.id} className="flex items-start gap-3 group">
                  <div className="h-8 w-8 rounded-lg bg-secondary flex items-center justify-center shrink-0 group-hover:bg-primary/10 transition-colors">
                    <Icon className="h-3.5 w-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm leading-snug truncate">{a.description}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{a.temps}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
