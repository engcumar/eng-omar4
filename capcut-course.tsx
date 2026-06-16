import { createFileRoute, Link, Navigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import {
  PlayCircle,
  CheckCircle2,
  Circle,
  Award,
  GraduationCap,
  FileQuestion,
  Sparkles,
  Video,
  ChevronDown,
  Lock,
  CreditCard,
  Loader2,
  MessageCircle,
} from "lucide-react";
import { SITE } from "@/lib/site";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/integrations/supabase/client";

const COURSE_SLUG = "capcut-basic-video-editing";

export const Route = createFileRoute("/capcut-course")({
  head: () => ({
    meta: [
      { title: "Course Basic Video Editing — CapCut | Eng_omar" },
      {
        name: "description",
        content:
          "Koorsada dhamaystiran ee CapCut Video Editing — casharro, layliyo, imtixaano, iyo shahaado.",
      },
      { property: "og:title", content: "Course Basic Video Editing — CapCut" },
      {
        property: "og:description",
        content:
          "Baro CapCut laga bilaabo bilow ilaa heer xirfadeed. 10 module, layliyo, imtixaan dhexe & ugu dambeeya, iyo shahaado.",
      },
    ],
  }),
  component: CapCutCoursePage,
});

type Lesson = {
  id: string;
  title: string;
  description: string;
  exercise: string;
};

const MODULES: Lesson[] = [
  { id: "m1", title: "Module 1: Hordhac CapCut", description: "Module-kan wuxuu barayaa ardayga xirfadaha muhiimka ah ee hordhac CapCut — sida loo soo dejiyo, interface-ka, iyo abuurista mashruuc cusub.", exercise: "Samee hawsha lagu bartay casharkan adigoo isticmaalaya CapCut." },
  { id: "m2", title: "Module 2: Aasaaska Editing", description: "Module-kan wuxuu barayaa ardayga xirfadaha muhiimka ah ee aasaaska editing — cutting, trimming, split iyo timeline management.", exercise: "Samee hawsha lagu bartay casharkan adigoo isticmaalaya CapCut." },
  { id: "m3", title: "Module 3: Qoraal iyo Subtitles", description: "Module-kan wuxuu barayaa ardayga xirfadaha muhiimka ah ee qoraal iyo subtitles, oo ay ku jiraan Auto Captions iyo styling.", exercise: "Samee hawsha lagu bartay casharkan adigoo isticmaalaya CapCut." },
  { id: "m4", title: "Module 4: Music iyo Voice-over", description: "Module-kan wuxuu barayaa ardayga xirfadaha muhiimka ah ee music iyo voice-over — ku darista muusig, audio mixing iyo dubbing.", exercise: "Samee hawsha lagu bartay casharkan adigoo isticmaalaya CapCut." },
  { id: "m5", title: "Module 5: Effects iyo Transitions", description: "Module-kan wuxuu barayaa ardayga xirfadaha muhiimka ah ee effects iyo transitions si video-gaagu u eego mid xirfadeed.", exercise: "Samee hawsha lagu bartay casharkan adigoo isticmaalaya CapCut." },
  { id: "m6", title: "Module 6: Color Editing", description: "Module-kan wuxuu barayaa ardayga xirfadaha muhiimka ah ee color editing, color grading iyo filters.", exercise: "Samee hawsha lagu bartay casharkan adigoo isticmaalaya CapCut." },
  { id: "m7", title: "Module 7: Green Screen", description: "Module-kan wuxuu barayaa ardayga xirfadaha muhiimka ah ee green screen (chroma key) iyo bedelka background-ka.", exercise: "Samee hawsha lagu bartay casharkan adigoo isticmaalaya CapCut." },
  { id: "m8", title: "Module 8: TikTok, Reels iyo YouTube Editing", description: "Module-kan wuxuu barayaa ardayga xirfadaha muhiimka ah ee TikTok, Reels iyo YouTube editing — aspect ratios iyo trends.", exercise: "Samee hawsha lagu bartay casharkan adigoo isticmaalaya CapCut." },
  { id: "m9", title: "Module 9: Mashruucyo Dhab ah", description: "Module-kan wuxuu barayaa ardayga xirfadaha muhiimka ah ee mashruucyo dhab ah sida ads, vlogs iyo cinematic edits.", exercise: "Samee hawsha lagu bartay casharkan adigoo isticmaalaya CapCut." },
  { id: "m10", title: "Module 10: Export iyo Bilaabista Shaqo", description: "Module-kan wuxuu barayaa ardayga xirfadaha muhiimka ah ee export, quality settings iyo sida loo bilaabo shaqada freelance.", exercise: "Samee hawsha lagu bartay casharkan adigoo isticmaalaya CapCut." },
];

const MIDTERM = [
  "Split tool maxaa loo isticmaalaa?",
  "Auto Captions maxay qabataa?",
  "Waa maxay Transition?",
];

const STORAGE_KEY = "capcut-course-progress-v1";

function useProgress() {
  const [done, setDone] = useState<Record<string, boolean>>({});
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setDone(JSON.parse(raw));
    } catch {}
  }, []);
  const toggle = (id: string) =>
    setDone((p) => {
      const next = { ...p, [id]: !p[id] };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {}
      return next;
    });
  return { done, toggle };
}

