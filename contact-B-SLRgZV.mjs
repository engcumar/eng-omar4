import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { L as Layout, S as SITE, b as SocialIcons } from "./router-LcFJ8l5I.mjs";
import { s as supabase } from "./client-CeIwuk8s.mjs";
import { S as Send, M as MessageCircle } from "../_libs/lucide-react.mjs";
import { o as objectType, s as stringType } from "../_libs/zod.mjs";

import "../_libs/react-dom.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/unenv.mjs";


import "../_libs/seroval-plugins.mjs";


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
const schema = objectType({
  full_name: stringType().trim().min(2, "Magaca oo dhameystiran ha ka yaraan 2 xaraf").max(120),
  email: stringType().trim().email("Email sax ah geli").max(255),
  message: stringType().trim().min(5, "Fariintu ha ka yaraan 5 xaraf").max(5e3)
});
function ContactPage() {
  const [form, setForm] = reactExports.useState({
    full_name: "",
    email: "",
    message: ""
  });
  const [submitting, setSubmitting] = reactExports.useState(false);
  async function onSubmit(e) {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }
    setSubmitting(true);
    const {
      error
    } = await supabase.from("contact_messages").insert(parsed.data);
    setSubmitting(false);
    if (error) return toast.error("Khalad ayaa dhacay. Mar kale isku day.");
    toast.success("Mahadsanid! Fariintaada waa la helay.");
    setForm({
      full_name: "",
      email: "",
      message: ""
    });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Layout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-hero-gradient py-16 text-white", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8 animate-fade-in-up", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-4xl font-bold sm:text-5xl", children: "Nala Soo Xiriir" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mx-auto mt-3 max-w-xl text-white/85", children: "Su'aal ma qabtaa? Noo soo dir fariin ama si toos ah noogu soo xiriir WhatsApp." })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mx-auto grid max-w-6xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-5 lg:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit, className: "lg:col-span-3 rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-elegant animate-fade-in", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold", children: "Foomka Xiriirka" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 grid gap-4 sm:grid-cols-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Magaca oo dhameystiran", value: form.full_name, onChange: (v) => setForm({
            ...form,
            full_name: v
          }), placeholder: "Magacaaga" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Email", value: form.email, onChange: (v) => setForm({
            ...form,
            email: v
          }), placeholder: "your@email.com", type: "email" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium", children: "Fariinta" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { value: form.message, onChange: (e) => setForm({
            ...form,
            message: e.target.value
          }), rows: 6, maxLength: 5e3, className: "mt-1.5 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none ring-ring/20 focus:ring-2", placeholder: "Qor fariintaada halkan..." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "submit", disabled: submitting, className: "mt-6 inline-flex items-center gap-2 rounded-xl bg-brand-gradient px-6 py-3 font-semibold text-brand-foreground shadow-elegant transition hover:scale-105 disabled:opacity-60", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "h-4 w-4" }),
          " ",
          submitting ? "Diraya..." : "Dir Fariinta"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "lg:col-span-2 flex flex-col gap-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: SITE.whatsappLink, target: "_blank", rel: "noreferrer", className: "flex items-center gap-4 rounded-2xl bg-[var(--whatsapp)] p-6 text-white shadow-elegant transition hover:scale-105 animate-pulse-glow", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-14 w-14 place-items-center rounded-xl bg-white/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "h-7 w-7" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-wider opacity-90", children: "Si toos ah" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-xl font-bold", children: "Nagala hadal WhatsApp" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm opacity-90", children: SITE.whatsappNumber })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg font-bold", children: "Warbaahinta Bulshada" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "Naga raac:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SocialIcons, { size: "lg" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "mt-4 space-y-1 text-sm text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
              "Instagram: ",
              SITE.instagramHandle
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
              "TikTok: ",
              SITE.tiktokHandle
            ] })
          ] })
        ] })
      ] })
    ] })
  ] });
}
function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text"
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type, value, onChange: (e) => onChange(e.target.value), placeholder, className: "mt-1.5 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none ring-ring/20 focus:ring-2" })
  ] });
}
export {
  ContactPage as component
};
