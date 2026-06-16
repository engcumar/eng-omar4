import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useQuery } from "../_libs/tanstack__react-query.mjs";
import { u as useAuth, L as Layout } from "./router-LcFJ8l5I.mjs";
import { s as supabase } from "./client-CeIwuk8s.mjs";
import "../_libs/sonner.mjs";
import { k as LoaderCircle, U as User, g as Mail, j as Clock, B as BookOpen, C as CirclePlay, A as Award } from "../_libs/lucide-react.mjs";

import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/unenv.mjs";


import "../_libs/seroval-plugins.mjs";


import "../_libs/react-dom.mjs";
import "../_libs/isbot.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "../_libs/tslib.mjs";
import "../_libs/supabase__functions-js.mjs";
function readCapcutProgress() {
  try {
    if (typeof window === "undefined") return {
      completed: []
    };
    const raw = localStorage.getItem("capcut-course-progress-v1");
    if (!raw) return {
      completed: []
    };
    return JSON.parse(raw);
  } catch {
    return {
      completed: []
    };
  }
}
function DashboardPage() {
  const {
    user,
    profile,
    isApproved,
    isAdmin,
    loading
  } = useAuth();
  const nav = useNavigate();
  reactExports.useEffect(() => {
    if (!loading && !user) nav({
      to: "/register"
    });
  }, [user, loading, nav]);
  const {
    data: courses
  } = useQuery({
    queryKey: ["dashboard", "courses"],
    queryFn: async () => {
      const {
        data
      } = await supabase.from("courses").select("id, title, category, image_url").eq("published", true).order("created_at", {
        ascending: false
      });
      return data ?? [];
    },
    enabled: !!user
  });
  const capcut = reactExports.useMemo(readCapcutProgress, [user?.id]);
  const totalModules = 10;
  const capcutPct = Math.round(capcut.completed.length / totalModules * 100);
  const certificateEarned = capcut.midtermPassed && capcut.finalPassed && capcutPct >= 70;
  if (loading || !user) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid min-h-[60vh] place-items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-8 w-8 animate-spin text-brand" }) }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Layout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-hero-gradient py-12 text-white", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto max-w-6xl px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-16 w-16 place-items-center rounded-2xl bg-white/15 backdrop-blur", children: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "h-8 w-8" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-white/80", children: "Ku soo dhowoow" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold sm:text-3xl", children: profile?.full_name || user.email }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 text-sm text-white/85", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "mr-1 inline h-4 w-4" }),
          profile?.email || user.email
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "ms-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: isAdmin ? "approved" : profile?.approval_status ?? "pending" }) })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8", children: [
      !isApproved && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-8 rounded-xl border border-amber-500/30 bg-amber-500/10 p-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "mt-0.5 h-5 w-5 text-amber-600" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold", children: "Akoonkaaga weli lama oggolaan" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "Marka maamulaha uu oggolaado, waxaad heli doontaa gelitaan buuxa oo koorasooyinka ah." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/pending", className: "rounded-lg bg-brand-gradient px-4 py-2 text-sm font-semibold text-brand-foreground", children: "Bogga sugitaanka" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 sm:grid-cols-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-5 w-5" }), label: "Koorasooyinka la heli karo", value: String(courses?.length ?? 0) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CirclePlay, { className: "h-5 w-5" }), label: "CapCut Course Progress", value: `${capcutPct}%` }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Award, { className: "h-5 w-5" }), label: "Shahaadooyinka", value: certificateEarned ? "1" : "0" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-10 font-display text-xl font-bold", children: "Koorasahaaga" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Hor u soco koorasooyinkaaga ama bilow mid cusub." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CourseProgressCard, { title: "Course Basic Video Editing — CapCut", subtitle: "10 module · imtixaan & shahaado", pct: capcutPct, to: "/capcut-course", locked: !isApproved, image: "/og.jpg" }),
        (courses ?? []).slice(0, 5).map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(CourseProgressCard, { title: c.title, subtitle: c.category, pct: 0, to: c.category === "video_editing" ? "/video-editing" : c.category === "ai" ? "/ai" : "/coding", locked: !isApproved, image: c.image_url }, c.id))
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-12 font-display text-xl font-bold", children: "Shahaadooyinka" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 rounded-xl border border-border bg-card p-6", children: certificateEarned ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Award, { className: "h-10 w-10 text-amber-500" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold", children: "Shahaado: CapCut Basic Video Editing" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Waad gudubtay imtixaannada. Hambalyo!" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/capcut-course", className: "rounded-lg bg-brand-gradient px-4 py-2 text-sm font-semibold text-brand-foreground", children: "Eeg shahaadada" })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Wali ma helin shahaado. Dhammee koorasada oo gud imtixaannada si aad u hesho shahaadada." }) })
    ] })
  ] });
}
function StatusBadge({
  status
}) {
  const styles = {
    approved: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/30",
    pending: "bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-500/30",
    rejected: "bg-destructive/15 text-destructive border-destructive/30"
  };
  const labels = {
    approved: "La oggolaaday",
    pending: "Sugaya oggolaansho",
    rejected: "La diiday"
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${styles[status] ?? styles.pending}`, children: labels[status] ?? labels.pending });
}
function StatCard({
  icon,
  label,
  value
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-xl border border-border bg-card p-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-10 w-10 place-items-center rounded-lg bg-brand-gradient text-white", children: icon }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl font-bold", children: value })
    ] })
  ] }) });
}
function CourseProgressCard({
  title,
  subtitle,
  pct,
  to,
  locked,
  image
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: locked ? "/pending" : to, className: "group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition hover:-translate-y-0.5 hover:shadow-elegant", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative h-32 bg-muted", children: [
      image && /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: image, alt: title, className: "h-full w-full object-cover" }),
      locked && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 grid place-items-center bg-black/50 text-xs font-semibold text-white", children: "Sug oggolaansho" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "line-clamp-2 font-semibold", children: title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-muted-foreground", children: subtitle }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 h-2 overflow-hidden rounded-full bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full bg-brand-gradient transition-all", style: {
        width: `${pct}%`
      } }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 text-xs text-muted-foreground", children: [
        pct,
        "% dhammaystiran"
      ] })
    ] })
  ] });
}
export {
  DashboardPage as component
};
