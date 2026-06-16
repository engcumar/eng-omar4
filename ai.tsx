import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { CourseCard, useCourses } from "./courses";
import { CATEGORIES } from "@/lib/site";
import { ArrowRight, Brain, Eye, MessageSquare, Settings, Sparkles, Bot, Cpu, Globe, Zap } from "lucide-react";
import aiHeroImg from "@/assets/ai-hero.jpg";
import aiPeopleImg from "@/assets/ai-people.jpg";
import aiRobotImg from "@/assets/ai-robot.jpg";
import aiTypesImg from "@/assets/ai-types.jpg";

export const Route = createFileRoute("/ai")({
  head: () => ({
    meta: [
      { title: "AI — Sirdoonka Macmalka ah — Eng_omar" },
      { name: "description", content: "Baro Artificial Intelligence-ka, sida uu u shaqeeyo, noocyadiisa iyo sida loogu isticmaalo dunida casriga ah." },
    ],
  }),
  component: AIPage,
});

const aiTypes = [
  {
    icon: MessageSquare,
    title: "NLP — Natural Language Processing",
    desc: "Waa nooca AI-ga oo fahma luqadda dadka, sida ChatGPT. Waxuu qori karaa, u tarjumi karaa, ugu jawaabi karaa su'aalaha si caqli leh.",
  },
  {
    icon: Eye,
    title: "Computer Vision",
    desc: "Waa awoodda AI-ga ee ay ku arkaan sawiryo iyo video. Waxaa loo isticmaalaa ganacsiga, caafimaadka, iyo amniga si ay u garto wejiyada iyo alaabada.",
  },
  {
    icon: Settings,
    title: "Machine Learning",
    desc: "Waa habka ay ku barataan kombiyutarayaasha si ay u sameeyaan go'aanoyin iyaga oo eegaya xog badan. Waxaa ka helaa cabbiryo, saami-qiyaas iyo talo-bixin.",
  },
  {
    icon: Bot,
    title: "Robotics & Automation",
    desc: "Waa isbitaallo iyo makinadaha la hoggaamiyo AI ah. Waxaa loo isticmaalaa warshadaha, xarumaha daaweynta, iyo meelaha khatarta ku jirto.",
  },
  {
    icon: Globe,
    title: "Generative AI",
    desc: "Waa nooca AI-ga ee sameeya wax cusub — sawirro, muusig, video, iyo qoraal. Tusaale waa Midjourney, DALL-E, iyo qalabka kale ee abuurista.",
  },
  {
    icon: Zap,
    title: "Deep Learning",
    desc: "Waa qayb ka mid ah Machine Learning-ka oo isticmaala neural networks oo qoto dheer. Waxaa ku shaqeeyaa qalabka ugu casriga sida self-driving cars.",
  },
];

