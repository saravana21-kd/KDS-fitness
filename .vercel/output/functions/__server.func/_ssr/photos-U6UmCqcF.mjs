import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useAppStore, t as todaysDate } from "./router-RUUm01Jy.mjs";
import { P as PageContainer, S as SectionHeader, G as GlassCard } from "./ui-kit-D832lOcM.mjs";
import { I as Input, B as Button } from "./input-DpSAyFTa.mjs";
import "../_libs/sonner.mjs";
import { U as Upload, j as Search, X, G as GitCompare, C as Camera, d as Trash2 } from "../_libs/lucide-react.mjs";
import { A as AnimatePresence, m as motion } from "../_libs/framer-motion.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "../_libs/zustand.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/motion-dom.mjs";
import "../_libs/motion-utils.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/class-variance-authority.mjs";
function PhotosPage() {
  const {
    photos,
    addPhoto,
    deletePhoto
  } = useAppStore();
  const [caption, setCaption] = reactExports.useState("");
  const [query, setQuery] = reactExports.useState("");
  const [lightbox, setLightbox] = reactExports.useState(null);
  const [compareMode, setCompareMode] = reactExports.useState(false);
  const [picks, setPicks] = reactExports.useState([]);
  const fileRef = reactExports.useRef(null);
  const filtered = reactExports.useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return photos;
    return photos.filter((p) => p.date.toLowerCase().includes(q) || (p.caption || "").toLowerCase().includes(q));
  }, [photos, query]);
  function handleFiles(files) {
    if (!files) return;
    Array.from(files).forEach((f) => {
      const reader = new FileReader();
      reader.onload = () => {
        addPhoto({
          date: todaysDate(),
          dataUrl: reader.result,
          caption
        });
      };
      reader.readAsDataURL(f);
    });
    setCaption("");
    if (fileRef.current) fileRef.current.value = "";
  }
  function togglePick(id) {
    setPicks((p) => {
      if (p.includes(id)) return p.filter((x) => x !== id);
      if (p.length >= 2) return [p[1], id];
      return [...p, id];
    });
  }
  const a = photos.find((p) => p.id === picks[0]);
  const b = photos.find((p) => p.id === picks[1]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(PageContainer, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHeader, { title: "Progress Photos", subtitle: "Visual transformation timeline" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(GlassCard, { className: "mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-3 items-stretch sm:items-end", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { placeholder: "Caption (optional, e.g. 'Week 3, morning light')", value: caption, onChange: (e) => setCaption(e.target.value) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { ref: fileRef, type: "file", accept: "image/*", multiple: true, className: "hidden", onChange: (e) => handleFiles(e.target.files) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: () => fileRef.current?.click(), className: "bg-brand text-brand-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "size-4 mr-1" }),
        " Upload Photos"
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(GlassCard, { className: "mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-3 items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1 min-w-[220px]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "size-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { placeholder: 'Search by date (e.g. "2025-05") or caption…', value: query, onChange: (e) => setQuery(e.target.value), className: "pl-9 pr-9" }),
        query && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setQuery(""), className: "absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded hover:bg-secondary", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "size-3.5 text-muted-foreground" }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-mono text-muted-foreground", children: [
        filtered.length,
        " / ",
        photos.length,
        " ",
        filtered.length === 1 ? "result" : "results"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: compareMode ? "default" : "outline", size: "sm", onClick: () => {
        setCompareMode((c) => !c);
        setPicks([]);
      }, className: compareMode ? "bg-brand text-brand-foreground" : "", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(GitCompare, { className: "size-4 mr-1" }),
        compareMode ? `Compare (${picks.length}/2)` : "Compare A / B"
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: compareMode && picks.length === 2 && a && b && /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: {
      opacity: 0,
      y: -8
    }, animate: {
      opacity: 1,
      y: 0
    }, exit: {
      opacity: 0
    }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(GlassCard, { className: "mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-3", children: [a, b].map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-2xl text-brand", children: i === 0 ? "A" : "B" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-mono text-muted-foreground", children: p.date })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-[3/4] rounded-xl overflow-hidden border border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: p.dataUrl, alt: p.caption || "Progress", className: "size-full object-cover" }) }),
      p.caption && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs mt-2 text-muted-foreground truncate", children: p.caption })
    ] }, p.id)) }) }) }) }),
    photos.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { className: "text-center py-16", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Camera, { className: "size-12 text-muted-foreground mx-auto mb-3" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "No photos yet. Upload your first to start tracking visually." })
    ] }) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { className: "text-center py-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "size-10 text-muted-foreground mx-auto mb-2" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-sm", children: [
        'No photos match "',
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: query }),
        '"'
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", size: "sm", className: "mt-3", onClick: () => setQuery(""), children: "Clear search" })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4", children: filtered.map((p) => {
      const pickedIndex = picks.indexOf(p.id);
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `group relative aspect-[3/4] rounded-xl overflow-hidden border cursor-pointer transition-all ${pickedIndex >= 0 ? "border-brand ring-2 ring-brand/40" : "border-border"}`, onClick: () => compareMode ? togglePick(p.id) : setLightbox(p.dataUrl), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: p.dataUrl, alt: p.caption || "Progress", className: "size-full object-cover", loading: "lazy" }),
        compareMode && pickedIndex >= 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-2 left-2 size-7 rounded-full bg-brand text-brand-foreground flex items-center justify-center font-display text-sm", children: pickedIndex === 0 ? "A" : "B" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-background via-background/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute bottom-0 left-0 right-0 p-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-mono text-brand", children: p.date }),
          p.caption && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm mt-1 truncate", children: p.caption })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "destructive", size: "sm", className: "absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity", onClick: (e) => {
          e.stopPropagation();
          deletePhoto(p.id);
        }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "size-3" }) })
      ] }, p.id);
    }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: lightbox && /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
      opacity: 0
    }, animate: {
      opacity: 1
    }, exit: {
      opacity: 0
    }, className: "fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex items-center justify-center p-4", onClick: () => setLightbox(null), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "absolute top-4 right-4 size-10 rounded-full bg-secondary border border-border flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "size-5" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(motion.img, { initial: {
        scale: 0.95
      }, animate: {
        scale: 1
      }, src: lightbox, alt: "Full view", className: "max-w-full max-h-full object-contain rounded-xl" })
    ] }) })
  ] });
}
export {
  PhotosPage as component
};
