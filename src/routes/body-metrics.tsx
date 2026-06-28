import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid, PieChart, Pie, Cell, Legend } from "recharts";
import { useAppStore, todaysDate } from "@/store/useAppStore";
import { GlassCard, PageContainer, SectionHeader } from "@/components/ui-kit";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/body-metrics")({
  head: () => ({ meta: [{ title: "Body Metrics — KDS Fitness" }] }),
  component: MetricsPage,
});

function MetricsPage() {
  const { metrics, addMetric, deleteMetric, profile } = useAppStore();
  const [draft, setDraft] = useState({
    date: todaysDate(),
    weight: profile.weight,
    bodyFatPct: profile.bodyFatPct,
    waist: 80,
    shoulder: 110,
  });

  const sorted = useMemo(() => [...metrics].sort((a, b) => a.date.localeCompare(b.date)), [metrics]);

  return (
    <PageContainer>
      <SectionHeader title="Body Metrics" subtitle="Weight · BF% · Measurements" />

      <GlassCard className="mb-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          <div>
            <Label className="text-[10px] uppercase tracking-widest text-muted-foreground">Date</Label>
            <Input type="date" value={draft.date} onChange={(e) => setDraft({ ...draft, date: e.target.value })} className="mt-1" />
          </div>
          <div>
            <Label className="text-[10px] uppercase tracking-widest text-muted-foreground">Weight (kg)</Label>
            <Input type="number" step="0.1" value={draft.weight} onChange={(e) => setDraft({ ...draft, weight: parseFloat(e.target.value) || 0 })} className="mt-1" />
          </div>
          <div>
            <Label className="text-[10px] uppercase tracking-widest text-muted-foreground">Body Fat %</Label>
            <Input type="number" step="0.1" value={draft.bodyFatPct} onChange={(e) => setDraft({ ...draft, bodyFatPct: parseFloat(e.target.value) || 0 })} className="mt-1" />
          </div>
          <div>
            <Label className="text-[10px] uppercase tracking-widest text-muted-foreground">Waist (cm)</Label>
            <Input type="number" step="0.5" value={draft.waist} onChange={(e) => setDraft({ ...draft, waist: parseFloat(e.target.value) || 0 })} className="mt-1" />
          </div>
          <div>
            <Label className="text-[10px] uppercase tracking-widest text-muted-foreground">Shoulder (cm)</Label>
            <Input type="number" step="0.5" value={draft.shoulder} onChange={(e) => setDraft({ ...draft, shoulder: parseFloat(e.target.value) || 0 })} className="mt-1" />
          </div>
        </div>
        <Button className="mt-4 bg-brand text-brand-foreground" onClick={() => addMetric(draft)}>
          <Plus className="size-4 mr-1" /> Log Measurement
        </Button>
      </GlassCard>

      {sorted.length >= 1 && (
        <GlassCard className="mb-8">
          <h3 className="font-display text-lg mb-4">Body Composition</h3>
          <CompositionPie weight={sorted[sorted.length - 1].weight} bfPct={sorted[sorted.length - 1].bodyFatPct} />
        </GlassCard>
      )}

      {sorted.length > 1 && (
        <GlassCard className="mb-8">
          <h3 className="font-display text-lg mb-4">Progress Charts</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ChartBlock title="Weight (kg)" data={sorted} dataKey="weight" />
            <ChartBlock title="Body Fat %" data={sorted} dataKey="bodyFatPct" />
            <ChartBlock title="Waist (cm)" data={sorted} dataKey="waist" />
            <ChartBlock title="Shoulder (cm)" data={sorted} dataKey="shoulder" />
          </div>
        </GlassCard>
      )}

      <SectionHeader title="History" subtitle={`${sorted.length} entries`} />
      <div className="space-y-2">
        {[...sorted].reverse().map((m) => (
          <GlassCard key={m.date} className="flex flex-wrap items-center gap-4">
            <span className="font-mono text-xs text-muted-foreground w-24">{m.date}</span>
            <span className="text-sm">{m.weight}kg</span>
            <span className="text-sm text-brand">{m.bodyFatPct}% BF</span>
            <span className="text-sm">W {m.waist}cm</span>
            <span className="text-sm">SH {m.shoulder}cm</span>
            <Button variant="ghost" size="sm" className="ml-auto text-destructive" onClick={() => deleteMetric(m.date)}>
              <Trash2 className="size-4" />
            </Button>
          </GlassCard>
        ))}
      </div>
    </PageContainer>
  );
}

function ChartBlock({ title, data, dataKey }: { title: string; data: any[]; dataKey: string }) {
  return (
    <div>
      <h4 className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-2">{title}</h4>
      <div className="h-44">
        <ResponsiveContainer>
          <LineChart data={data}>
            <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="date" tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} domain={["auto", "auto"]} />
            <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 12 }} />
            <Line type="monotone" dataKey={dataKey} stroke="var(--brand)" strokeWidth={2.5} dot={{ r: 3 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function CompositionPie({ weight, bfPct }: { weight: number; bfPct: number }) {
  const fatMass = +(weight * (bfPct / 100)).toFixed(1);
  const leanMass = +(weight - fatMass).toFixed(1);
  const data = [
    { name: "Lean Mass", value: leanMass, fill: "var(--brand)" },
    { name: "Fat Mass", value: fatMass, fill: "oklch(0.65 0.18 30)" },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
      <div className="h-64">
        <ResponsiveContainer>
          <PieChart>
            <Pie data={data} innerRadius={60} outerRadius={100} paddingAngle={3} dataKey="value" startAngle={90} endAngle={-270}>
              {data.map((d, i) => <Cell key={i} fill={d.fill} />)}
            </Pie>
            <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 12 }} />
            <Legend wrapperStyle={{ fontSize: 12 }} />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="space-y-3">
        <div className="p-4 rounded-xl bg-background/40 border border-border">
          <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Total Weight</div>
          <div className="font-display text-3xl">{weight} <span className="text-base text-muted-foreground">kg</span></div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="p-4 rounded-xl bg-brand/10 border border-brand/30">
            <div className="text-[10px] font-mono uppercase tracking-widest text-brand">Lean Mass</div>
            <div className="font-display text-2xl">{leanMass} kg</div>
            <div className="text-xs text-muted-foreground">{(100 - bfPct).toFixed(1)}%</div>
          </div>
          <div className="p-4 rounded-xl border border-border bg-background/40">
            <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Fat Mass</div>
            <div className="font-display text-2xl">{fatMass} kg</div>
            <div className="text-xs text-muted-foreground">{bfPct}%</div>
          </div>
        </div>
      </div>
    </div>
  );
}
