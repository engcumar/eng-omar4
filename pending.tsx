import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { Layout } from "@/components/Layout";
import { useAuth } from "@/lib/auth";
import { Clock, RefreshCw, LogOut, XCircle } from "lucide-react";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/pending")({
  head: () => ({
    meta: [
      { title: "Akoonkaaga waa la eegayaa — Eng_omar" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: PendingPage,
});

function PendingPage() {
  const { user, profile, isApproved, loading, refreshProfile, signOut } = useAuth();
  const nav = useNavigate();

  useEffect(() => {
    if (!loading && !user) nav({ to: "/register" });
    if (isApproved) nav({ to: "/dashboard" });
  }, [user, loading, isApproved, nav]);

  const rejected = profile?.approval_status === "rejected";

  return (
    <Layout>
      <section className="mx-auto flex max-w-2xl flex-col items-center px-4 py-20 text-center sm:px-6">
        <div className={`grid h-20 w-20 place-items-center rounded-2xl ${rejected ? "bg-destructive/10 text-destructive" : "bg-brand-gradient text-white shadow-glow"}`}>
          {rejected ? <XCircle className="h-10 w-10" /> : <Clock className="h-10 w-10" />}
        </div>
        <h1 className="mt-5 font-display text-3xl font-bold sm:text-4xl">
          {rejected ? "Akoonkaaga waa la diiday" : "Akoonkaaga waa la eegayaa"}
        </h1>
        <p className="mt-4 max-w-xl text-muted-foreground">
          {rejected
            ? "Maamulaha wuxuu diiday gelitaankaaga. Haddii aad u maleynayso khalad, fadlan nala soo xiriir."
            : "Your account is pending approval from the administrator. You will gain access after your account is reviewed and approved."}
        </p>
        <p className="mt-3 text-sm text-muted-foreground">
          {profile?.email && <>Email: <span className="font-medium text-foreground">{profile.email}</span></>}
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          {!rejected && (
            <button
              onClick={refreshProfile}
              className="inline-flex items-center gap-2 rounded-lg bg-brand-gradient px-5 py-2.5 text-sm font-semibold text-brand-foreground shadow-elegant"
            >
              <RefreshCw className="h-4 w-4" /> Cusbooneysii xaaladda
            </button>
          )}
          <a
            href={SITE.whatsappLink}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-border px-5 py-2.5 text-sm font-medium hover:bg-secondary"
          >
            Nala soo xiriir
          </a>
          <button
            onClick={signOut}
            className="inline-flex items-center gap-2 rounded-lg border border-border px-5 py-2.5 text-sm font-medium hover:bg-secondary"
          >
            <LogOut className="h-4 w-4" /> Ka bax
          </button>
        </div>

        <Link to="/" className="mt-10 text-sm text-accent underline">
          Ku noqo bogga hore
        </Link>
      </section>
    </Layout>
  );
}
