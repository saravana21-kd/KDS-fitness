import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useRef, useState } from "react";
import { Camera, Trash2, Upload, Search, X, GitCompare } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppStore, todaysDate } from "@/store/useAppStore";
import { GlassCard, PageContainer, SectionHeader } from "@/components/ui-kit";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/photos")({
  head: () => ({ meta: [{ title: "Progress Photos — KDS Fitness" }] }),
  component: PhotosPage,
});

function PhotosPage() {
  const { photos, addPhoto, deletePhoto } = useAppStore();
  const [caption, setCaption] = useState("");
  const [query, setQuery] = useState("");
  const [lightbox, setLightbox] = useState<string | null>(null);
  const [compareMode, setCompareMode] = useState(false);
  const [picks, setPicks] = useState<string[]>([]);
  const fileRef = useRef<HTMLInputElement>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return photos;
    return photos.filter(
      (p) => p.date.toLowerCase().includes(q) || (p.caption || "").toLowerCase().includes(q)
    );
  }, [photos, query]);

  function handleFiles(files: FileList | null) {
    if (!files) return;
    Array.from(files).forEach((f) => {
      const reader = new FileReader();
      reader.onload = () => {
        addPhoto({ date: todaysDate(), dataUrl: reader.result as string, caption });
      };
      reader.readAsDataURL(f);
    });
    setCaption("");
    if (fileRef.current) fileRef.current.value = "";
  }

  function togglePick(id: string) {
    setPicks((p) => {
      if (p.includes(id)) return p.filter((x) => x !== id);
      if (p.length >= 2) return [p[1], id];
      return [...p, id];
    });
  }

  const a = photos.find((p) => p.id === picks[0]);
  const b = photos.find((p) => p.id === picks[1]);

  return (
    <PageContainer>
      <SectionHeader title="Progress Photos" subtitle="Visual transformation timeline" />

      <GlassCard className="mb-6">
        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-end">
          <div className="flex-1">
            <Input placeholder="Caption (optional, e.g. 'Week 3, morning light')" value={caption} onChange={(e) => setCaption(e.target.value)} />
          </div>
          <input ref={fileRef} type="file" accept="image/*" multiple className="hidden" onChange={(e) => handleFiles(e.target.files)} />
          <Button onClick={() => fileRef.current?.click()} className="bg-brand text-brand-foreground">
            <Upload className="size-4 mr-1" /> Upload Photos
          </Button>
        </div>
      </GlassCard>

      {/* Search + compare toolbar */}
      <GlassCard className="mb-6">
        <div className="flex flex-wrap gap-3 items-center">
          <div className="relative flex-1 min-w-[220px]">
            <Search className="size-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
            <Input
              placeholder='Search by date (e.g. "2025-05") or caption…'
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-9 pr-9"
            />
            {query && (
              <button onClick={() => setQuery("")} className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded hover:bg-secondary">
                <X className="size-3.5 text-muted-foreground" />
              </button>
            )}
          </div>
          <span className="text-xs font-mono text-muted-foreground">
            {filtered.length} / {photos.length} {filtered.length === 1 ? "result" : "results"}
          </span>
          <Button
            variant={compareMode ? "default" : "outline"}
            size="sm"
            onClick={() => { setCompareMode((c) => !c); setPicks([]); }}
            className={compareMode ? "bg-brand text-brand-foreground" : ""}
          >
            <GitCompare className="size-4 mr-1" />
            {compareMode ? `Compare (${picks.length}/2)` : "Compare A / B"}
          </Button>
        </div>
      </GlassCard>

      {/* Compare panel */}
      <AnimatePresence>
        {compareMode && picks.length === 2 && a && b && (
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <GlassCard className="mb-6">
              <div className="grid grid-cols-2 gap-3">
                {[a, b].map((p, i) => (
                  <div key={p.id}>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-display text-2xl text-brand">{i === 0 ? "A" : "B"}</span>
                      <span className="text-xs font-mono text-muted-foreground">{p.date}</span>
                    </div>
                    <div className="aspect-[3/4] rounded-xl overflow-hidden border border-border">
                      <img src={p.dataUrl} alt={p.caption || "Progress"} className="size-full object-cover" />
                    </div>
                    {p.caption && <p className="text-xs mt-2 text-muted-foreground truncate">{p.caption}</p>}
                  </div>
                ))}
              </div>
            </GlassCard>
          </motion.div>
        )}
      </AnimatePresence>

      {photos.length === 0 ? (
        <GlassCard className="text-center py-16">
          <Camera className="size-12 text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground">No photos yet. Upload your first to start tracking visually.</p>
        </GlassCard>
      ) : filtered.length === 0 ? (
        <GlassCard className="text-center py-12">
          <Search className="size-10 text-muted-foreground mx-auto mb-2" />
          <p className="text-muted-foreground text-sm">No photos match "<span className="text-foreground">{query}</span>"</p>
          <Button variant="outline" size="sm" className="mt-3" onClick={() => setQuery("")}>Clear search</Button>
        </GlassCard>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((p) => {
            const pickedIndex = picks.indexOf(p.id);
            return (
              <div
                key={p.id}
                className={`group relative aspect-[3/4] rounded-xl overflow-hidden border cursor-pointer transition-all ${
                  pickedIndex >= 0 ? "border-brand ring-2 ring-brand/40" : "border-border"
                }`}
                onClick={() => (compareMode ? togglePick(p.id) : setLightbox(p.dataUrl))}
              >
                <img src={p.dataUrl} alt={p.caption || "Progress"} className="size-full object-cover" loading="lazy" />
                {compareMode && pickedIndex >= 0 && (
                  <div className="absolute top-2 left-2 size-7 rounded-full bg-brand text-brand-foreground flex items-center justify-center font-display text-sm">
                    {pickedIndex === 0 ? "A" : "B"}
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <p className="text-xs font-mono text-brand">{p.date}</p>
                    {p.caption && <p className="text-sm mt-1 truncate">{p.caption}</p>}
                  </div>
                </div>
                <Button
                  variant="destructive"
                  size="sm"
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={(e) => { e.stopPropagation(); deletePhoto(p.id); }}
                >
                  <Trash2 className="size-3" />
                </Button>
              </div>
            );
          })}
        </div>
      )}

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setLightbox(null)}
          >
            <button className="absolute top-4 right-4 size-10 rounded-full bg-secondary border border-border flex items-center justify-center">
              <X className="size-5" />
            </button>
            <motion.img
              initial={{ scale: 0.95 }} animate={{ scale: 1 }}
              src={lightbox} alt="Full view" className="max-w-full max-h-full object-contain rounded-xl"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </PageContainer>
  );
}
