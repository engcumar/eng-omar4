import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useAuth, L as Layout, S as SITE } from "./router-LcFJ8l5I.mjs";
import "../_libs/sonner.mjs";
import { i as CircleX, j as Clock, R as RefreshCw, b as LogOut } from "../_libs/lucide-react.mjs";

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
import "./client-CeIwuk8s.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "../_libs/tslib.mjs";
import "../_libs/supabase__functions-js.mjs";
function PendingPage() {
  const {
    user,
    profile,
    isApproved,
    loading,
    refreshProfile,
    signOut
  } = useAuth();
  const nav = useNavigate();
  reactExports.useEffect(() => {
    if (!loading && !user) nav({
      to: "/register"
    });
    if (isApproved) nav({
      to: "/dashboard"
    });
  }, [user, loading, isApproved, nav]);
  const rejected = profile?.approval_status === "rejected";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mx-auto flex max-w-2xl flex-col items-center px-4 py-20 text-center sm:px-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `grid h-20 w-20 place-items-center rounded-2xl ${rejected ? "bg-destructive/10 text-destructive" : "bg-brand-gradient text-white shadow-glow"}`, children: rejected ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "h-10 w-10" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-10 w-10" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-5 font-display text-3xl font-bold sm:text-4xl", children: rejected ? "Akoonkaaga waa la diiday" : "Akoonkaaga waa la eegayaa" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 max-w-xl text-muted-foreground", children: rejected ? "Maamulaha wuxuu diiday gelitaankaaga. Haddii aad u maleynayso khalad, fadlan nala soo xiriir." : "Your account is pending approval from the administrator. You will gain access after your account is reviewed and approved." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-sm text-muted-foreground", children: profile?.email && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      "Email: ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: profile.email })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 flex flex-wrap items-center justify-center gap-3", children: [
      !rejected && /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: refreshProfile, className: "inline-flex items-center gap-2 rounded-lg bg-brand-gradient px-5 py-2.5 text-sm font-semibold text-brand-foreground shadow-elegant", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "h-4 w-4" }),
        " Cusbooneysii xaaladda"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: SITE.whatsappLink, target: "_blank", rel: "noreferrer", className: "inline-flex items-center gap-2 rounded-lg border border-border px-5 py-2.5 text-sm font-medium hover:bg-secondary", children: "Nala soo xiriir" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: signOut, className: "inline-flex items-center gap-2 rounded-lg border border-border px-5 py-2.5 text-sm font-medium hover:bg-secondary", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "h-4 w-4" }),
        " Ka bax"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "mt-10 text-sm text-accent underline", children: "Ku noqo bogga hore" })
  ] }) });
}
export {
  PendingPage as component
};