function AIPage() {
  const { data: courses, isLoading } = useCourses("ai");

  return (
    <Layout>
      {/* HERO */}
      <section className="relative overflow-hidden bg-hero-gradient py-16 text-white lg:py-24">
        <div className="absolute inset-0 opacity-25">
          <div className="absolute -left-32 top-10 h-72 w-72 rounded-full bg-brand blur-3xl animate-float" />
          <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
        </div>
        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div className="animate-fade-in-up">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-medium backdrop-blur">
              <Sparkles className="h-3.5 w-3.5" /> Teknoolojiga Casriga ah
            </span>
            <h1 className="mt-5 font-display text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
              AI –{" "}
              <span className="block bg-gradient-to-r from-white via-sky-200 to-sky-400 bg-clip-text text-transparent">
                Sirdoonka Macmalka ah ee Beddelaya Dunida Casriga ah
              </span>
            </h1>
            <p className="mt-5 max-w-xl text-base text-white/85 sm:text-lg">
              Artificial Intelligence (AI) waa xoogga beddelaya shaqooyinka, waxbarashada, iyo nolosha maalinlaha ah. Halkan waxaad ka baran doontaa aasaaska, noocyada, iyo sida aad ugu isticmaali karto.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/courses"
                className="group inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-primary shadow-elegant transition hover:scale-105"
              >
                <Brain className="h-5 w-5" /> Daawo Koorasooyinka AI
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </Link>
              <a
                href="https://wa.me/252656861821"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-6 py-3 font-semibold backdrop-blur transition hover:bg-white/20"
              >
                Weydii Su'aal WhatsApp
              </a>
            </div>
          </div>
          <div className="relative animate-fade-in">
            <div className="absolute -inset-4 rounded-3xl bg-brand/30 blur-3xl" />
            <img
              src={aiHeroImg}
              alt="Digital brain representing Artificial Intelligence"
              width={1344}
              height={896}
              className="relative rounded-3xl shadow-elegant ring-1 ring-white/20"
            />
          </div>
        </div>
      </section>

      {/* WAA MAXAY AI */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-accent">
            <Cpu className="h-3.5 w-3.5" /> Aasaaska
          </span>
          <h2 className="mt-4 font-display text-3xl font-bold sm:text-4xl">
            Waa Maxay AI (Artificial Intelligence)?
          </h2>
        </div>

        <div className="mt-12 grid items-center gap-10 lg:grid-cols-2">
          <div className="animate-fade-in-up space-y-5 text-muted-foreground">
            <p className="text-lg leading-relaxed text-foreground">
              <strong>Artificial Intelligence (AI)</strong> ama <strong>Sirdoonka Macmalka ah</strong> waa cilmiga kombiyutararka ee loo sameeyay inay u dhaqmaan sida dadka caqli leh — ay fahmaan, ay baran, ay go'aan ka gaaraan, oo ay u sameeyaan shaqooyin badan oo caqli u baahan.
            </p>
            <p>
              Tusaale ahaan, AI waxaa loo isticmaalaa inuu qoro qoraallo, uu sameeyo sawirro, uu u jawaabo su'aalahaada, uu kugu taliyo alaabada aad jeceshahay, iyo xitaa inuu xirfado caafimaad la sameeyo.
            </p>
            <p>
              AI-ga ugu caansan ee hadda jira waa <strong>ChatGPT</strong>, oo ah qalabka uu sameeyay shirkadda OpenAI. Waxaad kula hadli kartaa af Soomaali, waxaad ka weydiin kartaa wax kasta oo aad rabto, wuuna kuu jawaabi doonaa si degdeg ah oo fahmi karo.
            </p>
            <p>
              Soo koobid ahaan, AI waa xoog weyn oo beddelaya adduunka. Haddii aad barato sida loo isticmaalo, waxaad heli doontaa fursado shaqo iyo xirfado cusub oo qiimo weyn leh.
            </p>
          </div>
          <div className="relative animate-fade-in">
            <div className="absolute -inset-4 rounded-3xl bg-brand/20 blur-2xl" />
            <img
              src={aiPeopleImg}
              alt="Dad ku isticmaalaya teknoolojiyada AI"
              width={1344}
              height={896}
              loading="lazy"
              className="relative rounded-3xl shadow-elegant ring-1 ring-border"
            />
          </div>
        </div>
      </section>

      {/* NOOCYADA AI */}
      <section className="bg-muted/40 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-accent">
              <Bot className="h-3.5 w-3.5" /> Qaybaha
            </span>
            <h2 className="mt-4 font-display text-3xl font-bold sm:text-4xl">
              Noocyada AI ee Ugu Caansan
            </h2>
            <p className="mt-3 text-muted-foreground">
              AI-ga wuxuu leeyahay noocyo kala duwan oo mid kasta u adeega ujeeddo gaar ah. Halkan waxaa ku qoran kuwa ugu muhiimsan.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {aiTypes.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="group flex flex-col rounded-2xl border border-border bg-card p-6 hover-lift animate-fade-in-up"
              >
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-brand-gradient text-white shadow-glow">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 font-display text-lg font-bold">{title}</h3>
                <p className="mt-2 flex-1 text-sm text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-14 grid items-center gap-10 lg:grid-cols-2">
            <div className="relative order-2 animate-fade-in lg:order-1">
              <div className="absolute -inset-4 rounded-3xl bg-brand/20 blur-2xl" />
              <img
                src={aiRobotImg}
                alt="Robotic innovation and advanced AI technology"
                width={1024}
                height={1024}
                loading="lazy"
                className="relative rounded-3xl shadow-elegant ring-1 ring-border"
              />
            </div>
            <div className="order-1 space-y-5 text-muted-foreground lg:order-2 animate-fade-in-up">
              <h3 className="font-display text-2xl font-bold text-foreground">
                Soo Koobid: Soo dhawoow Mustaqbalka!
              </h3>
              <p>
                Noocyada AI-ga oo dhammu waxay ka shaqeeyaan hab kasta oo kombiyutar uu u baran karo xog, uu u fahmi karo jawi, oo uu u sameeyo go'aanoyin caqli leh.
              </p>
              <p>
                AI-du waxay u adeegaysaa qaar ka mid ah shirkadaha ugu waaweyn adduunka sida Google, Microsoft, Amazon, iyo Tesla. Sidoo kale, startup-yada Soomaaliyeed iyo qaaradda Afrika waxay bilaabayaan inay isticmaalaan AI si ay u dhiirrigeliyaan wax-soo-saarka.
              </p>
              <p>
                Haddii aad jeclaan lahayd inaad barato sida AI-ga loo isticmaalo — sida ChatGPT, Midjourney, iyo qalabka kale — ku biir koorasoyinka Eng_omar. Waxaan ku barinaa af Soomaali si fudud oo la fahmi karo.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* COURSES */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-3xl font-bold sm:text-4xl">
            Koorasooyinka {CATEGORIES.ai.short}
          </h2>
          <p className="mt-3 text-muted-foreground">
            Soo dooro kooras oo bilow barashadaada AI-ga hadda.
          </p>
        </div>
        <div className="mt-10">
          {isLoading ? (
            <p className="text-center text-muted-foreground">Soo gelinaya...</p>
          ) : !courses || courses.length === 0 ? (
            <div className="mx-auto max-w-xl rounded-2xl border border-border bg-card p-8 text-center">
              <Bot className="mx-auto h-12 w-12 text-muted-foreground" />
              <p className="mt-4 text-muted-foreground">
                Wali ma jiraan koorasooyin la gelinay qaybtan. Fadlan dib u soo noqo soon!
              </p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {courses.map((c) => (
                <CourseCard key={c.id} c={c} />
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
