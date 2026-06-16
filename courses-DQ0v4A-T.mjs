import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useQuery } from "../_libs/tanstack__react-query.mjs";
import { a as CATEGORIES, L as Layout } from "./router-LcFJ8l5I.mjs";
import { s as supabase } from "./client-CeIwuk8s.mjs";
import "../_libs/sonner.mjs";
import { a as ImageOff, C as CirclePlay } from "../_libs/lucide-react.mjs";

import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-router.mjs";
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
function useCourses(category) {
  return useQuery({
    queryKey: ["courses", category ?? "all"],
    queryFn: async () => {
      let q = supabase.from("courses").select("*").eq("published", true).order("created_at", {
        ascending: false
      });
      if (category) q = q.eq("category", category);
      const {
        data,
        error
      } = await q;
      if (error) throw error;
      return data ?? [];
    }
  });
}
function CourseCard({
  c
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "group flex flex-col overflow-hidden rounded-2xl border border-border bg-card hover-lift animate-fade-in-up", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-video overflow-hidden bg-secondary", children: [
      c.image_url ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: c.image_url, alt: c.title, loading: "lazy", className: "h-full w-full object-cover transition duration-500 group-hover:scale-105" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-full w-full place-items-center text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ImageOff, { className: "h-10 w-10" }) }),
      c.video_url && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-black/60 text-white", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CirclePlay, { className: "h-5 w-5" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute left-3 top-3 rounded-full bg-brand-gradient px-3 py-1 text-xs font-semibold text-white", children: CATEGORIES[c.category].short })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-1 flex-col p-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg font-bold", children: c.title }),
      c.description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 line-clamp-3 text-sm text-muted-foreground", children: c.description }),
      c.video_url && /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: c.video_url, target: "_blank", rel: "noreferrer", className: "mt-4 inline-flex w-fit items-center gap-2 rounded-lg bg-brand-gradient px-4 py-2 text-sm font-semibold text-white transition hover:scale-105", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CirclePlay, { className: "h-4 w-4" }),
        " Daawo Video"
      ] })
    ] })
  ] });
}
function CoursesPage() {
  const {
    data,
    isLoading
  } = useCourses();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Layout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-hero-gradient py-16 text-white", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-4xl font-bold sm:text-5xl", children: "Koorasooyinka" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 max-w-xl text-white/85", children: "Liiska koorasooyinka Eng_omar — soo dooro kan kuu haboon." })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-muted-foreground", children: "Soo gelinaya..." }) : !data || data.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-muted-foreground", children: "Wali ma jiraan koorasooyin la gelinay." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-6 sm:grid-cols-2 lg:grid-cols-3", children: data.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(CourseCard, { c }, c.id)) }) })
  ] });
}
export {
  CourseCard,
  CoursesPage as component,
  useCourses
};
