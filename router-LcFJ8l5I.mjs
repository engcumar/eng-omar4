import { b as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { Q as QueryClientProvider, u as useQuery } from "../_libs/tanstack__react-query.mjs";
import { c as createRouter, a as createRootRouteWithContext, u as useRouter, L as Link, O as Outlet, H as HeadContent, S as Scripts, b as createFileRoute, l as lazyRouteComponent } from "../_libs/tanstack__react-router.mjs";
import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { s as supabase } from "./client-CeIwuk8s.mjs";
import { T as Toaster$1 } from "../_libs/sonner.mjs";
import { M as MessageCircle, I as Instagram, a as ImageOff, C as CirclePlay, G as GraduationCap, U as User, L as LayoutDashboard, b as LogOut, c as LogIn, d as UserPlus, X, e as Menu } from "../_libs/lucide-react.mjs";
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
const appCss = "/assets/styles-Dyu3iHpr.css";
function reportLovableError(error, context = {}) {
  if (typeof window === "undefined") return;
  window.__lovableEvents?.captureException?.(
    error,
    {
      source: "react_error_boundary",
      route: window.location.pathname,
      ...context
    },
    {
      mechanism: "react_error_boundary",
      handled: false,
      severity: "error"
    }
  );
}
const Ctx = reactExports.createContext({
  session: null,
  user: null,
  profile: null,
  isAdmin: false,
  isApproved: false,
  loading: true,
  refreshProfile: async () => {
  },
  signOut: async () => {
  }
});
function AuthProvider({ children }) {
  const [session, setSession] = reactExports.useState(null);
  const [profile, setProfile] = reactExports.useState(null);
  const [isAdmin, setIsAdmin] = reactExports.useState(false);
  const [loading, setLoading] = reactExports.useState(true);
  reactExports.useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });
    return () => sub.subscription.unsubscribe();
  }, []);
  const loadProfile = reactExports.useCallback(async (uid) => {
    const [{ data: p }, { data: r }] = await Promise.all([
      supabase.from("profiles").select("id, full_name, email, approval_status").eq("id", uid).maybeSingle(),
      supabase.from("user_roles").select("role").eq("user_id", uid).eq("role", "admin").maybeSingle()
    ]);
    setProfile(p ?? null);
    setIsAdmin(!!r);
  }, []);
  reactExports.useEffect(() => {
    const uid = session?.user?.id;
    if (!uid) {
      setProfile(null);
      setIsAdmin(false);
      return;
    }
    loadProfile(uid);
  }, [session?.user?.id, loadProfile]);
  const refreshProfile = reactExports.useCallback(async () => {
    if (session?.user?.id) await loadProfile(session.user.id);
  }, [session?.user?.id, loadProfile]);
  const isApproved = isAdmin || profile?.approval_status === "approved";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Ctx.Provider,
    {
      value: {
        session,
        user: session?.user ?? null,
        profile,
        isAdmin,
        isApproved,
        loading,
        refreshProfile,
        signOut: async () => {
          await supabase.auth.signOut();
        }
      },
      children
    }
  );
}
const useAuth = () => reactExports.useContext(Ctx);
const Toaster = ({ ...props }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Toaster$1,
    {
      className: "toaster group",
      toastOptions: {
        classNames: {
          toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
        }
      },
      ...props
    }
  );
};
function NotFoundComponent() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-7xl font-bold text-brand-gradient", children: "404" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-4 text-xl font-semibold", children: "Bogga lama helin" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Bogga aad raadinayso ma jiro ama waa la beddelay." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Link,
      {
        to: "/",
        className: "inline-flex items-center justify-center rounded-md bg-brand-gradient px-4 py-2 text-sm font-medium text-brand-foreground shadow-elegant transition hover:scale-105",
        children: "Ku noqo bogga hore"
      }
    ) })
  ] }) });
}
function ErrorComponent({ error, reset }) {
  console.error(error);
  const router2 = useRouter();
  reactExports.useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-semibold", children: "Khalad ayaa dhacay" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Fadlan mar kale isku day." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex justify-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => {
            router2.invalidate();
            reset();
          },
          className: "rounded-md bg-brand-gradient px-4 py-2 text-sm font-medium text-brand-foreground",
          children: "Mar kale isku day"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/", className: "rounded-md border border-border bg-background px-4 py-2 text-sm font-medium", children: "Bogga hore" })
    ] })
  ] }) });
}
const Route$d = createRootRouteWithContext()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Eng_omar" },
      { name: "description", content: "Eng_omar — barnaamijyo waxbarasho oo casri ah: Code, Video Editing iyo AI af Soomaali." },
      { property: "og:title", content: "Eng_omar" },
      { property: "og:description", content: "Eng_omar — barnaamijyo waxbarasho oo casri ah: Code, Video Editing iyo AI af Soomaali." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Eng_omar" },
      { name: "twitter:description", content: "Eng_omar — barnaamijyo waxbarasho oo casri ah: Code, Video Editing iyo AI af Soomaali." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/3103e920-ab1b-4fb4-b4a4-3a7ac04cfaf7/id-preview-112eb8ec--09734f3b-2b59-47be-a4c8-9eac1ae87657.lovable.app-1781182905739.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/3103e920-ab1b-4fb4-b4a4-3a7ac04cfaf7/id-preview-112eb8ec--09734f3b-2b59-47be-a4c8-9eac1ae87657.lovable.app-1781182905739.png" }
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@600;700;800&display=swap"
      }
    ]
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent
});
function RootShell({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("html", { lang: "so", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("head", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(Scripts, {})
    ] })
  ] });
}
function RootComponent() {
  const { queryClient } = Route$d.useRouteContext();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(QueryClientProvider, { client: queryClient, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AuthProvider, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Toaster, { richColors: true, position: "top-center" })
  ] }) });
}
const $$splitComponentImporter$c = () => import("./video-editing-BMvgEdLi.mjs");
const Route$c = createFileRoute("/video-editing")({
  head: () => ({
    meta: [{
      title: "Video Editing — Eng_omar"
    }, {
      name: "description",
      content: "Koorasooyinka Video Editing-ka ee Eng_omar."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$c, "component")
});
const $$splitComponentImporter$b = () => import("./register-C8xjiHyU.mjs");
const Route$b = createFileRoute("/register")({
  validateSearch: (s) => ({
    mode: s.mode === "login" ? "login" : "signup"
  }),
  head: () => ({
    meta: [{
      title: "Is Diiwaangeli — Eng_omar"
    }, {
      name: "description",
      content: "Sameyso akoon ama gal Eng_omar."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$b, "component")
});
const $$splitComponentImporter$a = () => import("./pending-FcUtq40U.mjs");
const Route$a = createFileRoute("/pending")({
  head: () => ({
    meta: [{
      title: "Akoonkaaga waa la eegayaa — Eng_omar"
    }, {
      name: "robots",
      content: "noindex"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$a, "component")
});
const $$splitComponentImporter$9 = () => import("./dashboard-CBX0uyZ3.mjs");
const Route$9 = createFileRoute("/dashboard")({
  head: () => ({
    meta: [{
      title: "Dashboard-ka Ardayga — Eng_omar"
    }, {
      name: "robots",
      content: "noindex"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
const SITE = {
  name: "Eng_omar",
  tagline: "Barashada Code, Video Editing iyo AI — Si fudud oo casri ah.",
  whatsappNumber: "+252656861821",
  whatsappLink: "https://wa.me/252656861821",
  instagram: "https://instagram.com/weheliyow1",
  instagramHandle: "@weheliyow1",
  tiktok: "https://tiktok.com/@eng_omar6",
  tiktokHandle: "@eng_omar6"
};
const NAV = [
  { to: "/", label: "Bogga" },
  { to: "/courses", label: "Koorasooyinka" },
  { to: "/coding", label: "Code" },
  { to: "/video-editing", label: "Video Editing" },
  { to: "/ai", label: "AI" },
  { to: "/about", label: "Naga" },
  { to: "/contact", label: "Nala Soo Xiriir" }
];
const CATEGORIES = {
  coding: {
    label: "Barnaamijyada Code-ka",
    short: "Code",
    desc: "Baro luqadaha barnaamijyada sida HTML, CSS, JavaScript, Python iyo ka horraysa, oo lagu fahmi karo si fudud.",
    href: "/coding",
    key: "coding"
  },
  video_editing: {
    label: "Video Editing",
    short: "Video Editing",
    desc: "Baro sida loo sameeyo video xirfadlayaal ah adoo isticmaalaya Premiere, CapCut iyo qalabkii ugu fiicnaa.",
    href: "/video-editing",
    key: "video_editing"
  },
  ai: {
    label: "Artificial Intelligence",
    short: "AI",
    desc: "Fahmo aasaaska AI-da, ChatGPT, qalabka casriga ah iyo sida loogu isticmaalo shaqo iyo waxbarasho.",
    href: "/ai",
    key: "ai"
  }
};
const $$splitComponentImporter$8 = () => import("./courses-DQ0v4A-T.mjs");
const Route$8 = createFileRoute("/courses")({
  head: () => ({
    meta: [{
      title: "Koorasooyinka — Eng_omar"
    }, {
      name: "description",
      content: "Liiska dhammaan koorasooyinka Eng_omar — Code, Video Editing iyo AI."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
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
const $$splitComponentImporter$7 = () => import("./contact-B-SLRgZV.mjs");
const Route$7 = createFileRoute("/contact")({
  head: () => ({
    meta: [{
      title: "Nala Soo Xiriir — Eng_omar"
    }, {
      name: "description",
      content: "Nala soo xiriir Eng_omar — foomka xiriirka iyo WhatsApp."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
function TikTokIcon({ className }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { viewBox: "0 0 24 24", fill: "currentColor", className, "aria-hidden": true, children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.7 20.1a6.34 6.34 0 0 0 10.86-4.43V8.62a8.16 8.16 0 0 0 4.77 1.52V6.7a4.85 4.85 0 0 1-1.74-.01Z" }) });
}
function SocialIcons({ size = "md" }) {
  const s = size === "lg" ? "h-6 w-6" : size === "sm" ? "h-4 w-4" : "h-5 w-5";
  const box = size === "lg" ? "h-12 w-12" : size === "sm" ? "h-8 w-8" : "h-10 w-10";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "a",
      {
        href: SITE.whatsappLink,
        target: "_blank",
        rel: "noreferrer",
        "aria-label": "WhatsApp",
        className: `grid ${box} place-items-center rounded-full bg-[var(--whatsapp)]/15 text-[var(--whatsapp)] transition-all hover:scale-110 hover:bg-[var(--whatsapp)] hover:text-white`,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: s })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "a",
      {
        href: SITE.instagram,
        target: "_blank",
        rel: "noreferrer",
        "aria-label": "Instagram",
        className: `grid ${box} place-items-center rounded-full bg-brand/15 text-brand transition-all hover:scale-110 hover:bg-brand hover:text-brand-foreground`,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Instagram, { className: s })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "a",
      {
        href: SITE.tiktok,
        target: "_blank",
        rel: "noreferrer",
        "aria-label": "TikTok",
        className: `grid ${box} place-items-center rounded-full bg-primary/10 text-primary transition-all hover:scale-110 hover:bg-primary hover:text-primary-foreground`,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(TikTokIcon, { className: s })
      }
    )
  ] });
}
function Header() {
  const [open, setOpen] = reactExports.useState(false);
  const { user, isAdmin, signOut } = useAuth();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "flex items-center gap-2 group", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-10 w-10 place-items-center rounded-xl bg-brand-gradient shadow-glow transition-transform group-hover:scale-110", children: /* @__PURE__ */ jsxRuntimeExports.jsx(GraduationCap, { className: "h-5 w-5 text-white" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col leading-none", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-lg font-bold text-brand-gradient", children: SITE.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground", children: "Learn · Build · Grow" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "hidden items-center gap-1 lg:flex", children: NAV.map((n) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        Link,
        {
          to: n.to,
          className: "rounded-md px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-accent/10 hover:text-accent",
          activeProps: { className: "bg-accent/10 text-accent" },
          activeOptions: { exact: n.to === "/" },
          children: n.label
        },
        n.to
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden items-center gap-2 lg:flex", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SocialIcons, { size: "sm" }),
        user ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Link,
            {
              to: "/dashboard",
              className: "inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-sm font-medium hover:bg-secondary",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "h-4 w-4" }),
                " Dashboard"
              ]
            }
          ),
          isAdmin && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Link,
            {
              to: "/admin",
              className: "inline-flex items-center gap-1.5 rounded-lg bg-primary/10 px-3 py-2 text-sm font-semibold text-primary transition hover:bg-primary hover:text-primary-foreground",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(LayoutDashboard, { className: "h-4 w-4" }),
                " Admin"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              onClick: signOut,
              className: "inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-sm font-medium hover:bg-secondary",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "h-4 w-4" }),
                " Ka bax"
              ]
            }
          )
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Link,
            {
              to: "/register",
              search: { mode: "login" },
              className: "inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-sm font-medium hover:bg-secondary",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(LogIn, { className: "h-4 w-4" }),
                " Soo Gal"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Link,
            {
              to: "/register",
              className: "inline-flex items-center gap-1.5 rounded-lg bg-brand-gradient px-4 py-2 text-sm font-semibold text-brand-foreground shadow-elegant transition hover:scale-105",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(UserPlus, { className: "h-4 w-4" }),
                " Is Diiwaangeli"
              ]
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => setOpen((o) => !o),
          className: "grid h-10 w-10 place-items-center rounded-lg border border-border lg:hidden",
          "aria-label": "Menu",
          children: open ? /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-5 w-5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Menu, { className: "h-5 w-5" })
        }
      )
    ] }),
    open && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-t border-border bg-background lg:hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "mx-auto flex max-w-7xl flex-col gap-1 px-4 py-3", children: [
      NAV.map((n) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        Link,
        {
          to: n.to,
          onClick: () => setOpen(false),
          className: "rounded-md px-3 py-2 text-sm font-medium hover:bg-secondary",
          activeProps: { className: "bg-accent/10 text-accent" },
          activeOptions: { exact: n.to === "/" },
          children: n.label
        },
        n.to
      )),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 flex flex-wrap items-center justify-between gap-2 border-t border-border pt-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SocialIcons, { size: "sm" }),
        user ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/dashboard", onClick: () => setOpen(false), className: "rounded-lg border border-border px-3 py-2 text-xs font-medium", children: "Dashboard" }),
          isAdmin && /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/admin", onClick: () => setOpen(false), className: "rounded-lg bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground", children: "Admin" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: signOut, className: "rounded-lg border border-border px-3 py-2 text-xs font-medium", children: "Ka bax" })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/register", search: { mode: "login" }, onClick: () => setOpen(false), className: "rounded-lg border border-border px-3 py-2 text-xs font-medium", children: "Soo Gal" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/register", onClick: () => setOpen(false), className: "rounded-lg bg-brand-gradient px-4 py-2 text-xs font-semibold text-brand-foreground", children: "Is Diiwaangeli" })
        ] })
      ] })
    ] }) })
  ] });
}
function Footer() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("footer", { className: "mt-24 border-t border-border bg-primary text-primary-foreground", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-4 lg:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-10 w-10 place-items-center rounded-xl bg-brand text-brand-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(GraduationCap, { className: "h-5 w-5" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-xl font-bold", children: SITE.name })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-sm text-primary-foreground/70", children: SITE.tagline }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SocialIcons, {}) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold uppercase tracking-wider text-brand", children: "Linkiyada" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-4 space-y-2 text-sm", children: NAV.map((n) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Link,
          {
            to: n.to,
            className: "text-primary-foreground/80 transition hover:text-brand",
            children: n.label
          }
        ) }, n.to)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold uppercase tracking-wider text-brand", children: "Xiriir" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "mt-4 space-y-2 text-sm text-primary-foreground/80", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
            "WhatsApp: ",
            SITE.whatsappNumber
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
            "Instagram: ",
            SITE.instagramHandle
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
            "TikTok: ",
            SITE.tiktokHandle
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold uppercase tracking-wider text-brand", children: "Nala soo xiriir" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "a",
          {
            href: SITE.whatsappLink,
            target: "_blank",
            rel: "noreferrer",
            className: "mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--whatsapp)] px-5 py-3 font-semibold text-white shadow-elegant transition hover:scale-105 animate-pulse-glow",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "h-5 w-5" }),
              " Ku xiriir WhatsApp"
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t border-primary-foreground/10 py-5 text-center text-xs text-primary-foreground/70", children: [
      "© ",
      (/* @__PURE__ */ new Date()).getFullYear(),
      " ",
      SITE.name,
      ". Dhammaan xuquuqdu way xifdisan tahay."
    ] })
  ] });
}
function Layout({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-h-screen flex-col", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Header, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "flex-1", children }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
  ] });
}
const $$splitComponentImporter$6 = () => import("./coding-BMnBa9K6.mjs");
const Route$6 = createFileRoute("/coding")({
  head: () => ({
    meta: [{
      title: "Code — Eng_omar"
    }, {
      name: "description",
      content: "Koorasooyinka Code-ka ee Eng_omar."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
function CategoryPage({
  cat,
  img
}) {
  const meta = CATEGORIES[cat];
  const {
    data,
    isLoading
  } = useCourses(meta.key);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Layout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "relative overflow-hidden bg-hero-gradient py-16 text-white", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto grid max-w-7xl items-center gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "animate-fade-in-up", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full bg-white/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider", children: meta.short }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-4 font-display text-4xl font-bold sm:text-5xl", children: meta.label }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 max-w-lg text-white/85", children: meta.desc })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: img, alt: meta.label, loading: "lazy", className: "rounded-2xl shadow-elegant ring-1 ring-white/20" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-2xl font-bold", children: [
        "Koorasooyinka ",
        meta.short
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Soo gelinaya..." }) : !data || data.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Wali ma jiraan koorasooyin la gelinay qaybtan." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-6 sm:grid-cols-2 lg:grid-cols-3", children: data.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(CourseCard, { c }, c.id)) }) })
    ] })
  ] });
}
const $$splitComponentImporter$5 = () => import("./capcut-course-DK-_7ln6.mjs");
const Route$5 = createFileRoute("/capcut-course")({
  head: () => ({
    meta: [{
      title: "Course Basic Video Editing — CapCut | Eng_omar"
    }, {
      name: "description",
      content: "Koorsada dhamaystiran ee CapCut Video Editing — casharro, layliyo, imtixaano, iyo shahaado."
    }, {
      property: "og:title",
      content: "Course Basic Video Editing — CapCut"
    }, {
      property: "og:description",
      content: "Baro CapCut laga bilaabo bilow ilaa heer xirfadeed. 10 module, layliyo, imtixaan dhexe & ugu dambeeya, iyo shahaado."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
const $$splitComponentImporter$4 = () => import("./ai-BQvnv_8D.mjs");
const Route$4 = createFileRoute("/ai")({
  head: () => ({
    meta: [{
      title: "AI — Sirdoonka Macmalka ah — Eng_omar"
    }, {
      name: "description",
      content: "Baro Artificial Intelligence-ka, sida uu u shaqeeyo, noocyadiisa iyo sida loogu isticmaalo dunida casriga ah."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
const $$splitComponentImporter$3 = () => import("./admin-CcMNQjWP.mjs");
const Route$3 = createFileRoute("/admin")({
  head: () => ({
    meta: [{
      title: "Admin — Eng_omar"
    }, {
      name: "robots",
      content: "noindex"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import("./about-BmtdI6z4.mjs");
const Route$2 = createFileRoute("/about")({
  head: () => ({
    meta: [{
      title: "Naga — Eng_omar"
    }, {
      name: "description",
      content: "Wax ka ogow Eng_omar — bartilmaameedkayaga iyo aragtidayada."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("./index-BFcWD2Q2.mjs");
const Route$1 = createFileRoute("/")({
  head: () => ({
    meta: [{
      title: "Eng_omar — Barashada Code, Video Editing iyo AI"
    }, {
      name: "description",
      content: "Ku soo dhowoow Eng_omar — koorasooyin Code, Video Editing iyo AI ah oo af Soomaali ku qoran."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const COURSE_TITLE = "Course Basic Video Editing";
const $$splitComponentImporter = () => import("./enroll.capcut-BnaSnGWX.mjs");
const COURSE_SLUG = "capcut-basic-video-editing";
const COURSE_PRICE_USD = 25;
const Route = createFileRoute("/enroll/capcut")({
  head: () => ({
    meta: [{
      title: `Iska Diiwaan Geli — ${COURSE_TITLE}`
    }, {
      name: "description",
      content: "Iska diiwaan geli Course Basic Video Editing. Bixi lacagta ama nagala soo xiriir WhatsApp."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const VideoEditingRoute = Route$c.update({
  id: "/video-editing",
  path: "/video-editing",
  getParentRoute: () => Route$d
});
const RegisterRoute = Route$b.update({
  id: "/register",
  path: "/register",
  getParentRoute: () => Route$d
});
const PendingRoute = Route$a.update({
  id: "/pending",
  path: "/pending",
  getParentRoute: () => Route$d
});
const DashboardRoute = Route$9.update({
  id: "/dashboard",
  path: "/dashboard",
  getParentRoute: () => Route$d
});
const CoursesRoute = Route$8.update({
  id: "/courses",
  path: "/courses",
  getParentRoute: () => Route$d
});
const ContactRoute = Route$7.update({
  id: "/contact",
  path: "/contact",
  getParentRoute: () => Route$d
});
const CodingRoute = Route$6.update({
  id: "/coding",
  path: "/coding",
  getParentRoute: () => Route$d
});
const CapcutCourseRoute = Route$5.update({
  id: "/capcut-course",
  path: "/capcut-course",
  getParentRoute: () => Route$d
});
const AiRoute = Route$4.update({
  id: "/ai",
  path: "/ai",
  getParentRoute: () => Route$d
});
const AdminRoute = Route$3.update({
  id: "/admin",
  path: "/admin",
  getParentRoute: () => Route$d
});
const AboutRoute = Route$2.update({
  id: "/about",
  path: "/about",
  getParentRoute: () => Route$d
});
const IndexRoute = Route$1.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$d
});
const EnrollCapcutRoute = Route.update({
  id: "/enroll/capcut",
  path: "/enroll/capcut",
  getParentRoute: () => Route$d
});
const rootRouteChildren = {
  IndexRoute,
  AboutRoute,
  AdminRoute,
  AiRoute,
  CapcutCourseRoute,
  CodingRoute,
  ContactRoute,
  CoursesRoute,
  DashboardRoute,
  PendingRoute,
  RegisterRoute,
  VideoEditingRoute,
  EnrollCapcutRoute
};
const routeTree = Route$d._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const queryClient = new QueryClient();
  const router2 = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0
  });
  return router2;
};
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  CategoryPage as C,
  Layout as L,
  Route$b as R,
  SITE as S,
  CATEGORIES as a,
  SocialIcons as b,
  useCourses as c,
  CourseCard as d,
  COURSE_SLUG as e,
  COURSE_TITLE as f,
  COURSE_PRICE_USD as g,
  router as r,
  useAuth as u
};
