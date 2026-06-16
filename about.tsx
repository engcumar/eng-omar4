import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { SocialIcons } from "@/components/SocialIcons";
import { GraduationCap, Target, Heart } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Naga — Eng_omar" },
      { name: "description", content: "Wax ka ogow Eng_omar — bartilmaameedkayaga iyo aragtidayada." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <Layout>
      <section className="bg-hero-gradient py-20 text-white">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8 animate-fade-in-up">
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-white/15 backdrop-blur">
            <GraduationCap className="h-8 w-8" />
          </div>
          <h1 className="mt-6 font-display text-4xl font-bold sm:text-5xl">Wax Naga Ogow</h1>
          <p className="mx-auto mt-4 max-w-2xl text-white/85">
            Eng_omar waa website waxbarasho oo loogu talagalay dadyowga Soomaalida ah, kuwaas oo
            doonaya inay bartaan xirfadaha casriga ah ee Code, Video Editing, iyo AI — si fudud, af
            Soomaali, oo bilaash ah.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-8 px-4 py-20 sm:px-6 md:grid-cols-2 lg:px-8">
        <div className="rounded-2xl border border-border bg-card p-8 hover-lift">
          <Target className="h-10 w-10 text-brand" />
          <h2 className="mt-4 font-display text-2xl font-bold">Bartilmaameedkayaga</h2>
          <p className="mt-2 text-muted-foreground">
            Inaan u fasaxno dhalinyarada Soomaaliyeed cilmiga teknooloji oo aan ka caawino inay
            xirfado caalami ah u helaan luqaddooda hooyo.
          </p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-8 hover-lift">
          <Heart className="h-10 w-10 text-brand" />
          <h2 className="mt-4 font-display text-2xl font-bold">Qiyamkayaga</h2>
          <p className="mt-2 text-muted-foreground">
            Daacadnimo, tayo, iyo sahlanaanta waxbarashada. Mid kasta wuu bilaabi karaa, halkii uu
            ka jiro.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 pb-20 text-center sm:px-6 lg:px-8">
        <h2 className="font-display text-2xl font-bold">Nala xiriir</h2>
        <p className="mt-2 text-muted-foreground">
          Raac warbaahinta bulshada si aad u hesho casharo cusub maalin walba.
        </p>
        <div className="mt-6 flex justify-center">
          <SocialIcons size="lg" />
        </div>
        <Link
          to="/register"
          className="mt-8 inline-flex rounded-xl bg-brand-gradient px-6 py-3 font-semibold text-brand-foreground shadow-elegant transition hover:scale-105"
        >
          Hadda Is Diiwaangeli
        </Link>
      </section>
    </Layout>
  );
}
