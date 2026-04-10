import { deals, Deal } from "@/data/crmData";

type Etape = Deal["etape"];

const etapeConfig: Record<Etape, { label: string; color: string }> = {
  prospection: { label: "Prospection", color: "border-t-[hsl(var(--chart-4))]" },
  qualification: { label: "Qualification", color: "border-t-[hsl(var(--chart-2))]" },
  proposition: { label: "Proposition", color: "border-t-[hsl(var(--chart-3))]" },
  negociation: { label: "Négociation", color: "border-t-[hsl(var(--chart-1))]" },
  gagne: { label: "Gagné", color: "border-t-primary" },
  perdu: { label: "Perdu", color: "border-t-destructive" },
};

const etapeOrder: Etape[] = ["prospection", "qualification", "proposition", "negociation", "gagne", "perdu"];

export default function Pipeline() {
  const dealsByEtape = etapeOrder.reduce(
    (acc, etape) => {
      acc[etape] = deals.filter((d) => d.etape === etape);
      return acc;
    },
    {} as Record<Etape, Deal[]>
  );

  return (
    <div className="space-y-6">
      <div className="animate-fade-up">
        <h1 className="text-2xl font-semibold tracking-tight">Pipeline</h1>
        <p className="text-sm text-muted-foreground mt-1">
          {deals.length} deals · {deals.filter(d => d.etape !== "perdu").reduce((s, d) => s + d.valeur, 0).toLocaleString("fr-FR")} € en cours
        </p>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-4 animate-fade-up stagger-1">
        {etapeOrder.map((etape, colIdx) => {
          const config = etapeConfig[etape];
          const columnDeals = dealsByEtape[etape];
          const totalValue = columnDeals.reduce((s, d) => s + d.valeur, 0);

          return (
            <div key={etape} className="min-w-[280px] flex-1">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-medium">{config.label}</h3>
                  <span className="text-xs text-muted-foreground bg-secondary rounded-full px-2 py-0.5 tabular-nums">
                    {columnDeals.length}
                  </span>
                </div>
                <span className="text-xs text-muted-foreground tabular-nums">
                  {totalValue.toLocaleString("fr-FR")} €
                </span>
              </div>

              <div className="space-y-2.5">
                {columnDeals.map((deal, idx) => (
                  <div
                    key={deal.id}
                    className={`rounded-xl border border-t-2 ${config.color} bg-card p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer active:scale-[0.98] animate-fade-up`}
                    style={{ animationDelay: `${colIdx * 60 + idx * 80}ms` }}
                  >
                    <p className="font-medium text-sm">{deal.titre}</p>
                    <p className="text-xs text-muted-foreground mt-1">{deal.entreprise}</p>
                    <div className="flex items-center justify-between mt-3">
                      <span className="text-sm font-semibold tabular-nums">
                        {deal.valeur.toLocaleString("fr-FR")} €
                      </span>
                      <span className="text-xs text-muted-foreground tabular-nums">
                        {deal.probabilite}%
                      </span>
                    </div>
                    <div className="mt-2 h-1.5 rounded-full bg-secondary overflow-hidden">
                      <div
                        className="h-full rounded-full bg-primary transition-all"
                        style={{ width: `${deal.probabilite}%` }}
                      />
                    </div>
                    <div className="flex items-center justify-between mt-2.5">
                      <span className="text-[11px] text-muted-foreground">{deal.contact}</span>
                      <span className="text-[11px] text-muted-foreground tabular-nums">
                        {new Date(deal.dateCloture).toLocaleDateString("fr-FR", { day: "numeric", month: "short" })}
                      </span>
                    </div>
                  </div>
                ))}
                {columnDeals.length === 0 && (
                  <div className="rounded-xl border border-dashed p-6 text-center text-xs text-muted-foreground">
                    Aucun deal
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