function useCourseAccess() {
  const { user, isAdmin } = useAuth();
  const [hasAccess, setHasAccess] = useState<boolean | null>(null);
  useEffect(() => {
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
      const { data } = await supabase
        .from("course_enrollments")
        .select("payment_status, access_granted")
        .eq("user_id", user.id)
        .eq("course_slug", COURSE_SLUG)
        .maybeSingle();
      if (!active) return;
      setHasAccess(
        !!(data && data.payment_status === "paid" && data.access_granted),
      );
    })();
    return () => {
      active = false;
    };
  }, [user, isAdmin]);
  return hasAccess;
}

function CapCutCoursePage() {
  const { user, loading } = useAuth();
  const hasAccess = useCourseAccess();
  const { done, toggle } = useProgress();
  const [openId, setOpenId] = useState<string | null>("m1");

  const total = MODULES.length + 2;
  const completed = useMemo(
    () => Object.values(done).filter(Boolean).length,
    [done],
  );
  const percent = Math.round((completed / total) * 100);
  const passed = percent >= 70;

  if (loading || hasAccess === null) {
    return (
      <Layout>
        <div className="grid min-h-[60vh] place-items-center">
          <Loader2 className="h-8 w-8 animate-spin text-brand" />
        </div>
      </Layout>
    );
  }
  if (!user) return <Navigate to="/register" search={{ mode: "login" } as never} />;
  if (!hasAccess) return <PaymentRequired />;

  return (
    <Layout>
      {/* Hero */}
      <section className="relative overflow-hidden bg-hero-gradient py-16 text-white sm:py-20">
        <div className="absolute inset-0 opacity-20 [background:radial-gradient(circle_at_20%_20%,white,transparent_40%)]" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-[1.2fr_1fr] lg:px-8">
          <div className="animate-fade-in-up">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider backdrop-blur">
              <Sparkles className="h-3.5 w-3.5" /> Koorso Furan
            </span>
            <h1 className="mt-4 font-display text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
              Course Basic Video Editing
            </h1>
            <p className="mt-4 max-w-xl text-white/85 sm:text-lg">
              Koorso dhamaystiran oo CapCut ah laga bilaabo bilow ilaa heer xirfadeed.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button
                size="lg"
                className="bg-white text-primary hover:bg-white/90"
                onClick={() => document.getElementById("modules")?.scrollIntoView({ behavior: "smooth" })}
              >
                <GraduationCap className="h-5 w-5" /> Bilow Casharrada
              </Button>
            </div>
            <div className="mt-8 grid max-w-md grid-cols-3 gap-4 text-center">
              <Stat n="10" label="Module" />
              <Stat n="10+" label="Layli" />
              <Stat n="2" label="Imtixaan" />
            </div>
          </div>
          <div className="animate-fade-in-up rounded-3xl bg-white/10 p-6 backdrop-blur ring-1 ring-white/20">
            <div className="flex items-center justify-between">
              <span className="font-display font-semibold">Horumarkaaga</span>
              <span className="text-2xl font-bold">{percent}%</span>
            </div>
            <div className="mt-3 h-3 w-full overflow-hidden rounded-full bg-white/20">
              <div className="h-full rounded-full bg-white transition-all duration-500" style={{ width: `${percent}%` }} />
            </div>
            <p className="mt-3 text-sm text-white/80">{completed} / {total} qaybood ayaad dhamaysay</p>
            <div className="mt-5 rounded-xl bg-white/10 p-4 text-sm">
              {passed ? (
                <span className="flex items-center gap-2 font-semibold">
                  <Award className="h-5 w-5" /> Waad u qalantaa shahaado!
                </span>
              ) : (
                <span className="text-white/85">Hel 70% si aad u heshid shahaadada dhamaystirka.</span>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Modules */}
      <section id="modules" className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="font-display text-3xl font-bold">Casharrada Koorsada</h2>
            <p className="mt-2 text-muted-foreground">Daawo casharro kasta, qabo layliga, kadibna calaamadi inaad dhamaysay.</p>
          </div>
        </div>

        <div className="space-y-3">
          {MODULES.map((m, idx) => {
            const isOpen = openId === m.id;
            const isDone = !!done[m.id];
            return (
              <article key={m.id} className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition hover:shadow-elegant">
                <button type="button" onClick={() => setOpenId(isOpen ? null : m.id)} className="flex w-full items-center gap-4 p-4 text-left sm:p-5">
                  <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-full font-bold ${isDone ? "bg-brand-gradient text-white" : "bg-secondary text-secondary-foreground"}`}>
                    {isDone ? <CheckCircle2 className="h-5 w-5" /> : idx + 1}
                  </span>
                  <div className="flex-1">
                    <h3 className="font-display text-base font-bold sm:text-lg">{m.title}</h3>
                    <p className="mt-1 line-clamp-1 text-sm text-muted-foreground">{m.description}</p>
                  </div>
                  <ChevronDown className={`h-5 w-5 shrink-0 text-muted-foreground transition ${isOpen ? "rotate-180" : ""}`} />
                </button>

                {isOpen && (
                  <div className="animate-fade-in-up border-t border-border bg-secondary/40 p-4 sm:p-6">
                    <p className="text-sm sm:text-base">{m.description}</p>

                    <div className="mt-5 grid aspect-video place-items-center overflow-hidden rounded-xl bg-hero-gradient text-white">
                      <div className="text-center">
                        <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-white/20 backdrop-blur">
                          <PlayCircle className="h-9 w-9" />
                        </div>
                        <p className="mt-3 text-sm text-white/85">Video-ga casharkan halkan ayaa la geli doonaa</p>
                        <span className="mt-2 inline-flex items-center gap-1 rounded-full bg-white/15 px-3 py-1 text-xs">
                          <Video className="h-3 w-3" /> Placeholder
                        </span>
                      </div>
                    </div>

                    <div className="mt-5 rounded-xl border border-border bg-card p-4">
                      <h4 className="font-display font-semibold text-primary">Layli</h4>
                      <p className="mt-1 text-sm">{m.exercise}</p>
                    </div>

                    <Button onClick={() => toggle(m.id)} variant={isDone ? "secondary" : "default"} className="mt-5">
                      {isDone ? (<><CheckCircle2 className="h-4 w-4" /> La Dhamaystiray</>) : (<><Circle className="h-4 w-4" /> Calaamadi In La Dhamaystiray</>)}
                    </Button>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </section>

      {/* Midterm */}
      <section className="bg-secondary/50 py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
            <div className="flex items-center gap-3">
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-brand-gradient text-white">
                <FileQuestion className="h-6 w-6" />
              </span>
              <div>
                <h2 className="font-display text-2xl font-bold">Imtixaanka Dhexe</h2>
                <p className="text-sm text-muted-foreground">Tijaabi waxa aad ilaa hadda baratay.</p>
              </div>
            </div>
            <ol className="mt-6 space-y-3">
              {MIDTERM.map((q, i) => (
                <li key={i} className="flex gap-3 rounded-xl border border-border bg-background p-4">
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-brand-gradient text-xs font-bold text-white">{i + 1}</span>
                  <p className="text-sm sm:text-base">{q}</p>
                </li>
              ))}
            </ol>
            <Button onClick={() => toggle("midterm")} variant={done["midterm"] ? "secondary" : "default"} className="mt-6">
              {done["midterm"] ? (<><CheckCircle2 className="h-4 w-4" /> Imtixaanka waa la dhamaystiray</>) : (<><Circle className="h-4 w-4" /> Calaamadi In La Dhamaystiray</>)}
            </Button>
          </div>
        </div>
      </section>

      {/* Final */}
      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
          <div className="flex items-center gap-3">
            <span className="grid h-12 w-12 place-items-center rounded-xl bg-brand-gradient text-white">
              <GraduationCap className="h-6 w-6" />
            </span>
            <div>
              <h2 className="font-display text-2xl font-bold">Imtixaanka Ugu Dambeeya</h2>
              <p className="text-sm text-muted-foreground">Mashruuc dhab ah.</p>
            </div>
          </div>
          <p className="mt-5 text-base">
            Samee video 1–2 daqiiqo ah oo leh <strong>transitions</strong>, <strong>effects</strong>, <strong>qoraal</strong>, <strong>music</strong> iyo ku export gareey <strong>1080p</strong>.
          </p>
          <Button onClick={() => toggle("final")} variant={done["final"] ? "secondary" : "default"} className="mt-6">
            {done["final"] ? (<><CheckCircle2 className="h-4 w-4" /> Mashruucii waa la gudbiyay</>) : (<><Circle className="h-4 w-4" /> Calaamadi In La Dhamaystiray</>)}
          </Button>
        </div>
      </section>

      {/* Certificate */}
      <section className="bg-hero-gradient py-16 text-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className={`rounded-3xl border-2 border-dashed p-8 text-center backdrop-blur sm:p-12 ${passed ? "border-white bg-white/10" : "border-white/30 bg-white/5"}`}>
            <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-white/20">
              {passed ? <Award className="h-10 w-10" /> : <Lock className="h-10 w-10" />}
            </div>
            <h2 className="mt-5 font-display text-3xl font-bold">Shahaadada Dhamaystirka</h2>
            <p className="mt-3 text-white/85">Ardayga hela <strong>70% ama ka badan</strong> wuxuu mutaystaa shahaado dhamaystir.</p>
            <div className="mt-6">
              {passed ? (
                <Button size="lg" className="bg-white text-primary hover:bg-white/90"
                  onClick={() => window.open(`${SITE.whatsappLink}?text=${encodeURIComponent("Salaam, waxaan dhamaystiray Course Basic Video Editing — fadlan ii soo dir shahaadada.")}`, "_blank")}>
                  <Award className="h-5 w-5" /> Codso Shahaadada
                </Button>
              ) : (
                <p className="text-sm text-white/75">Hadda waxaad gaadhay {percent}%. Sii wad casharrada si aad u furtid shahaadada.</p>
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

function PaymentRequired() {
  return (
    <Layout>
      <section className="mx-auto max-w-2xl px-4 py-20 sm:px-6">
        <div className="rounded-2xl border border-border bg-card p-8 text-center shadow-elegant animate-fade-in sm:p-12">
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-brand-gradient text-white shadow-glow">
            <Lock className="h-8 w-8" />
          </div>
          <h1 className="mt-4 font-display text-2xl font-bold sm:text-3xl">Koorsada way xirantahay</h1>
          <p className="mt-3 text-muted-foreground">
            Please complete the course payment to access all lessons.
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            Fadlan dhammee bixinta lacagta si aad u furtid casharrada oo dhan, layliyada, imtixaannada iyo shahaadada.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link
              to="/enroll/capcut"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-gradient px-5 py-2.5 text-sm font-semibold text-brand-foreground shadow-elegant"
            >
              <CreditCard className="h-4 w-4" /> Tag Bogga Diiwaangelinta
            </Link>
            <a
              href={`${SITE.whatsappLink}?text=${encodeURIComponent("Asc Eng_omar, I want to enroll in the Course Basic Video Editing and I am ready to pay.")}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-5 py-2.5 text-sm font-semibold text-emerald-700 hover:bg-emerald-500 hover:text-white dark:text-emerald-300"
            >
              <MessageCircle className="h-4 w-4" /> WhatsApp
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
}

function Stat({ n, label }: { n: string; label: string }) {
  return (
    <div className="rounded-xl bg-white/10 p-3 backdrop-blur">
      <div className="font-display text-2xl font-bold">{n}</div>
      <div className="text-xs text-white/80">{label}</div>
    </div>
  );
}
