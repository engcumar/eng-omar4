import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Layout } from "@/components/Layout";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, User as UserIcon, BookOpen, Award, PlayCircle, Mail, Clock } from "lucide-react";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard-ka Ardayga — Eng_omar" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: DashboardPage,
});

type Progress = { completed: string[]; midtermPassed?: boolean; finalPassed?: boolean };

function readCapcutProgress(): Progress {
  try {
    if (typeof window === "undefined") return { completed: [] };
    const raw = localStorage.getItem("capcut-course-progress-v1");
    if (!raw) return { completed: [] };
    return JSON.parse(raw) as Progress;
  } catch {
    return { completed: [] };
  }
}

function DashboardPage() {
  const { user, profile, isApproved, isAdmin, loading } = useAuth();
  const nav = useNavigate();

  useEffect(() => {
    if (!loading && !user) nav({ to: "/register" });
  }, [user, loading, nav]);

  const { data: courses } = useQuery({
    queryKey: ["dashboard", "courses"],
    queryFn: async () => {
      const { data } = await supabase
        .from("courses")
        .select("id, title, category, image_url")
        .eq("published", true)
        .order("created_at", { ascending: false });
      return data ?? [];
    },
    enabled: !!user,
  });

  const capcut = useMemo(readCapcutProgress, [user?.id]);
  const totalModules = 10;
  const capcutPct = Math.round((capcut.completed.length / totalModules) * 100);
  const certificateEarned = capcut.midtermPassed && capcut.finalPassed && capcutPct >= 70;

  if (loading || !user) {
    return <Layout><div className="grid min-h-[60vh] place-items-center"><Loader2 className="h-8 w-8 animate-spin text-brand" /></div></Layout>;
  }

  return (
    <Layout>
      <section className="bg-hero-gradient py-12 text-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-4">
            <div className="grid h-16 w-16 place-items-center rounded-2xl bg-white/15 backdrop-blur">
              <UserIcon className="h-8 w-8" />
            </div>
            <div>
              <p className="text-sm text-white/80">Ku soo dhowoow</p>
              <h1 className="font-display text-2xl font-bold sm:text-3xl">
                {profile?.full_name || user.email}
              </h1>
              <p className="mt-1 text-sm text-white/85"><Mail className="mr-1 inline h-4 w-4" />{profile?.email || user.email}</p>
            </div>
            <div className="ms-auto">
              <StatusBadge status={isAdmin ? "approved" : profile?.approval_status ?? "pending"} />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        {!isApproved && (
          <div className="mb-8 rounded-xl border border-amber-500/30 bg-amber-500/10 p-5">
            <div className="flex items-start gap-3">
              <Clock className="mt-0.5 h-5 w-5 text-amber-600" />
              <div className="flex-1">
                <h3 className="font-semibold">Akoonkaaga weli lama oggolaan</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Marka maamulaha uu oggolaado, waxaad heli doontaa gelitaan buuxa oo koorasooyinka ah.
                </p>
              </div>
              <Link to="/pending" className="rounded-lg bg-brand-gradient px-4 py-2 text-sm font-semibold text-brand-foreground">
                Bogga sugitaanka
              </Link>
            </div>
          </div>
        )}

        <div className="grid gap-4 sm:grid-cols-3">
          <StatCard icon={<BookOpen className="h-5 w-5" />} label="Koorasooyinka la heli karo" value={String(courses?.length ?? 0)} />
          <StatCard icon={<PlayCircle className="h-5 w-5" />} label="CapCut Course Progress" value={`${capcutPct}%`} />
          <StatCard icon={<Award className="h-5 w-5" />} label="Shahaadooyinka" value={certificateEarned ? "1" : "0"} />
        </div>

        <h2 className="mt-10 font-display text-xl font-bold">Koorasahaaga</h2>
        <p className="text-sm text-muted-foreground">Hor u soco koorasooyinkaaga ama bilow mid cusub.</p>

        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <CourseProgressCard
            title="Course Basic Video Editing — CapCut"
            subtitle="10 module · imtixaan & shahaado"
            pct={capcutPct}
            to="/capcut-course"
            locked={!isApproved}
            image="/og.jpg"
          />
          {(courses ?? []).slice(0, 5).map((c: any) => (
            <CourseProgressCard
              key={c.id}
              title={c.title}
              subtitle={c.category}
              pct={0}
              to={c.category === "video_editing" ? "/video-editing" : c.category === "ai" ? "/ai" : "/coding"}
              locked={!isApproved}
              image={c.image_url}
            />
          ))}
        </div>

        <h2 className="mt-12 font-display text-xl font-bold">Shahaadooyinka</h2>
        <div className="mt-4 rounded-xl border border-border bg-card p-6">
          {certificateEarned ? (
            <div className="flex flex-wrap items-center gap-4">
              <Award className="h-10 w-10 text-amber-500" />
              <div className="flex-1">
                <p className="font-semibold">Shahaado: CapCut Basic Video Editing</p>
                <p className="text-sm text-muted-foreground">Waad gudubtay imtixaannada. Hambalyo!</p>
              </div>
              <Link to="/capcut-course" className="rounded-lg bg-brand-gradient px-4 py-2 text-sm font-semibold text-brand-foreground">
                Eeg shahaadada
              </Link>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              Wali ma helin shahaado. Dhammee koorasada oo gud imtixaannada si aad u hesho shahaadada.
            </p>
          )}
        </div>
      </section>
    </Layout>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    approved: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/30",
    pending: "bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-500/30",
    rejected: "bg-destructive/15 text-destructive border-destructive/30",
  };
  const labels: Record<string, string> = { approved: "La oggolaaday", pending: "Sugaya oggolaansho", rejected: "La diiday" };
  return (
    <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${styles[status] ?? styles.pending}`}>
      {labels[status] ?? labels.pending}
    </span>
  );
}

function StatCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="flex items-center gap-3">
        <div className="grid h-10 w-10 place-items-center rounded-lg bg-brand-gradient text-white">{icon}</div>
        <div>
          <p className="text-xs text-muted-foreground">{label}</p>
          <p className="text-xl font-bold">{value}</p>
        </div>
      </div>
    </div>
  );
}

function CourseProgressCard({
  title, subtitle, pct, to, locked, image,
}: { title: string; subtitle: string; pct: number; to: string; locked: boolean; image?: string | null }) {
  return (
    <Link
      to={locked ? "/pending" : to}
      className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition hover:-translate-y-0.5 hover:shadow-elegant"
    >
      <div className="relative h-32 bg-muted">
        {image && <img src={image} alt={title} className="h-full w-full object-cover" />}
        {locked && (
          <div className="absolute inset-0 grid place-items-center bg-black/50 text-xs font-semibold text-white">
            Sug oggolaansho
          </div>
        )}
      </div>
      <div className="flex-1 p-4">
        <p className="line-clamp-2 font-semibold">{title}</p>
        <p className="mt-1 text-xs text-muted-foreground">{subtitle}</p>
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-muted">
          <div className="h-full bg-brand-gradient transition-all" style={{ width: `${pct}%` }} />
        </div>
        <p className="mt-1 text-xs text-muted-foreground">{pct}% dhammaystiran</p>
      </div>
    </Link>
  );
}
