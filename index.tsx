import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, MessageCircle, Sparkles, Code2, Video, BrainCircuit, BookOpen } from "lucide-react";
import { Layout } from "@/components/Layout";
import { CATEGORIES, SITE } from "@/lib/site";
import heroImg from "@/assets/hero.jpg";
import codingImg from "@/assets/cat-coding.jpg";
import videoImg from "@/assets/cat-video.jpg";
import aiImg from "@/assets/cat-ai.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Eng_omar — Barashada Code, Video Editing iyo AI" },
      { name: "description", content: "Ku soo dhowoow Eng_omar — koorasooyin Code, Video Editing iyo AI ah oo af Soomaali ku qoran." },
    ],
  }),
  component: Index,
});

const categoryCards = [
  { ...CATEGORIES.coding, img: codingImg, Icon: Code2 },
  { ...CATEGORIES.video_editing, img: videoImg, Icon: Video },
  { ...CATEGORIES.ai, img: aiImg, Icon: BrainCircuit },
];

function Index() {
  return (
    <Layout>
      {/* HERO */}
      <section className="relative overflow-hidden bg-hero-gradient text-white">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute -left-32 top-10 h-72 w-72 rounded-full bg-brand blur-3xl animate-float" />
          <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
        </div>
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-24">
          <div className="relative z-10 animate-fade-in-up">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-medium backdrop-blur">
              <Sparkles className="h-3.5 w-3.5" /> Waxbarasho Casri ah
            </span>
            <h1 className="mt-5 font-display text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
              Ku soo dhowoow website-kayga{" "}
              <span className="block bg-gradient-to-r from-white via-sky-200 to-sky-400 bg-clip-text text-transparent">
                Eng_omar.
              </span>
            </h1>
            <p className="mt-5 max-w-xl text-base text-white/85 sm:text-lg">
              Halkan waxaad ka helaysaa muxaadarooyin iyo barnaamijyo waxbarasho oo
              ku saabsan <strong>Code</strong>, <strong>Video Editing</strong>, iyo{" "}
              <strong>Artificial Intelligence (AI)</strong> — dhammaantood af Soomaali.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/courses"
                className="group inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-primary shadow-elegant transition hover:scale-105"
              >
                <BookOpen className="h-5 w-5" /> Daawo Koorasooyinka
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </Link>
              <Link
                to="/register"
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-6 py-3 font-semibold backdrop-blur transition hover:bg-white/20"
              >
                Hadda Is Diiwaangeli
              </Link>
              <a
                href={SITE.whatsappLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-[var(--whatsapp)] px-6 py-3 font-semibold text-white shadow-elegant transition hover:scale-105 animate-pulse-glow"
              >
                <MessageCircle className="h-5 w-5" /> WhatsApp
              </a>
            </div>
          </div>

          <div className="relative animate-fade-in">
            <div className="absolute -inset-4 rounded-3xl bg-brand/30 blur-3xl" />
            <img
              src={heroImg}
              alt="Eng_omar — Waxbarasho Code, Video, AI"
              width={1536}
              height={1024}
              className="relative rounded-3xl shadow-elegant ring-1 ring-white/20"
            />
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold sm:text-4xl">
            Qaybaha <span className="text-brand-gradient">Waxbarashada</span>
          </h2>
          <p className="mt-3 text-muted-foreground">
            Dooro qaybta aad jeceshahay si aad u bilowdo safarka cilmiga teknooloji.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {categoryCards.map(({ label, desc, href, img, Icon }) => (
            <Link
              key={href}
              to={href}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card hover-lift"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={img}
                  alt={label}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" />
                <div className="absolute left-4 top-4 grid h-12 w-12 place-items-center rounded-xl bg-brand-gradient text-white shadow-glow">
                  <Icon className="h-6 w-6" />
                </div>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-display text-xl font-bold">{label}</h3>
                <p className="mt-2 flex-1 text-sm text-muted-foreground">{desc}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-accent">
                  Daawo dheeraad <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-3xl bg-brand-gradient p-10 text-center text-white shadow-elegant sm:p-16">
          <h2 className="font-display text-3xl font-bold sm:text-4xl">
            Diyaar u tahay inaad bilowdo?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-white/90">
            Ku biir bulshada Eng_omar oo hel xirfado cusub maalin walba.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/register" className="rounded-xl bg-white px-6 py-3 font-semibold text-primary shadow-elegant transition hover:scale-105">
              Hadda Is Diiwaangeli
            </Link>
            <a
              href={SITE.whatsappLink}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-6 py-3 font-semibold backdrop-blur transition hover:bg-white/20"
            >
              <MessageCircle className="h-5 w-5" /> Nala xiriir WhatsApp
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
}
