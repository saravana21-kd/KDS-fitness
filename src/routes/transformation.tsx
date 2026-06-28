import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Plus, Trash2, Check } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { useAppStore, type RoadmapPhase } from "@/store/useAppStore";
import { GlassCard, PageContainer, SectionHeader } from "@/components/ui-kit";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

export const Route = createFileRoute("/transformation")({
  head: () => ({ meta: [{ title: "Transformation Roadmap — KDS Fitness" }] }),
  component: TransformationPage,
});

const STATUS_LABEL: Record<RoadmapPhase["status"], string> = {
  completed: "COMPLETED",
  "in-progress": "IN PROGRESS",
  locked: "LOCKED",
};

function TransformationPage() {
  const { roadmap, addPhase, updatePhase, deletePhase } = useAppStore();
  const overall = roadmap.length
    ? Math.round(roadmap.reduce((a, p) => a + p.progress, 0) / roadmap.length)
    : 0;
  const completed = roadmap.filter((p) => p.status === "completed").length;
  const inProgress = roadmap.filter((p) => p.status === "in-progress").length;
  const locked = roadmap.filter((p) => p.status === "locked").length;
  const pieData = [
    { name: "Completed", value: completed, fill: "oklch(0.72 0.18 145)" },
    { name: "In Progress", value: inProgress, fill: "var(--brand)" },
    { name: "Locked", value: locked, fill: "var(--secondary)" },
  ];
  const phaseData = roadmap.map((p) => ({ name: p.title, value: p.progress }));

  return (
    <PageContainer>
      <SectionHeader
        title="Physique Roadmap"
        subtitle="Editable mission timeline"
        action={
          <Button onClick={addPhase} className="bg-brand text-brand-foreground">
            <Plus className="size-4 mr-1" /> Add Phase
          </Button>
        }
      />

      <GlassCard className="mb-8 relative overflow-hidden">
        <div className="absolute -top-32 -right-32 size-64 bg-brand/10 rounded-full blur-3xl pointer-events-none" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center relative">
          <div>
            <p className="text-[10px] uppercase tracking-widest text-brand font-mono mb-2">Overall Completion</p>
            <div className="font-display text-7xl">{overall}%</div>
            <p className="text-sm text-muted-foreground mt-2">
              {completed} completed · {inProgress} in progress · {locked} locked
            </p>
            <div className="h-2 bg-secondary rounded-full mt-4 overflow-hidden max-w-sm">
              <motion.div
                className="h-full bg-gradient-to-r from-brand to-blue-500"
                initial={{ width: 0 }}
                animate={{ width: `${overall}%` }}
                transition={{ duration: 1.2 }}
              />
            </div>
          </div>
          <div className="h-56">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={pieData}
                  innerRadius={55}
                  outerRadius={90}
                  paddingAngle={3}
                  dataKey="value"
                  startAngle={90}
                  endAngle={-270}
                >
                  {pieData.map((d, i) => <Cell key={i} fill={d.fill} />)}
                </Pie>
                <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        {phaseData.length > 0 && (
          <div className="mt-6 pt-6 border-t border-border grid grid-cols-2 md:grid-cols-4 gap-3 relative">
            {phaseData.map((p, i) => (
              <div key={i}>
                <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-mono truncate">{p.name}</div>
                <div className="font-display text-2xl text-brand">{p.value}%</div>
              </div>
            ))}
          </div>
        )}
      </GlassCard>

      <div className="space-y-4">
        {roadmap.map((phase, i) => (
          <PhaseCard key={phase.id} phase={phase} index={i} onUpdate={updatePhase} onDelete={deletePhase} />
        ))}
      </div>
    </PageContainer>
  );
}

function PhaseCard({
  phase, index, onUpdate, onDelete,
}: {
  phase: RoadmapPhase;
  index: number;
  onUpdate: (id: string, p: Partial<RoadmapPhase>) => void;
  onDelete: (id: string) => void;
}) {
  const statusColor =
    phase.status === "completed" ? "text-success border-success/30 bg-success/10" :
    phase.status === "in-progress" ? "text-brand border-brand/30 bg-brand/10" :
    "text-muted-foreground border-border bg-secondary";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className={`rounded-2xl border ${phase.status === "in-progress" ? "border-brand/30" : "border-border"} bg-card/50 backdrop-blur-md overflow-hidden`}
    >
      <button
        onClick={() => onUpdate(phase.id, { expanded: !phase.expanded })}
        className="w-full p-5 md:p-6 flex items-center justify-between gap-4 text-left hover:bg-secondary/30 transition-colors"
      >
        <div className="flex items-center gap-4 min-w-0">
          <span className="font-display text-3xl text-brand shrink-0">{String(index + 1).padStart(2, "0")}</span>
          <div className="min-w-0">
            <h3 className="font-display text-lg md:text-xl tracking-wide uppercase truncate">{phase.title}</h3>
            <p className="text-xs md:text-sm text-muted-foreground truncate">{phase.description}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <span className={`px-2 py-1 text-[10px] font-mono font-bold rounded border ${statusColor} hidden sm:inline`}>
            {STATUS_LABEL[phase.status]}
          </span>
          <ChevronDown className={`size-5 text-muted-foreground transition-transform ${phase.expanded ? "rotate-180" : ""}`} />
        </div>
      </button>
      <AnimatePresence>
        {phase.expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-border"
          >
            <div className="p-5 md:p-6 space-y-4">
              <div>
                <Label className="text-[10px] uppercase tracking-widest text-muted-foreground">Title</Label>
                <Input value={phase.title} onChange={(e) => onUpdate(phase.id, { title: e.target.value })} className="mt-1" />
              </div>
              <div>
                <Label className="text-[10px] uppercase tracking-widest text-muted-foreground">Description</Label>
                <Input value={phase.description} onChange={(e) => onUpdate(phase.id, { description: e.target.value })} className="mt-1" />
              </div>
              <div>
                <Label className="text-[10px] uppercase tracking-widest text-muted-foreground">Notes</Label>
                <Textarea value={phase.notes} onChange={(e) => onUpdate(phase.id, { notes: e.target.value })} className="mt-1" rows={3} />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <Label className="text-[10px] uppercase tracking-widest text-muted-foreground">Progress</Label>
                  <span className="font-mono text-xs text-brand">{phase.progress}%</span>
                </div>
                <Slider
                  value={[phase.progress]}
                  onValueChange={(v) => onUpdate(phase.id, { progress: v[0] })}
                  max={100}
                  step={5}
                />
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <Label className="text-[10px] uppercase tracking-widest text-muted-foreground mr-2">Status</Label>
                {(["locked", "in-progress", "completed"] as const).map((s) => (
                  <button
                    key={s}
                    onClick={() => onUpdate(phase.id, { status: s, progress: s === "completed" ? 100 : phase.progress })}
                    className={`px-3 py-1 rounded-full text-xs font-mono uppercase transition-colors ${
                      phase.status === s
                        ? "bg-brand text-brand-foreground"
                        : "bg-secondary text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {s === "in-progress" && phase.status === s && <Check className="inline size-3 mr-1" />}
                    {STATUS_LABEL[s]}
                  </button>
                ))}
                <Button
                  variant="ghost"
                  size="sm"
                  className="ml-auto text-destructive hover:text-destructive"
                  onClick={() => onDelete(phase.id)}
                >
                  <Trash2 className="size-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
