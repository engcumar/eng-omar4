import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { N as Navigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useAuth, L as Layout, S as SITE } from "./router-LcFJ8l5I.mjs";
import { B as Button } from "./button-DLB67tUv.mjs";
import { s as supabase } from "./client-CeIwuk8s.mjs";
import "../_libs/sonner.mjs";
import { k as LoaderCircle, l as Sparkles, G as GraduationCap, A as Award, m as CircleCheck, n as ChevronDown, C as CirclePlay, V as Video, o as Circle, F as FileQuestionMark, h as Lock, p as CreditCard, M as MessageCircle } from "../_libs/lucide-react.mjs";

import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/unenv.mjs";


import "../_libs/seroval-plugins.mjs";


import "../_libs/react-dom.mjs";
import "../_libs/isbot.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "../_libs/tslib.mjs";
import "../_libs/supabase__functions-js.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
const COURSE_SLUG = "capcut-basic-video-editing";
const MODULES = [{
  id: "m1",
  title: "Module 1: Hordhac CapCut",
  description: "Module-kan wuxuu barayaa ardayga xirfadaha muhiimka ah ee hordhac CapCut — sida loo soo dejiyo, interface-ka, iyo abuurista mashruuc cusub.",
  exercise: "Samee hawsha lagu bartay casharkan adigoo isticmaalaya CapCut."
}, {
  id: "m2",
  title: "Module 2: Aasaaska Editing",
  description: "Module-kan wuxuu barayaa ardayga xirfadaha muhiimka ah ee aasaaska editing — cutting, trimming, split iyo timeline management.",
  exercise: "Samee hawsha lagu bartay casharkan adigoo isticmaalaya CapCut."
}, {
  id: "m3",
  title: "Module 3: Qoraal iyo Subtitles",
  description: "Module-kan wuxuu barayaa ardayga xirfadaha muhiimka ah ee qoraal iyo subtitles, oo ay ku jiraan Auto Captions iyo styling.",
  exercise: "Samee hawsha lagu bartay casharkan adigoo isticmaalaya CapCut."
}, {
  id: "m4",
  title: "Module 4: Music iyo Voice-over",
  description: "Module-kan wuxuu barayaa ardayga xirfadaha muhiimka ah ee music iyo voice-over — ku darista muusig, audio mixing iyo dubbing.",
  exercise: "Samee hawsha lagu bartay casharkan adigoo isticmaalaya CapCut."
}, {
  id: "m5",
  title: "Module 5: Effects iyo Transitions",
  description: "Module-kan wuxuu barayaa ardayga xirfadaha muhiimka ah ee effects iyo transitions si video-gaagu u eego mid xirfadeed.",
  exercise: "Samee hawsha lagu bartay casharkan adigoo isticmaalaya CapCut."
}, {
  id: "m6",
  title: "Module 6: Color Editing",
  description: "Module-kan wuxuu barayaa ardayga xirfadaha muhiimka ah ee color editing, color grading iyo filters.",
  exercise: "Samee hawsha lagu bartay casharkan adigoo isticmaalaya CapCut."
}, {
  id: "m7",
  title: "Module 7: Green Screen",
  description: "Module-kan wuxuu barayaa ardayga xirfadaha muhiimka ah ee green screen (chroma key) iyo bedelka background-ka.",
  exercise: "Samee hawsha lagu bartay casharkan adigoo isticmaalaya CapCut."
}, {
  id: "m8",
  title: "Module 8: TikTok, Reels iyo YouTube Editing",
  description: "Module-kan wuxuu barayaa ardayga xirfadaha muhiimka ah ee TikTok, Reels iyo YouTube editing — aspect ratios iyo trends.",
  exercise: "Samee hawsha lagu bartay casharkan adigoo isticmaalaya CapCut."
}, {
  id: "m9",
  title: "Module 9: Mashruucyo Dhab ah",
  description: "Module-kan wuxuu barayaa ardayga xirfadaha muhiimka ah ee mashruucyo dhab ah sida ads, vlogs iyo cinematic edits.",
  exercise: "Samee hawsha lagu bartay casharkan adigoo isticmaalaya CapCut."
}, {
  id: "m10",
  title: "Module 10: Export iyo Bilaabista Shaqo",
  description: "Module-kan wuxuu barayaa ardayga xirfadaha muhiimka ah ee export, quality settings iyo sida loo bilaabo shaqada freelance.",
  exercise: "Samee hawsha lagu bartay casharkan adigoo isticmaalaya CapCut."
}];
const MIDTERM = ["Split tool maxaa loo isticmaalaa?", "Auto Captions maxay qabataa?", "Waa maxay Transition?"];
const STORAGE_KEY = "capcut-course-progress-v1";
function useProgress() {
  const [done, setDone] = reactExports.useState({});
  reactExports.useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setDone(JSON.parse(raw));
    } catch {
    }
  }, []);
  const toggle = (id) => setDone((p) => {
    const next = {
      ...p,
      [id]: !p[id]
    };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
    }
    return next;
  });
  return {
    done,
    toggle
  };
}
function useCourseAccess() {
  const {
    user,
    isAdmin
  } = useAuth();
  const [hasAccess, setHasAccess] = reactExports.useState(null);
  reactExports.useEffect(() => {
    if (!user) {
      setHasAccess(false);
      return;
    }
    if (isAdmin) {
      setHasAccess(true);
      return;
    }
    let active = true;
    (async () => {
      const {
        data
      } = await supabase.from("course_enrollments").select("payment_status, access_granted").eq("user_id", user.id).eq("course_slug", COURSE_SLUG).maybeSingle();
      if (!active) return;
      setHasAccess(!!(data && data.payment_status === "paid" && data.access_granted));
    })();
    return () => {
      active = false;
    };
  }, [user, isAdmin]);
  return hasAccess;
}
function CapCutCoursePage() {
  const {
    user,
    loading
  } = useAuth();
  const hasAccess = useCourseAccess();
  const {
    done,
    toggle
  } = useProgress();
  const [openId, setOpenId] = reactExports.useState("m1");
  const total = MODULES.length + 2;
  const completed = reactExports.useMemo(() => Object.values(done).filter(Boolean).length, [done]);
  const percent = Math.round(completed / total * 100);
  const passed = percent >= 70;
  if (loading || hasAccess === null) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid min-h-[60vh] place-items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-8 w-8 animate-spin text-brand" }) }) });
  }
  if (!user) return /* @__PURE__ */ jsxRuntimeExports.jsx(Navigate, { to: "/register", search: {
    mode: "login"
  } });
  if (!hasAccess) return /* @__PURE__ */ jsxRuntimeExports.jsx(PaymentRequired, {});
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Layout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative overflow-hidden bg-hero-gradient py-16 text-white sm:py-20", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 opacity-20 [background:radial-gradient(circle_at_20%_20%,white,transparent_40%)]" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-[1.2fr_1fr] lg:px-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "animate-fade-in-up", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider backdrop-blur", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-3.5 w-3.5" }),
            " Koorso Furan"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-4 font-display text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl", children: "Course Basic Video Editing" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 max-w-xl text-white/85 sm:text-lg", children: "Koorso dhamaystiran oo CapCut ah laga bilaabo bilow ilaa heer xirfadeed." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 flex flex-wrap gap-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "lg", className: "bg-white text-primary hover:bg-white/90", onClick: () => document.getElementById("modules")?.scrollIntoView({
            behavior: "smooth"
          }), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(GraduationCap, { className: "h-5 w-5" }),
            " Bilow Casharrada"
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 grid max-w-md grid-cols-3 gap-4 text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { n: "10", label: "Module" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { n: "10+", label: "Layli" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { n: "2", label: "Imtixaan" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "animate-fade-in-up rounded-3xl bg-white/10 p-6 backdrop-blur ring-1 ring-white/20", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-semibold", children: "Horumarkaaga" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-2xl font-bold", children: [
              percent,
              "%"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 h-3 w-full overflow-hidden rounded-full bg-white/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full rounded-full bg-white transition-all duration-500", style: {
            width: `${percent}%`
          } }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-3 text-sm text-white/80", children: [
            completed,
            " / ",
            total,
            " qaybood ayaad dhamaysay"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-5 rounded-xl bg-white/10 p-4 text-sm", children: passed ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2 font-semibold", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Award, { className: "h-5 w-5" }),
            " Waad u qalantaa shahaado!"
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/85", children: "Hel 70% si aad u heshid shahaadada dhamaystirka." }) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { id: "modules", className: "mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-8 flex items-end justify-between", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl font-bold", children: "Casharrada Koorsada" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-muted-foreground", children: "Daawo casharro kasta, qabo layliga, kadibna calaamadi inaad dhamaysay." })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: MODULES.map((m, idx) => {
        const isOpen = openId === m.id;
        const isDone = !!done[m.id];
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition hover:shadow-elegant", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => setOpenId(isOpen ? null : m.id), className: "flex w-full items-center gap-4 p-4 text-left sm:p-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `grid h-10 w-10 shrink-0 place-items-center rounded-full font-bold ${isDone ? "bg-brand-gradient text-white" : "bg-secondary text-secondary-foreground"}`, children: isDone ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-5 w-5" }) : idx + 1 }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-base font-bold sm:text-lg", children: m.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 line-clamp-1 text-sm text-muted-foreground", children: m.description })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: `h-5 w-5 shrink-0 text-muted-foreground transition ${isOpen ? "rotate-180" : ""}` })
          ] }),
          isOpen && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "animate-fade-in-up border-t border-border bg-secondary/40 p-4 sm:p-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm sm:text-base", children: m.description }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-5 grid aspect-video place-items-center overflow-hidden rounded-xl bg-hero-gradient text-white", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto grid h-16 w-16 place-items-center rounded-full bg-white/20 backdrop-blur", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CirclePlay, { className: "h-9 w-9" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-sm text-white/85", children: "Video-ga casharkan halkan ayaa la geli doonaa" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "mt-2 inline-flex items-center gap-1 rounded-full bg-white/15 px-3 py-1 text-xs", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Video, { className: "h-3 w-3" }),
                " Placeholder"
              ] })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 rounded-xl border border-border bg-card p-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-display font-semibold text-primary", children: "Layli" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm", children: m.exercise })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: () => toggle(m.id), variant: isDone ? "secondary" : "default", className: "mt-5", children: isDone ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-4 w-4" }),
              " La Dhamaystiray"
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Circle, { className: "h-4 w-4" }),
              " Calaamadi In La Dhamaystiray"
            ] }) })
          ] })
        ] }, m.id);
      }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-secondary/50 py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto max-w-4xl px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "grid h-12 w-12 place-items-center rounded-xl bg-brand-gradient text-white", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FileQuestionMark, { className: "h-6 w-6" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold", children: "Imtixaanka Dhexe" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Tijaabi waxa aad ilaa hadda baratay." })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("ol", { className: "mt-6 space-y-3", children: MIDTERM.map((q, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-3 rounded-xl border border-border bg-background p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "grid h-7 w-7 shrink-0 place-items-center rounded-full bg-brand-gradient text-xs font-bold text-white", children: i + 1 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm sm:text-base", children: q })
      ] }, i)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: () => toggle("midterm"), variant: done["midterm"] ? "secondary" : "default", className: "mt-6", children: done["midterm"] ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-4 w-4" }),
        " Imtixaanka waa la dhamaystiray"
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Circle, { className: "h-4 w-4" }),
        " Calaamadi In La Dhamaystiray"
      ] }) })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "grid h-12 w-12 place-items-center rounded-xl bg-brand-gradient text-white", children: /* @__PURE__ */ jsxRuntimeExports.jsx(GraduationCap, { className: "h-6 w-6" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold", children: "Imtixaanka Ugu Dambeeya" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Mashruuc dhab ah." })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-5 text-base", children: [
        "Samee video 1–2 daqiiqo ah oo leh ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "transitions" }),
        ", ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "effects" }),
        ", ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "qoraal" }),
        ", ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "music" }),
        " iyo ku export gareey ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "1080p" }),
        "."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: () => toggle("final"), variant: done["final"] ? "secondary" : "default", className: "mt-6", children: done["final"] ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-4 w-4" }),
        " Mashruucii waa la gudbiyay"
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Circle, { className: "h-4 w-4" }),
        " Calaamadi In La Dhamaystiray"
      ] }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-hero-gradient py-16 text-white", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto max-w-4xl px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `rounded-3xl border-2 border-dashed p-8 text-center backdrop-blur sm:p-12 ${passed ? "border-white bg-white/10" : "border-white/30 bg-white/5"}`, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto grid h-20 w-20 place-items-center rounded-full bg-white/20", children: passed ? /* @__PURE__ */ jsxRuntimeExports.jsx(Award, { className: "h-10 w-10" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "h-10 w-10" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-5 font-display text-3xl font-bold", children: "Shahaadada Dhamaystirka" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-3 text-white/85", children: [
        "Ardayga hela ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "70% ama ka badan" }),
        " wuxuu mutaystaa shahaado dhamaystir."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6", children: passed ? /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "lg", className: "bg-white text-primary hover:bg-white/90", onClick: () => window.open(`${SITE.whatsappLink}?text=${encodeURIComponent("Salaam, waxaan dhamaystiray Course Basic Video Editing — fadlan ii soo dir shahaadada.")}`, "_blank"), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Award, { className: "h-5 w-5" }),
        " Codso Shahaadada"
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-white/75", children: [
        "Hadda waxaad gaadhay ",
        percent,
        "%. Sii wad casharrada si aad u furtid shahaadada."
      ] }) })
    ] }) }) })
  ] });
}
function PaymentRequired() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "mx-auto max-w-2xl px-4 py-20 sm:px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card p-8 text-center shadow-elegant animate-fade-in sm:p-12", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-brand-gradient text-white shadow-glow", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "h-8 w-8" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-4 font-display text-2xl font-bold sm:text-3xl", children: "Koorsada way xirantahay" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-muted-foreground", children: "Please complete the course payment to access all lessons." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "Fadlan dhammee bixinta lacagta si aad u furtid casharrada oo dhan, layliyada, imtixaannada iyo shahaadada." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/enroll/capcut", className: "inline-flex items-center justify-center gap-2 rounded-lg bg-brand-gradient px-5 py-2.5 text-sm font-semibold text-brand-foreground shadow-elegant", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { className: "h-4 w-4" }),
        " Tag Bogga Diiwaangelinta"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: `${SITE.whatsappLink}?text=${encodeURIComponent("Asc Eng_omar, I want to enroll in the Course Basic Video Editing and I am ready to pay.")}`, target: "_blank", rel: "noreferrer", className: "inline-flex items-center justify-center gap-2 rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-5 py-2.5 text-sm font-semibold text-emerald-700 hover:bg-emerald-500 hover:text-white dark:text-emerald-300", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "h-4 w-4" }),
        " WhatsApp"
      ] })
    ] })
  ] }) }) });
}
function Stat({
  n,
  label
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl bg-white/10 p-3 backdrop-blur", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-2xl font-bold", children: n }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-white/80", children: label })
  ] });
}
export {
  CapCutCoursePage as component
};
