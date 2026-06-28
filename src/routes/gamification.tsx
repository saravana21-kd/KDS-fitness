import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Trophy, Lock, Flame, Zap, Swords, Skull, Crown, Star } from "lucide-react";
import { useAppStore } from "@/store/useAppStore";
import { GlassCard, PageContainer, SectionHeader } from "@/components/ui-kit";

export const Route = createFileRoute("/gamification")({
  head: () => ({ meta: [{ title: "System — KDS Fitness" }] }),
  component: GamificationPage,
});

// Solo-Leveling-style hunter ranks
const RANKS = [
  { min: 1,  rank: "E", title: "E-Rank Hunter",   color: "oklch(0.55 0.04 250)" },
  { min: 5,  rank: "D", title: "D-Rank Hunter",   color: "oklch(0.65 0.10 200)" },
  { min: 10, rank: "C", title: "C-Rank Hunter",   color: "oklch(0.68 0.14 160)" },
  { min: 15, rank: "B", title: "B-Rank Hunter",   color: "oklch(0.72 0.16 90)"  },
  { min: 20, rank: "A", title: "A-Rank Hunter",   color: "oklch(0.70 0.20 40)"  },
  { min: 30, rank: "S", title: "S-Rank Hunter",   color: "oklch(0.72 0.22 320)" },
  { min: 50, rank: "★", title: "Shadow Monarch",  color: "oklch(0.78 0.22 290)" },
];

function rankFor(level: number) {
  return [...RANKS].reverse().find((r) => level >= r.min) ?? RANKS[0];
}

