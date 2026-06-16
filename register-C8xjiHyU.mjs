import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { u as useAuth, R as Route$b, L as Layout } from "./router-LcFJ8l5I.mjs";
import { s as supabase } from "./client-CeIwuk8s.mjs";
import { c as createLovableAuth } from "../_libs/lovable.dev__cloud-auth-js.mjs";
import { f as MailCheck, U as User, g as Mail, h as Lock } from "../_libs/lucide-react.mjs";
import { o as objectType, s as stringType } from "../_libs/zod.mjs";

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
const lovableAuth = createLovableAuth();
const lovable = {
  auth: {
    signInWithOAuth: async (provider, opts) => {
      const result = await lovableAuth.signInWithOAuth(provider, {
        redirect_uri: opts?.redirect_uri,
        extraParams: {
          ...opts?.extraParams
        }
      });
      if (result.redirected) {
        return result;
      }
      if (result.error) {
        return result;
      }
      try {
        await supabase.auth.setSession(result.tokens);
      } catch (e) {
        return { error: e instanceof Error ? e : new Error(String(e)) };
      }
      return result;
    }
  }
};
const signupSchema = objectType({
  fullName: stringType().trim().min(2, "Magaca buuxa geli").max(100),
  email: stringType().trim().email("Email sax ah geli").max(255),
  password: stringType().min(6, "Furaha ha ka yaraan 6 xaraf").max(100)
});
const loginSchema = objectType({
  email: stringType().trim().email("Email sax ah geli"),
  password: stringType().min(6)
});
function RegisterPage() {
  const {
    user
  } = useAuth();
  const nav = useNavigate();
  const {
    mode: initialMode
  } = Route$b.useSearch();
  const [mode, setMode] = reactExports.useState(initialMode ?? "signup");
  const [form, setForm] = reactExports.useState({
    fullName: "",
    email: "",
    password: ""
  });
  const [busy, setBusy] = reactExports.useState(false);
  const [verifyEmail, setVerifyEmail] = reactExports.useState(null);
  reactExports.useEffect(() => {
    if (user) nav({
      to: "/dashboard"
    });
  }, [user, nav]);
  async function submit(e) {
    e.preventDefault();
    setBusy(true);
    try {
      if (mode === "signup") {
        const p = signupSchema.safeParse(form);
        if (!p.success) return toast.error(p.error.issues[0].message);
        const {
          data,
          error
        } = await supabase.auth.signUp({
          email: p.data.email,
          password: p.data.password,
          options: {
            emailRedirectTo: `${window.location.origin}/dashboard`,
            data: {
              full_name: p.data.fullName
            }
          }
        });
        if (error) return toast.error(error.message);
        if (data.session) {
          toast.success("Akoon waa la sameeyay!");
        } else {
          setVerifyEmail(p.data.email);
        }
      } else {
        const p = loginSchema.safeParse(form);
        if (!p.success) return toast.error(p.error.issues[0].message);
        const {
          error
        } = await supabase.auth.signInWithPassword({
          email: p.data.email,
          password: p.data.password
        });
        if (error) {
          const msg = error.message.toLowerCase();
          if (msg.includes("not confirmed") || msg.includes("email")) {
            return toast.error("Fadlan marka hore xaqiiji email-kaaga.");
          }
          return toast.error("Email ama furaha waa khalad.");
        }
        toast.success("Si guul leh ayaad u gashay!");
      }
    } finally {
      setBusy(false);
    }
  }
  if (verifyEmail) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "mx-auto max-w-xl px-4 py-20 sm:px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card p-8 text-center shadow-elegant animate-fade-in", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-brand-gradient text-white shadow-glow", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MailCheck, { className: "h-8 w-8" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-4 font-display text-2xl font-bold", children: "Xaqiiji Email-kaaga" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-muted-foreground", children: "Waxaan u dirnay link xaqiijin email-kan:" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 font-semibold text-accent", children: verifyEmail }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-sm text-muted-foreground", children: "Fur Gmail-kaaga, riix link-ga xaqiijinta, ka dibna ku noqo halkan si aad u soo gasho. Hubi inbox-ka iyo galka spam-ka." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex flex-col gap-2 sm:flex-row sm:justify-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => {
          setVerifyEmail(null);
          setMode("login");
        }, className: "rounded-lg bg-brand-gradient px-5 py-2.5 text-sm font-semibold text-brand-foreground", children: "Soo Gal" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "https://mail.google.com", target: "_blank", rel: "noreferrer", className: "rounded-lg border border-border px-5 py-2.5 text-sm font-medium hover:bg-secondary", children: "Fur Gmail" })
      ] })
    ] }) }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Layout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "relative overflow-hidden bg-hero-gradient py-16 text-white", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-2xl px-4 text-center sm:px-6 lg:px-8 animate-fade-in-up", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-4xl font-bold sm:text-5xl", children: mode === "signup" ? "Is Diiwaangeli" : "Soo Gal" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-white/85", children: mode === "signup" ? "Sameyso akoon. Marka aad email-ka xaqiijiso, maamulaha ayaa eegi doona akoonkaaga." : "Ku soo gal akoonkaaga si aad u sii waddo waxbarashada." })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "mx-auto max-w-md px-4 py-16 sm:px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-elegant animate-fade-in", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", disabled: busy, onClick: async () => {
        setBusy(true);
        try {
          const result = await lovable.auth.signInWithOAuth("google", {
            redirect_uri: `${window.location.origin}/dashboard`
          });
          if (result.error) toast.error("Gelitaanka Google wuu fashilmay.");
        } finally {
          setBusy(false);
        }
      }, className: "flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-background px-4 py-2.5 text-sm font-semibold hover:bg-secondary disabled:opacity-60", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(GoogleLogo, {}),
        " ",
        mode === "signup" ? "Is diiwaangeli Google" : "Ku gal Google"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "my-5 flex items-center gap-3 text-xs uppercase text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-px flex-1 bg-border" }),
        " ama ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-px flex-1 bg-border" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: submit, children: [
        mode === "signup" && /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "h-4 w-4" }), label: "Magaca buuxa", value: form.fullName, onChange: (v) => setForm({
          ...form,
          fullName: v
        }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: mode === "signup" ? "mt-4" : "", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "h-4 w-4" }), label: "Email", type: "email", value: form.email, onChange: (v) => setForm({
          ...form,
          email: v
        }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "h-4 w-4" }), label: "Furaha", type: "password", value: form.password, onChange: (v) => setForm({
          ...form,
          password: v
        }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", disabled: busy, className: "mt-6 w-full rounded-xl bg-brand-gradient px-6 py-3 font-semibold text-brand-foreground shadow-elegant transition hover:scale-[1.02] disabled:opacity-60", children: busy ? "Sugaya..." : mode === "signup" ? "Sameyso Akoon" : "Soo Gal" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-4 text-center text-sm text-muted-foreground", children: [
        mode === "signup" ? "Akoon hore ma haysataa?" : "Akoon ma lihid?",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setMode(mode === "signup" ? "login" : "signup"), className: "font-semibold text-accent hover:underline", children: mode === "signup" ? "Soo gal" : "Is diiwaangeli" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-4 text-center text-xs text-muted-foreground", children: [
        "Ku noqo ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "underline", children: "bogga hore" })
      ] })
    ] }) })
  ] });
}
function GoogleLogo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { className: "h-4 w-4", viewBox: "0 0 48 48", "aria-hidden": "true", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { fill: "#FFC107", d: "M43.6 20.5H42V20H24v8h11.3c-1.6 4.6-6 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.4 6.1 29.5 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { fill: "#FF3D00", d: "M6.3 14.7l6.6 4.8C14.7 16 19 13 24 13c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.4 6.1 29.5 4 24 4 16.3 4 9.7 8.4 6.3 14.7z" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { fill: "#4CAF50", d: "M24 44c5.3 0 10.2-2 13.9-5.3l-6.4-5.4C29.4 35 26.8 36 24 36c-5.3 0-9.7-3.4-11.3-8l-6.5 5C9.5 39.5 16.2 44 24 44z" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { fill: "#1976D2", d: "M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.1-4 5.4l6.4 5.4c-.4.4 7-5.1 7-14.8 0-1.3-.1-2.4-.4-3.5z" })
  ] });
}
function Field({
  label,
  value,
  onChange,
  type = "text",
  icon
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mt-1.5", children: [
      icon && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground", children: icon }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type, value, onChange: (e) => onChange(e.target.value), className: `w-full rounded-lg border border-input bg-background py-2.5 text-sm outline-none ring-ring/20 focus:ring-2 ${icon ? "pl-9 pr-3" : "px-3"}` })
    ] })
  ] });
}
export {
  RegisterPage as component
};
