import { createFileRoute, Navigate, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/integrations/supabase/client";
import { SITE } from "@/lib/site";
import { toast } from "sonner";
import {
  Loader2,
  CreditCard,
  MessageCircle,
  CheckCircle2,
  Clock,
  Lock,
  Award,
  PlayCircle,
  GraduationCap,
} from "lucide-react";

export const COURSE_SLUG = "capcut-basic-video-editing";
export const COURSE_TITLE = "Course Basic Video Editing";
export const COURSE_PRICE_USD = 25; // adjust as needed

export const Route = createFileRoute("/enroll/capcut")({
  head: () => ({
    meta: [
      { title: `Iska Diiwaan Geli — ${COURSE_TITLE}` },
      {
        name: "description",
        content:
          "Iska diiwaan geli Course Basic Video Editing. Bixi lacagta ama nagala soo xiriir WhatsApp.",
      },
    ],
  }),
  component: EnrollCapcutPage,
});

type Enrollment = {
  id: string;
  payment_status: "unpaid" | "paid";
  access_granted: boolean;
  created_at: string;
};

function EnrollCapcutPage() {
  const { user, loading } = useAuth();
  const nav = useNavigate();
  const [enrollment, setEnrollment] = useState<Enrollment | null>(null);
  const [busy, setBusy] = useState(false);
  const [loadingEnroll, setLoadingEnroll] = useState(true);

  useEffect(() => {
    if (!user) return;
    let active = true;
    (async () => {
      const { data } = await supabase
        .from("course_enrollments")
        .select("id, payment_status, access_granted, created_at")
        .eq("user_id", user.id)
        .eq("course_slug", COURSE_SLUG)
        .maybeSingle();
      if (active) {
        setEnrollment((data as Enrollment) ?? null);
        setLoadingEnroll(false);
      }
    })();
    return () => {
      active = false;
    };
  }, [user]);

  if (loading) {
    return (
      <Layout>
        <div className="grid min-h-[60vh] place-items-center">
          <Loader2 className="h-8 w-8 animate-spin text-brand" />
        </div>
      </Layout>
    );
  }
  if (!user) return <Navigate to="/register" search={{ mode: "login" } as never} />;

  const hasAccess = enrollment?.payment_status === "paid" && enrollment?.access_granted;

  async function requestEnrollment() {
    if (!user) return;
    setBusy(true);
    const { data, error } = await supabase
      .from("course_enrollments")
      .insert({ user_id: user.id, course_slug: COURSE_SLUG })
      .select("id, payment_status, access_granted, created_at")
      .single();
    setBusy(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    setEnrollment(data as Enrollment);
    toast.success("Codsigaaga waa la diiwaangeliyay.");
  }

  function openWhatsApp() {
    const msg = encodeURIComponent(
      "Asc Eng_omar, I want to enroll in the Course Basic Video Editing and I am ready to pay.",
    );
    window.open(`${SITE.whatsappLink}?text=${msg}`, "_blank");
  }

  return (
    <Layout>
      {/* Hero */}
      <section className="relative overflow-hidden bg-hero-gradient py-16 text-white">
        <div className="absolute inset-0 opacity-20 [background:radial-gradient(circle_at_20%_20%,white,transparent_40%)]" />
        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 animate-fade-in-up">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider backdrop-blur">
            <GraduationCap className="h-3.5 w-3.5" /> Diiwaangelin Koorsada
          </span>
          <h1 className="mt-4 font-display text-4xl font-bold leading-tight sm:text-5xl">
            {COURSE_TITLE}
          </h1>
          <p className="mt-3 max-w-2xl text-white/85 sm:text-lg">
            Koorso CapCut ah oo dhamaystiran — 10 module, layliyo, imtixaano iyo shahaado.
            Si aad u furtid casharrada, fadlan dhammee bixinta lacagta.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
          {/* What you get */}
          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
            <h2 className="font-display text-2xl font-bold">Waxa aad heli doonto</h2>
            <ul className="mt-5 space-y-3 text-sm sm:text-base">
              {[
                "Gelitaan buuxa 10 module oo CapCut ah",
                "Casharro muuqaal ah iyo layliyo qaybsan",
                "Imtixaan dhexe iyo imtixaan ugu dambeeya",
                "Shahaado dhamaystir markaad gudubto",
                "Taageero WhatsApp ah oo dhakhso ah",
              ].map((b) => (
                <li key={b} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 grid grid-cols-3 gap-3 text-center">
              <Stat icon={<PlayCircle className="h-5 w-5" />} label="Casharro" value="10" />
              <Stat icon={<GraduationCap className="h-5 w-5" />} label="Imtixaan" value="2" />
              <Stat icon={<Award className="h-5 w-5" />} label="Shahaado" value="1" />
            </div>
          </div>

          {/* Price / Actions */}
          <div className="rounded-2xl border border-border bg-card p-6 shadow-elegant sm:p-8">
            <span className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground">
              Qiimaha Koorsada
            </span>
            <p className="mt-3 font-display text-5xl font-bold text-primary">
              ${COURSE_PRICE_USD}
              <span className="ml-1 text-base font-normal text-muted-foreground">USD</span>
            </p>
            <p className="mt-1 text-xs text-muted-foreground">Hal mar bixin · gelitaan nolosheed</p>

            {/* Status banner */}
            {loadingEnroll ? (
              <div className="mt-6 grid h-24 place-items-center rounded-xl bg-secondary/40">
                <Loader2 className="h-5 w-5 animate-spin text-brand" />
              </div>
            ) : hasAccess ? (
              <StatusBox
                tone="success"
                icon={<CheckCircle2 className="h-5 w-5" />}
                title="Gelitaan buuxa ayaad leedahay"
                desc="Lacagtaadii waa la xaqiijiyay. Bilow casharrada hadda."
              />
            ) : enrollment?.payment_status === "paid" ? (
              <StatusBox
                tone="warning"
                icon={<Clock className="h-5 w-5" />}
                title="Lacagta waa la helay"
                desc="Maamulaha ayaa furayaa gelitaanka koorsada wakhti yar gudahood."
              />
            ) : enrollment ? (
              <StatusBox
                tone="warning"
                icon={<Clock className="h-5 w-5" />}
                title="Lacag-bixintaada ayaa la sugayaa"
                desc="Marka aad lacagta soo dirto, maamulaha ayaa xaqiijin doona oo furi doona koorsada."
              />
            ) : (
              <StatusBox
                tone="info"
                icon={<Lock className="h-5 w-5" />}
                title="Wali ma diiwaangelin koorsadan"
                desc="Riix Pay Now ama nagala soo xiriir WhatsApp si aad u bilowdo."
              />
            )}

            <div className="mt-6 flex flex-col gap-3">
              {hasAccess ? (
                <Button size="lg" className="w-full" onClick={() => nav({ to: "/capcut-course" })}>
                  <PlayCircle className="h-5 w-5" /> Bilow Koorsada
                </Button>
              ) : (
                <>
                  <Button
                    size="lg"
                    className="w-full"
                    disabled={busy}
                    onClick={async () => {
                      if (!enrollment) await requestEnrollment();
                      toast.info(
                        "Nidaamka lacag-bixinta online dhowaan. Hadda fadlan isticmaal WhatsApp.",
                      );
                      openWhatsApp();
                    }}
                  >
                    {busy ? <Loader2 className="h-5 w-5 animate-spin" /> : <CreditCard className="h-5 w-5" />}
                    Pay Now
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full border-emerald-500/40 bg-emerald-500/10 text-emerald-700 hover:bg-emerald-500 hover:text-white dark:text-emerald-300"
                    disabled={busy}
                    onClick={async () => {
                      if (!enrollment) await requestEnrollment();
                      openWhatsApp();
                    }}
                  >
                    <MessageCircle className="h-5 w-5" /> Contact on WhatsApp
                  </Button>
                </>
              )}
            </div>

            <p className="mt-4 text-center text-xs text-muted-foreground">
              Marka maamulaha xaqiijiyo lacagta, koorsada ayaa si toos ah laguu furi doonaa.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}

function Stat({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border bg-background p-3">
      <div className="mx-auto grid h-9 w-9 place-items-center rounded-lg bg-brand-gradient text-white">
        {icon}
      </div>
      <p className="mt-2 font-display text-lg font-bold">{value}</p>
      <p className="text-xs text-muted-foreground">{label}</p>
    </div>
  );
}

function StatusBox({
  tone,
  icon,
  title,
  desc,
}: {
  tone: "success" | "warning" | "info";
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  const styles = {
    success: "border-emerald-500/30 bg-emerald-500/10 text-emerald-800 dark:text-emerald-200",
    warning: "border-amber-500/30 bg-amber-500/10 text-amber-800 dark:text-amber-200",
    info: "border-border bg-secondary/40 text-foreground",
  }[tone];
  return (
    <div className={`mt-6 flex items-start gap-3 rounded-xl border p-4 ${styles}`}>
      <span className="mt-0.5">{icon}</span>
      <div>
        <p className="font-semibold">{title}</p>
        <p className="mt-0.5 text-sm opacity-90">{desc}</p>
      </div>
    </div>
  );
}
