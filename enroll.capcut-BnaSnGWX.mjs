import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useAuth, e as COURSE_SLUG, L as Layout, f as COURSE_TITLE, g as COURSE_PRICE_USD, S as SITE } from "./router-LcFJ8l5I.mjs";
import { d as useNavigate, N as Navigate } from "../_libs/tanstack__react-router.mjs";
import { B as Button } from "./button-DLB67tUv.mjs";
import { s as supabase } from "./client-CeIwuk8s.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { k as LoaderCircle, G as GraduationCap, m as CircleCheck, C as CirclePlay, A as Award, j as Clock, h as Lock, p as CreditCard, M as MessageCircle } from "../_libs/lucide-react.mjs";

import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/unenv.mjs";


import "../_libs/seroval-plugins.mjs";


import "../_libs/react-dom.mjs";
import "../_libs/isbot.mjs";
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
function EnrollCapcutPage() {
  const {
    user,
    loading
  } = useAuth();
  const nav = useNavigate();
  const [enrollment, setEnrollment] = reactExports.useState(null);
  const [busy, setBusy] = reactExports.useState(false);
  const [loadingEnroll, setLoadingEnroll] = reactExports.useState(true);
  reactExports.useEffect(() => {
    if (!user) return;
    let active = true;
    (async () => {
      const {
        data
      } = await supabase.from("course_enrollments").select("id, payment_status, access_granted, created_at").eq("user_id", user.id).eq("course_slug", COURSE_SLUG).maybeSingle();
      if (active) {
        setEnrollment(data ?? null);
        setLoadingEnroll(false);
      }
    })();
    return () => {
      active = false;
    };
  }, [user]);
  if (loading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid min-h-[60vh] place-items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-8 w-8 animate-spin text-brand" }) }) });
  }
  if (!user) return /* @__PURE__ */ jsxRuntimeExports.jsx(Navigate, { to: "/register", search: {
    mode: "login"
  } });
  const hasAccess = enrollment?.payment_status === "paid" && enrollment?.access_granted;
  async function requestEnrollment() {
    if (!user) return;
    setBusy(true);
    const {
      data,
      error
    } = await supabase.from("course_enrollments").insert({
      user_id: user.id,
      course_slug: COURSE_SLUG
    }).select("id, payment_status, access_granted, created_at").single();
    setBusy(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    setEnrollment(data);
    toast.success("Codsigaaga waa la diiwaangeliyay.");
  }
  function openWhatsApp() {
    const msg = encodeURIComponent("Asc Eng_omar, I want to enroll in the Course Basic Video Editing and I am ready to pay.");
    window.open(`${SITE.whatsappLink}?text=${msg}`, "_blank");
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Layout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative overflow-hidden bg-hero-gradient py-16 text-white", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 opacity-20 [background:radial-gradient(circle_at_20%_20%,white,transparent_40%)]" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 animate-fade-in-up", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider backdrop-blur", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(GraduationCap, { className: "h-3.5 w-3.5" }),
          " Diiwaangelin Koorsada"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-4 font-display text-4xl font-bold leading-tight sm:text-5xl", children: COURSE_TITLE }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 max-w-2xl text-white/85 sm:text-lg", children: "Koorso CapCut ah oo dhamaystiran — 10 module, layliyo, imtixaano iyo shahaado. Si aad u furtid casharrada, fadlan dhammee bixinta lacagta." })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-8 lg:grid-cols-[1.2fr_1fr]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold", children: "Waxa aad heli doonto" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-5 space-y-3 text-sm sm:text-base", children: ["Gelitaan buuxa 10 module oo CapCut ah", "Casharro muuqaal ah iyo layliyo qaybsan", "Imtixaan dhexe iyo imtixaan ugu dambeeya", "Shahaado dhamaystir markaad gudubto", "Taageero WhatsApp ah oo dhakhso ah"].map((b) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "mt-0.5 h-5 w-5 shrink-0 text-emerald-500" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: b })
        ] }, b)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 grid grid-cols-3 gap-3 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CirclePlay, { className: "h-5 w-5" }), label: "Casharro", value: "10" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(GraduationCap, { className: "h-5 w-5" }), label: "Imtixaan", value: "2" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Award, { className: "h-5 w-5" }), label: "Shahaado", value: "1" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card p-6 shadow-elegant sm:p-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground", children: "Qiimaha Koorsada" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-3 font-display text-5xl font-bold text-primary", children: [
          "$",
          COURSE_PRICE_USD,
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-1 text-base font-normal text-muted-foreground", children: "USD" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-muted-foreground", children: "Hal mar bixin · gelitaan nolosheed" }),
        loadingEnroll ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 grid h-24 place-items-center rounded-xl bg-secondary/40", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-5 w-5 animate-spin text-brand" }) }) : hasAccess ? /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBox, { tone: "success", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-5 w-5" }), title: "Gelitaan buuxa ayaad leedahay", desc: "Lacagtaadii waa la xaqiijiyay. Bilow casharrada hadda." }) : enrollment?.payment_status === "paid" ? /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBox, { tone: "warning", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-5 w-5" }), title: "Lacagta waa la helay", desc: "Maamulaha ayaa furayaa gelitaanka koorsada wakhti yar gudahood." }) : enrollment ? /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBox, { tone: "warning", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-5 w-5" }), title: "Lacag-bixintaada ayaa la sugayaa", desc: "Marka aad lacagta soo dirto, maamulaha ayaa xaqiijin doona oo furi doona koorsada." }) : /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBox, { tone: "info", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "h-5 w-5" }), title: "Wali ma diiwaangelin koorsadan", desc: "Riix Pay Now ama nagala soo xiriir WhatsApp si aad u bilowdo." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 flex flex-col gap-3", children: hasAccess ? /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "lg", className: "w-full", onClick: () => nav({
          to: "/capcut-course"
        }), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CirclePlay, { className: "h-5 w-5" }),
          " Bilow Koorsada"
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "lg", className: "w-full", disabled: busy, onClick: async () => {
            if (!enrollment) await requestEnrollment();
            toast.info("Nidaamka lacag-bixinta online dhowaan. Hadda fadlan isticmaal WhatsApp.");
            openWhatsApp();
          }, children: [
            busy ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-5 w-5 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { className: "h-5 w-5" }),
            "Pay Now"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "lg", variant: "outline", className: "w-full border-emerald-500/40 bg-emerald-500/10 text-emerald-700 hover:bg-emerald-500 hover:text-white dark:text-emerald-300", disabled: busy, onClick: async () => {
            if (!enrollment) await requestEnrollment();
            openWhatsApp();
          }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "h-5 w-5" }),
            " Contact on WhatsApp"
          ] })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-center text-xs text-muted-foreground", children: "Marka maamulaha xaqiijiyo lacagta, koorsada ayaa si toos ah laguu furi doonaa." })
      ] })
    ] }) })
  ] });
}
function Stat({
  icon,
  label,
  value
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border bg-background p-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto grid h-9 w-9 place-items-center rounded-lg bg-brand-gradient text-white", children: icon }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 font-display text-lg font-bold", children: value }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: label })
  ] });
}
function StatusBox({
  tone,
  icon,
  title,
  desc
}) {
  const styles = {
    success: "border-emerald-500/30 bg-emerald-500/10 text-emerald-800 dark:text-emerald-200",
    warning: "border-amber-500/30 bg-amber-500/10 text-amber-800 dark:text-amber-200",
    info: "border-border bg-secondary/40 text-foreground"
  }[tone];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `mt-6 flex items-start gap-3 rounded-xl border p-4 ${styles}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-0.5", children: icon }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold", children: title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-0.5 text-sm opacity-90", children: desc })
    ] })
  ] });
}
export {
  EnrollCapcutPage as component
};
