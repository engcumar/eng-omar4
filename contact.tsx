import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { Layout } from "@/components/Layout";
import { SocialIcons } from "@/components/SocialIcons";
import { supabase } from "@/integrations/supabase/client";
import { SITE } from "@/lib/site";
import { MessageCircle, Send } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Nala Soo Xiriir — Eng_omar" },
      { name: "description", content: "Nala soo xiriir Eng_omar — foomka xiriirka iyo WhatsApp." },
    ],
  }),
  component: ContactPage,
});

const schema = z.object({
  full_name: z.string().trim().min(2, "Magaca oo dhameystiran ha ka yaraan 2 xaraf").max(120),
  email: z.string().trim().email("Email sax ah geli").max(255),
  message: z.string().trim().min(5, "Fariintu ha ka yaraan 5 xaraf").max(5000),
});

function ContactPage() {
  const [form, setForm] = useState({ full_name: "", email: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }
    setSubmitting(true);
    const { error } = await supabase.from("contact_messages").insert(parsed.data);
    setSubmitting(false);
    if (error) return toast.error("Khalad ayaa dhacay. Mar kale isku day.");
    toast.success("Mahadsanid! Fariintaada waa la helay.");
    setForm({ full_name: "", email: "", message: "" });
  }

  return (
    <Layout>
      <section className="bg-hero-gradient py-16 text-white">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8 animate-fade-in-up">
          <h1 className="font-display text-4xl font-bold sm:text-5xl">Nala Soo Xiriir</h1>
          <p className="mx-auto mt-3 max-w-xl text-white/85">
            Su'aal ma qabtaa? Noo soo dir fariin ama si toos ah noogu soo xiriir WhatsApp.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-5 lg:px-8">
        <form onSubmit={onSubmit} className="lg:col-span-3 rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-elegant animate-fade-in">
          <h2 className="font-display text-2xl font-bold">Foomka Xiriirka</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <Field label="Magaca oo dhameystiran" value={form.full_name} onChange={(v) => setForm({ ...form, full_name: v })} placeholder="Magacaaga" />
            <Field label="Email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} placeholder="your@email.com" type="email" />
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium">Fariinta</label>
            <textarea
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              rows={6}
              maxLength={5000}
              className="mt-1.5 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none ring-ring/20 focus:ring-2"
              placeholder="Qor fariintaada halkan..."
            />
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-brand-gradient px-6 py-3 font-semibold text-brand-foreground shadow-elegant transition hover:scale-105 disabled:opacity-60"
          >
            <Send className="h-4 w-4" /> {submitting ? "Diraya..." : "Dir Fariinta"}
          </button>
        </form>

        <aside className="lg:col-span-2 flex flex-col gap-6">
          <a
            href={SITE.whatsappLink}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-4 rounded-2xl bg-[var(--whatsapp)] p-6 text-white shadow-elegant transition hover:scale-105 animate-pulse-glow"
          >
            <div className="grid h-14 w-14 place-items-center rounded-xl bg-white/20">
              <MessageCircle className="h-7 w-7" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider opacity-90">Si toos ah</p>
              <p className="font-display text-xl font-bold">Nagala hadal WhatsApp</p>
              <p className="text-sm opacity-90">{SITE.whatsappNumber}</p>
            </div>
          </a>

          <div className="rounded-2xl border border-border bg-card p-6">
            <h3 className="font-display text-lg font-bold">Warbaahinta Bulshada</h3>
            <p className="mt-1 text-sm text-muted-foreground">Naga raac:</p>
            <div className="mt-4">
              <SocialIcons size="lg" />
            </div>
            <ul className="mt-4 space-y-1 text-sm text-muted-foreground">
              <li>Instagram: {SITE.instagramHandle}</li>
              <li>TikTok: {SITE.tiktokHandle}</li>
            </ul>
          </div>
        </aside>
      </section>
    </Layout>
  );
}

function Field({
  label, value, onChange, placeholder, type = "text",
}: { label: string; value: string; onChange: (v: string) => void; placeholder?: string; type?: string }) {
  return (
    <div>
      <label className="block text-sm font-medium">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-1.5 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none ring-ring/20 focus:ring-2"
      />
    </div>
  );
}
