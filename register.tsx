import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { Layout } from "@/components/Layout";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
import { useAuth } from "@/lib/auth";
import { Mail, Lock, User as UserIcon, MailCheck } from "lucide-react";

type Search = { mode?: "signup" | "login" };

export const Route = createFileRoute("/register")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    mode: s.mode === "login" ? "login" : "signup",
  }),
  head: () => ({
    meta: [
      { title: "Is Diiwaangeli — Eng_omar" },
      { name: "description", content: "Sameyso akoon ama gal Eng_omar." },
    ],
  }),
  component: RegisterPage,
});

const signupSchema = z.object({
  fullName: z.string().trim().min(2, "Magaca buuxa geli").max(100),
  email: z.string().trim().email("Email sax ah geli").max(255),
  password: z.string().min(6, "Furaha ha ka yaraan 6 xaraf").max(100),
});
const loginSchema = z.object({
  email: z.string().trim().email("Email sax ah geli"),
  password: z.string().min(6),
});

function RegisterPage() {
  const { user } = useAuth();
  const nav = useNavigate();
  const { mode: initialMode } = Route.useSearch();
  const [mode, setMode] = useState<"signup" | "login">(initialMode ?? "signup");
  const [form, setForm] = useState({ fullName: "", email: "", password: "" });
  const [busy, setBusy] = useState(false);
  const [verifyEmail, setVerifyEmail] = useState<string | null>(null);

  useEffect(() => {
    if (user) nav({ to: "/dashboard" });
  }, [user, nav]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    try {
      if (mode === "signup") {
        const p = signupSchema.safeParse(form);
        if (!p.success) return toast.error(p.error.issues[0].message);
        const { data, error } = await supabase.auth.signUp({
          email: p.data.email,
          password: p.data.password,
          options: {
            emailRedirectTo: `${window.location.origin}/dashboard`,
            data: { full_name: p.data.fullName },
          },
        });
        if (error) return toast.error(error.message);
        if (data.session) {
          toast.success("Akoon waa la sameeyay!");
        } else {
          setVerifyEmail(p.data.email);
        }
      } else {
        const p = loginSchema.safeParse(form);
        if (!p.success) return toast.error(p.error.issues[0].message);
        const { error } = await supabase.auth.signInWithPassword({
          email: p.data.email,
          password: p.data.password,
        });
        if (error) {
          const msg = error.message.toLowerCase();
          if (msg.includes("not confirmed") || msg.includes("email")) {
            return toast.error("Fadlan marka hore xaqiiji email-kaaga.");
          }
          return toast.error("Email ama furaha waa khalad.");
        }
        toast.success("Si guul leh ayaad u gashay!");
      }
    } finally {
      setBusy(false);
    }
  }

  if (verifyEmail) {
    return (
      <Layout>
        <section className="mx-auto max-w-xl px-4 py-20 sm:px-6">
          <div className="rounded-2xl border border-border bg-card p-8 text-center shadow-elegant animate-fade-in">
            <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-brand-gradient text-white shadow-glow">
              <MailCheck className="h-8 w-8" />
            </div>
            <h1 className="mt-4 font-display text-2xl font-bold">Xaqiiji Email-kaaga</h1>
            <p className="mt-3 text-muted-foreground">
              Waxaan u dirnay link xaqiijin email-kan:
            </p>
            <p className="mt-1 font-semibold text-accent">{verifyEmail}</p>
            <p className="mt-4 text-sm text-muted-foreground">
              Fur Gmail-kaaga, riix link-ga xaqiijinta, ka dibna ku noqo halkan si aad u soo gasho.
              Hubi inbox-ka iyo galka spam-ka.
            </p>
            <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-center">
              <button
                onClick={() => { setVerifyEmail(null); setMode("login"); }}
                className="rounded-lg bg-brand-gradient px-5 py-2.5 text-sm font-semibold text-brand-foreground"
              >
                Soo Gal
              </button>
              <a
                href="https://mail.google.com"
                target="_blank"
                rel="noreferrer"
                className="rounded-lg border border-border px-5 py-2.5 text-sm font-medium hover:bg-secondary"
              >
                Fur Gmail
              </a>
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="relative overflow-hidden bg-hero-gradient py-16 text-white">
        <div className="mx-auto max-w-2xl px-4 text-center sm:px-6 lg:px-8 animate-fade-in-up">
          <h1 className="font-display text-4xl font-bold sm:text-5xl">
            {mode === "signup" ? "Is Diiwaangeli" : "Soo Gal"}
          </h1>
          <p className="mt-3 text-white/85">
            {mode === "signup"
              ? "Sameyso akoon. Marka aad email-ka xaqiijiso, maamulaha ayaa eegi doona akoonkaaga."
              : "Ku soo gal akoonkaaga si aad u sii waddo waxbarashada."}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-md px-4 py-16 sm:px-6">
        <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-elegant animate-fade-in">
          <button
            type="button"
            disabled={busy}
            onClick={async () => {
              setBusy(true);
              try {
                const result = await lovable.auth.signInWithOAuth("google", {
                  redirect_uri: `${window.location.origin}/dashboard`,
                });
                if (result.error) toast.error("Gelitaanka Google wuu fashilmay.");
              } finally {
                setBusy(false);
              }
            }}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-background px-4 py-2.5 text-sm font-semibold hover:bg-secondary disabled:opacity-60"
          >
            <GoogleLogo /> {mode === "signup" ? "Is diiwaangeli Google" : "Ku gal Google"}
          </button>

          <div className="my-5 flex items-center gap-3 text-xs uppercase text-muted-foreground">
            <span className="h-px flex-1 bg-border" /> ama <span className="h-px flex-1 bg-border" />
          </div>

          <form onSubmit={submit}>
            {mode === "signup" && (
              <Field icon={<UserIcon className="h-4 w-4" />} label="Magaca buuxa" value={form.fullName} onChange={(v) => setForm({ ...form, fullName: v })} />
            )}
            <div className={mode === "signup" ? "mt-4" : ""}>
              <Field icon={<Mail className="h-4 w-4" />} label="Email" type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} />
            </div>
            <div className="mt-4">
              <Field icon={<Lock className="h-4 w-4" />} label="Furaha" type="password" value={form.password} onChange={(v) => setForm({ ...form, password: v })} />
            </div>
            <button
              type="submit"
              disabled={busy}
              className="mt-6 w-full rounded-xl bg-brand-gradient px-6 py-3 font-semibold text-brand-foreground shadow-elegant transition hover:scale-[1.02] disabled:opacity-60"
            >
              {busy ? "Sugaya..." : mode === "signup" ? "Sameyso Akoon" : "Soo Gal"}
            </button>
          </form>
          <p className="mt-4 text-center text-sm text-muted-foreground">
            {mode === "signup" ? "Akoon hore ma haysataa?" : "Akoon ma lihid?"}{" "}
            <button
              type="button"
              onClick={() => setMode(mode === "signup" ? "login" : "signup")}
              className="font-semibold text-accent hover:underline"
            >
              {mode === "signup" ? "Soo gal" : "Is diiwaangeli"}
            </button>
          </p>
          <p className="mt-4 text-center text-xs text-muted-foreground">
            Ku noqo <Link to="/" className="underline">bogga hore</Link>
          </p>
        </div>
      </section>
    </Layout>
  );
}

function GoogleLogo() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 48 48" aria-hidden="true">
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.6-6 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.4 6.1 29.5 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z"/>
      <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 16 19 13 24 13c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.4 6.1 29.5 4 24 4 16.3 4 9.7 8.4 6.3 14.7z"/>
      <path fill="#4CAF50" d="M24 44c5.3 0 10.2-2 13.9-5.3l-6.4-5.4C29.4 35 26.8 36 24 36c-5.3 0-9.7-3.4-11.3-8l-6.5 5C9.5 39.5 16.2 44 24 44z"/>
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.1-4 5.4l6.4 5.4c-.4.4 7-5.1 7-14.8 0-1.3-.1-2.4-.4-3.5z"/>
    </svg>
  );
}

function Field({
  label, value, onChange, type = "text", icon,
}: { label: string; value: string; onChange: (v: string) => void; type?: string; icon?: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-medium">{label}</label>
      <div className="relative mt-1.5">
        {icon && <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">{icon}</span>}
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full rounded-lg border border-input bg-background py-2.5 text-sm outline-none ring-ring/20 focus:ring-2 ${icon ? "pl-9 pr-3" : "px-3"}`}
        />
      </div>
    </div>
  );
}