function GamificationPage() {
  const { xp, level, achievements, habits, workouts, photos } = useAppStore();
  const xpInLevel = xp % 500;
  const progress = (xpInLevel / 500) * 100;
  const unlocked = achievements.filter((a) => a.unlocked).length;
  const maxStreak = habits.reduce((m, h) => Math.max(m, h.streak), 0);
  const rank = rankFor(level);
  const nextRank = RANKS.find((r) => r.min > level);

  return (
    <PageContainer>
      <SectionHeader title="The System" subtitle="Arise — your hunter status awaits" />

      {/* Status window */}
      <div className="relative mb-8">
        {/* corner brackets */}
        <div className="absolute -inset-1 pointer-events-none">
          {[0,1,2,3].map((i) => (
            <div key={i} className={`absolute size-6 border-brand ${
              i === 0 ? "top-0 left-0 border-t-2 border-l-2" :
              i === 1 ? "top-0 right-0 border-t-2 border-r-2" :
              i === 2 ? "bottom-0 left-0 border-b-2 border-l-2" :
              "bottom-0 right-0 border-b-2 border-r-2"
            }`} />
          ))}
        </div>
        <div className="rounded-2xl border border-brand/30 bg-gradient-to-br from-brand/5 via-background to-purple-500/5 backdrop-blur-md p-6 md:p-8 relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
               style={{ backgroundImage: "linear-gradient(var(--brand) 1px,transparent 1px),linear-gradient(90deg,var(--brand) 1px,transparent 1px)", backgroundSize: "32px 32px" }} />
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative grid grid-cols-1 md:grid-cols-3 gap-6 items-center"
          >
            {/* Rank sigil */}
            <div className="flex flex-col items-center md:items-start">
              <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-brand mb-2">[ Status Window ]</div>
              <div className="relative">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 rounded-full border-2 border-dashed"
                  style={{ borderColor: rank.color }}
                />
                <div
                  className="size-32 rounded-full flex items-center justify-center font-display text-6xl shadow-2xl"
                  style={{
                    background: `radial-gradient(circle, ${rank.color}40, transparent 70%)`,
                    color: rank.color,
                    textShadow: `0 0 24px ${rank.color}`,
                  }}
                >
                  {rank.rank}
                </div>
              </div>
              <div className="mt-3 font-display text-xl uppercase tracking-wider" style={{ color: rank.color }}>{rank.title}</div>
            </div>

            {/* Stats */}
            <div className="md:col-span-2 space-y-4">
              <div>
                <div className="flex justify-between text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-2">
                  <span>Power Level</span>
                  <span>{xp.toLocaleString()} XP</span>
                </div>
                <div className="flex items-baseline gap-3">
                  <span className="font-display text-7xl text-brand" style={{ textShadow: "0 0 30px var(--brand)" }}>{level}</span>
                  <span className="text-sm text-muted-foreground">Lv</span>
                  {nextRank && (
                    <span className="ml-auto text-xs font-mono text-muted-foreground">
                      Next: <span className="text-brand">{nextRank.rank}</span> @ Lv {nextRank.min}
                    </span>
                  )}
                </div>
                <div className="mt-3 h-2 bg-secondary rounded-full overflow-hidden relative">
                  <motion.div
                    className="h-full bg-gradient-to-r from-brand via-blue-500 to-purple-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 1.2 }}
                  />
                  <div className="absolute inset-0 animate-pulse bg-brand/20 mix-blend-overlay pointer-events-none" />
                </div>
                <div className="text-[10px] font-mono text-muted-foreground mt-1">{xpInLevel} / 500 XP to next level</div>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <SystemStat icon={<Flame className="size-4" />} label="Top Streak" value={`${maxStreak}d`} />
                <SystemStat icon={<Swords className="size-4" />} label="Battles" value={workouts.length} />
                <SystemStat icon={<Star className="size-4" />} label="Quests" value={`${unlocked}/${achievements.length}`} />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <SectionHeader title="Quest Log" subtitle="System-assigned objectives" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {achievements.map((a, i) => (
          <motion.div
            key={a.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <div className={`relative rounded-xl border p-5 backdrop-blur-md overflow-hidden ${
              a.unlocked
                ? "border-brand/50 bg-gradient-to-br from-brand/10 to-purple-500/5"
                : "border-border bg-card/40 opacity-70"
            }`}>
              {/* corner brackets */}
              {a.unlocked && (
                <>
                  <div className="absolute top-1 left-1 size-3 border-t border-l border-brand" />
                  <div className="absolute top-1 right-1 size-3 border-t border-r border-brand" />
                  <div className="absolute bottom-1 left-1 size-3 border-b border-l border-brand" />
                  <div className="absolute bottom-1 right-1 size-3 border-b border-r border-brand" />
                </>
              )}
              <div className="flex items-start gap-3">
                <div className={`size-12 rounded-lg flex items-center justify-center shrink-0 ${
                  a.unlocked
                    ? "bg-brand/15 border border-brand/40 text-brand shadow-[0_0_20px_var(--brand)]"
                    : "bg-secondary border border-border text-muted-foreground"
                }`}>
                  {a.unlocked ? <Crown className="size-5" /> : <Lock className="size-5" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-brand">[Quest]</span>
                    {a.unlocked && <span className="text-[10px] font-mono uppercase text-success">CLEARED</span>}
                  </div>
                  <h4 className="font-display text-lg tracking-wide uppercase truncate">{a.title}</h4>
                  <p className="text-xs text-muted-foreground mt-1">{a.description}</p>
                  {a.unlocked && a.date && (
                    <p className="text-[10px] font-mono text-brand mt-2">CLEARED · {a.date}</p>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <SectionHeader title="System Rewards" subtitle="How to gain experience" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          ["Complete a workout", "+50 EXP", <Swords key="s" className="size-4" />],
          ["Log a meal", "+10 EXP", <Trophy key="t" className="size-4" />],
          ["Upload a progress photo", "+20 EXP", <Star key="st" className="size-4" />],
          ["Complete a habit", "+5 EXP", <Flame key="f" className="size-4" />],
          ["Log body metric", "+15 EXP", <Zap key="z" className="size-4" />],
          ["7-day streak", "Quest", <Crown key="c" className="size-4" />],
          ["10 progress photos", "Quest", <Crown key="c2" className="size-4" />],
          ["Below 15% body fat", "Quest", <Skull key="sk" className="size-4" />],
        ].map(([what, reward, icon]) => (
          <div key={what as string} className="flex items-center justify-between gap-2 p-3 rounded-lg border border-border bg-card/40">
            <div className="flex items-center gap-2 min-w-0">
              <span className="text-brand">{icon}</span>
              <span className="text-sm truncate">{what as string}</span>
            </div>
            <span className="font-mono text-xs text-brand font-bold shrink-0">{reward as string}</span>
          </div>
        ))}
      </div>

      <p className="text-xs text-center text-muted-foreground font-mono mt-12">
        {photos.length} photos · {workouts.length} battles · arise, hunter
      </p>
    </PageContainer>
  );
}

function SystemStat({ icon, label, value }: { icon: React.ReactNode; label: string; value: string | number }) {
  return (
    <div className="p-3 rounded-lg bg-background/60 border border-border">
      <div className="flex items-center gap-1.5 text-muted-foreground mb-1">
        <span className="text-brand">{icon}</span>
        <span className="text-[10px] uppercase tracking-widest font-mono">{label}</span>
      </div>
      <div className="font-display text-2xl">{value}</div>
    </div>
  );
}
