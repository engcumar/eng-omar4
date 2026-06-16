import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { c as useCourses, L as Layout, a as CATEGORIES, d as CourseCard } from "./router-LcFJ8l5I.mjs";
import "../_libs/sonner.mjs";
import { l as Sparkles, q as Brain, r as ArrowRight, s as Cpu, t as Bot, u as MessageSquare, E as Eye, v as Settings, w as Globe, Z as Zap } from "../_libs/lucide-react.mjs";

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
const aiHeroImg = "/assets/ai-hero-BOr0U1D7.jpg";
const aiPeopleImg = "/assets/ai-people-oJ4V64Gw.jpg";
const aiRobotImg = "/assets/ai-robot-DdjNGA7t.jpg";
const aiTypes = [{
  icon: MessageSquare,
  title: "NLP — Natural Language Processing",
  desc: "Waa nooca AI-ga oo fahma luqadda dadka, sida ChatGPT. Waxuu qori karaa, u tarjumi karaa, ugu jawaabi karaa su'aalaha si caqli leh."
}, {
  icon: Eye,
  title: "Computer Vision",
  desc: "Waa awoodda AI-ga ee ay ku arkaan sawiryo iyo video. Waxaa loo isticmaalaa ganacsiga, caafimaadka, iyo amniga si ay u garto wejiyada iyo alaabada."
}, {
  icon: Settings,
  title: "Machine Learning",
  desc: "Waa habka ay ku barataan kombiyutarayaasha si ay u sameeyaan go'aanoyin iyaga oo eegaya xog badan. Waxaa ka helaa cabbiryo, saami-qiyaas iyo talo-bixin."
}, {
  icon: Bot,
  title: "Robotics & Automation",
  desc: "Waa isbitaallo iyo makinadaha la hoggaamiyo AI ah. Waxaa loo isticmaalaa warshadaha, xarumaha daaweynta, iyo meelaha khatarta ku jirto."
}, {
  icon: Globe,
  title: "Generative AI",
  desc: "Waa nooca AI-ga ee sameeya wax cusub — sawirro, muusig, video, iyo qoraal. Tusaale waa Midjourney, DALL-E, iyo qalabka kale ee abuurista."
}, {
  icon: Zap,
  title: "Deep Learning",
  desc: "Waa qayb ka mid ah Machine Learning-ka oo isticmaala neural networks oo qoto dheer. Waxaa ku shaqeeyaa qalabka ugu casriga sida self-driving cars."
}];
function AIPage() {
  const {
    data: courses,
    isLoading
  } = useCourses("ai");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Layout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative overflow-hidden bg-hero-gradient py-16 text-white lg:py-24", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 opacity-25", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -left-32 top-10 h-72 w-72 rounded-full bg-brand blur-3xl animate-float" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute right-0 bottom-0 h-96 w-96 rounded-full bg-white/10 blur-3xl" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "animate-fade-in-up", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-medium backdrop-blur", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-3.5 w-3.5" }),
            " Teknoolojiga Casriga ah"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "mt-5 font-display text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl", children: [
            "AI –",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block bg-gradient-to-r from-white via-sky-200 to-sky-400 bg-clip-text text-transparent", children: "Sirdoonka Macmalka ah ee Beddelaya Dunida Casriga ah" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-5 max-w-xl text-base text-white/85 sm:text-lg", children: "Artificial Intelligence (AI) waa xoogga beddelaya shaqooyinka, waxbarashada, iyo nolosha maalinlaha ah. Halkan waxaad ka baran doontaa aasaaska, noocyada, iyo sida aad ugu isticmaali karto." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 flex flex-wrap gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/courses", className: "group inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-primary shadow-elegant transition hover:scale-105", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Brain, { className: "h-5 w-5" }),
              " Daawo Koorasooyinka AI",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4 transition group-hover:translate-x-1" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "https://wa.me/252656861821", target: "_blank", rel: "noreferrer", className: "inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-6 py-3 font-semibold backdrop-blur transition hover:bg-white/20", children: "Weydii Su'aal WhatsApp" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative animate-fade-in", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -inset-4 rounded-3xl bg-brand/30 blur-3xl" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: aiHeroImg, alt: "Digital brain representing Artificial Intelligence", width: 1344, height: 896, className: "relative rounded-3xl shadow-elegant ring-1 ring-white/20" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-3xl text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-2 rounded-full bg-accent/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-accent", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Cpu, { className: "h-3.5 w-3.5" }),
          " Aasaaska"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-4 font-display text-3xl font-bold sm:text-4xl", children: "Waa Maxay AI (Artificial Intelligence)?" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-12 grid items-center gap-10 lg:grid-cols-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "animate-fade-in-up space-y-5 text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-lg leading-relaxed text-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Artificial Intelligence (AI)" }),
            " ama ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Sirdoonka Macmalka ah" }),
            " waa cilmiga kombiyutararka ee loo sameeyay inay u dhaqmaan sida dadka caqli leh — ay fahmaan, ay baran, ay go'aan ka gaaraan, oo ay u sameeyaan shaqooyin badan oo caqli u baahan."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Tusaale ahaan, AI waxaa loo isticmaalaa inuu qoro qoraallo, uu sameeyo sawirro, uu u jawaabo su'aalahaada, uu kugu taliyo alaabada aad jeceshahay, iyo xitaa inuu xirfado caafimaad la sameeyo." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
            "AI-ga ugu caansan ee hadda jira waa ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "ChatGPT" }),
            ", oo ah qalabka uu sameeyay shirkadda OpenAI. Waxaad kula hadli kartaa af Soomaali, waxaad ka weydiin kartaa wax kasta oo aad rabto, wuuna kuu jawaabi doonaa si degdeg ah oo fahmi karo."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Soo koobid ahaan, AI waa xoog weyn oo beddelaya adduunka. Haddii aad barato sida loo isticmaalo, waxaad heli doontaa fursado shaqo iyo xirfado cusub oo qiimo weyn leh." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative animate-fade-in", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -inset-4 rounded-3xl bg-brand/20 blur-2xl" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: aiPeopleImg, alt: "Dad ku isticmaalaya teknoolojiyada AI", width: 1344, height: 896, loading: "lazy", className: "relative rounded-3xl shadow-elegant ring-1 ring-border" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-muted/40 py-20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-3xl text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-2 rounded-full bg-accent/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-accent", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Bot, { className: "h-3.5 w-3.5" }),
          " Qaybaha"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-4 font-display text-3xl font-bold sm:text-4xl", children: "Noocyada AI ee Ugu Caansan" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-muted-foreground", children: "AI-ga wuxuu leeyahay noocyo kala duwan oo mid kasta u adeega ujeeddo gaar ah. Halkan waxaa ku qoran kuwa ugu muhiimsan." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3", children: aiTypes.map(({
        icon: Icon,
        title,
        desc
      }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "group flex flex-col rounded-2xl border border-border bg-card p-6 hover-lift animate-fade-in-up", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-12 w-12 place-items-center rounded-xl bg-brand-gradient text-white shadow-glow", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-6 w-6" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-4 font-display text-lg font-bold", children: title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 flex-1 text-sm text-muted-foreground leading-relaxed", children: desc })
      ] }, title)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-14 grid items-center gap-10 lg:grid-cols-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative order-2 animate-fade-in lg:order-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -inset-4 rounded-3xl bg-brand/20 blur-2xl" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: aiRobotImg, alt: "Robotic innovation and advanced AI technology", width: 1024, height: 1024, loading: "lazy", className: "relative rounded-3xl shadow-elegant ring-1 ring-border" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "order-1 space-y-5 text-muted-foreground lg:order-2 animate-fade-in-up", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-2xl font-bold text-foreground", children: "Soo Koobid: Soo dhawoow Mustaqbalka!" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Noocyada AI-ga oo dhammu waxay ka shaqeeyaan hab kasta oo kombiyutar uu u baran karo xog, uu u fahmi karo jawi, oo uu u sameeyo go'aanoyin caqli leh." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "AI-du waxay u adeegaysaa qaar ka mid ah shirkadaha ugu waaweyn adduunka sida Google, Microsoft, Amazon, iyo Tesla. Sidoo kale, startup-yada Soomaaliyeed iyo qaaradda Afrika waxay bilaabayaan inay isticmaalaan AI si ay u dhiirrigeliyaan wax-soo-saarka." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Haddii aad jeclaan lahayd inaad barato sida AI-ga loo isticmaalo — sida ChatGPT, Midjourney, iyo qalabka kale — ku biir koorasoyinka Eng_omar. Waxaan ku barinaa af Soomaali si fudud oo la fahmi karo." })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-3xl text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-3xl font-bold sm:text-4xl", children: [
          "Koorasooyinka ",
          CATEGORIES.ai.short
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-muted-foreground", children: "Soo dooro kooras oo bilow barashadaada AI-ga hadda." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-10", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-muted-foreground", children: "Soo gelinaya..." }) : !courses || courses.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-xl rounded-2xl border border-border bg-card p-8 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Bot, { className: "mx-auto h-12 w-12 text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-muted-foreground", children: "Wali ma jiraan koorasooyin la gelinay qaybtan. Fadlan dib u soo noqo soon!" })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-6 sm:grid-cols-2 lg:grid-cols-3", children: courses.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(CourseCard, { c }, c.id)) }) })
    ] })
  ] });
}
export {
  AIPage as component
};
