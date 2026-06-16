import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Layout } from "@/components/Layout";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/integrations/supabase/client";
import { uploadMedia } from "@/lib/media";
import { Loader2, Plus, Pencil, Trash2, Upload, ShieldAlert, MessageSquare, Users, Search, CheckCircle2, XCircle, RotateCcw, CreditCard, Lock, Unlock } from "lucide-react";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin — Eng_omar" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminPage,
});

type Item = {
  id: string;
  title: string;
  description: string | null;
  category: string;
  image_url: string | null;
  video_url: string | null;
  content: string | null;
  published: boolean;
  created_at: string;
};

function AdminPage() {
  const { user, isAdmin, loading } = useAuth();
  const nav = useNavigate();
  const [tab, setTab] = useState<"users" | "enrollments" | "courses" | "posts" | "messages">("enrollments");

  useEffect(() => {
    if (!loading && !user) nav({ to: "/register" });
  }, [loading, user, nav]);

  if (loading) {
    return <Layout><div className="grid min-h-[60vh] place-items-center"><Loader2 className="h-8 w-8 animate-spin text-brand" /></div></Layout>;
  }
  if (!user) return null;
  if (!isAdmin) {
    return (
      <Layout>
        <div className="mx-auto max-w-xl px-4 py-24 text-center">
          <ShieldAlert className="mx-auto h-14 w-14 text-destructive" />
          <h1 className="mt-4 font-display text-2xl font-bold">Ogolaansho ma lihid</h1>
          <p className="mt-2 text-muted-foreground">
            Akoonkaagu maaha admin. Si aad u hesho gelitaanka admin, la xiriir maamulaha.
          </p>
          <p className="mt-4 text-xs text-muted-foreground">User ID: <code className="rounded bg-muted px-1.5 py-0.5">{user.id}</code></p>
          <Link to="/" className="mt-6 inline-flex rounded-lg bg-brand-gradient px-4 py-2 font-semibold text-brand-foreground">Bogga hore</Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="bg-hero-gradient py-10 text-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h1 className="font-display text-3xl font-bold sm:text-4xl">Admin Dashboard</h1>
          <p className="mt-2 text-white/85">Maamul koorasooyinka, postsyada iyo fariimaha.</p>
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-wrap gap-2 border-b border-border pb-3">
          {(["enrollments", "users", "courses", "posts", "messages"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${tab === t ? "bg-brand-gradient text-brand-foreground shadow-elegant" : "border border-border hover:bg-secondary"}`}
            >
              {t === "enrollments" ? "Diiwaangelinta" : t === "users" ? "Isticmaalayaasha" : t === "courses" ? "Koorasooyinka" : t === "posts" ? "Postsyada" : "Fariimaha"}
            </button>
          ))}
        </div>
        <div className="mt-6">
          {tab === "enrollments" && <EnrollmentsManager />}
          {tab === "users" && <UsersManager />}
          {tab === "courses" && <ItemManager kind="courses" />}
          {tab === "posts" && <ItemManager kind="posts" />}
          {tab === "messages" && <MessagesView />}
        </div>
      </section>
    </Layout>
  );
}

function ItemManager({ kind }: { kind: "courses" | "posts" }) {
  const qc = useQueryClient();
  const [editing, setEditing] = useState<Item | null>(null);
  const [open, setOpen] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ["admin", kind],
    queryFn: async () => {
      const { data, error } = await supabase.from(kind).select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return (data ?? []) as Item[];
    },
  });

  async function remove(id: string) {
    if (!confirm("Ma hubtaa inaad tirtirayso?")) return;
    const { error } = await supabase.from(kind).delete().eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Waa la tirtiray");
    qc.invalidateQueries({ queryKey: ["admin", kind] });
    qc.invalidateQueries({ queryKey: ["courses"] });
    qc.invalidateQueries({ queryKey: ["posts"] });
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="font-display text-xl font-bold">
          {kind === "courses" ? "Koorasooyinka" : "Postsyada"} ({data?.length ?? 0})
        </h2>
        <button
          onClick={() => { setEditing(null); setOpen(true); }}
          className="inline-flex items-center gap-1.5 rounded-lg bg-brand-gradient px-4 py-2 text-sm font-semibold text-brand-foreground shadow-elegant transition hover:scale-105"
        >
          <Plus className="h-4 w-4" /> {kind === "courses" ? "Kooras Cusub" : "Post Cusub"}
        </button>
      </div>

      <div className="mt-5">
        {isLoading ? (
          <p className="text-muted-foreground">Soo gelinaya...</p>
        ) : !data?.length ? (
          <p className="rounded-xl border border-dashed border-border bg-card p-10 text-center text-muted-foreground">
            Wali ma jiro waxyaabo la geliyay.
          </p>
        ) : (
          <ul className="space-y-3">
            {data.map((it) => (
              <li key={it.id} className="flex items-center gap-4 rounded-xl border border-border bg-card p-4">
                {it.image_url ? (
                  <img src={it.image_url} alt={it.title} className="h-16 w-24 rounded-lg object-cover" />
                ) : (
                  <div className="h-16 w-24 rounded-lg bg-muted" />
                )}
                <div className="min-w-0 flex-1">
                  <p className="truncate font-semibold">{it.title}</p>
                  <p className="truncate text-xs text-muted-foreground">{it.category} · {it.published ? "Published" : "Draft"}</p>
                </div>
                <button onClick={() => { setEditing(it); setOpen(true); }} className="rounded-lg border border-border p-2 hover:bg-secondary"><Pencil className="h-4 w-4" /></button>
                <button onClick={() => remove(it.id)} className="rounded-lg border border-border p-2 text-destructive hover:bg-destructive/10"><Trash2 className="h-4 w-4" /></button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {open && (
        <ItemForm
          kind={kind}
          initial={editing}
          onClose={() => setOpen(false)}
          onSaved={() => {
            setOpen(false);
            qc.invalidateQueries({ queryKey: ["admin", kind] });
            qc.invalidateQueries({ queryKey: ["courses"] });
            qc.invalidateQueries({ queryKey: ["posts"] });
          }}
        />
      )}
    </div>
  );
}

function ItemForm({
  kind, initial, onClose, onSaved,
}: { kind: "courses" | "posts"; initial: Item | null; onClose: () => void; onSaved: () => void }) {
  const categories = kind === "courses"
    ? [{ v: "coding", l: "Code" }, { v: "video_editing", l: "Video Editing" }, { v: "ai", l: "AI" }]
    : [{ v: "coding", l: "Code" }, { v: "video_editing", l: "Video Editing" }, { v: "ai", l: "AI" }, { v: "general", l: "Guud" }];

  const [form, setForm] = useState({
    title: initial?.title ?? "",
    description: initial?.description ?? "",
    category: initial?.category ?? categories[0].v,
    image_url: initial?.image_url ?? "",
    video_url: initial?.video_url ?? "",
    content: initial?.content ?? "",
    published: initial?.published ?? true,
  });
  const [busy, setBusy] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);
  const [videoUploading, setVideoUploading] = useState(false);

  async function handleUpload(file: File, kindField: "image_url" | "video_url") {
    const set = kindField === "image_url" ? setImageUploading : setVideoUploading;
    set(true);
    try {
      const url = await uploadMedia(file, kind);
      setForm((f) => ({ ...f, [kindField]: url }));
      toast.success("Faylka waa la geliyay");
    } catch (e: any) {
      toast.error(e?.message || "Khalad ayaa dhacay");
    } finally {
      set(false);
    }
  }

  async function save(e: React.FormEvent) {
    e.preventDefault();
    if (!form.title.trim()) return toast.error("Cinwaan geli");
    setBusy(true);
    const payload: any = {
      title: form.title.trim(),
      description: form.description.trim() || null,
      category: form.category,
      image_url: form.image_url || null,
      video_url: kind === "courses" ? (form.video_url || null) : null,
      content: form.content.trim() || null,
      published: form.published,
    };
    const { error } = initial
      ? await supabase.from(kind).update(payload).eq("id", initial.id)
      : await supabase.from(kind).insert(payload);
    setBusy(false);
    if (error) return toast.error(error.message);
    toast.success("Waa la kaydiyay");
    onSaved();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 animate-fade-in" onClick={onClose}>
      <form
        onClick={(e) => e.stopPropagation()}
        onSubmit={save}
        className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-card p-6 shadow-elegant"
      >
        <h3 className="font-display text-xl font-bold">{initial ? "Wax ka beddel" : "Cusub geli"}</h3>
        <div className="mt-4 grid gap-4">
          <Input label="Cinwaan" value={form.title} onChange={(v) => setForm({ ...form, title: v })} />
          <div>
            <label className="block text-sm font-medium">Qaybta</label>
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="mt-1.5 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm"
            >
              {categories.map((c) => <option key={c.v} value={c.v}>{c.l}</option>)}
            </select>
          </div>
          <Textarea label="Sharaxaad" value={form.description} onChange={(v) => setForm({ ...form, description: v })} rows={3} />

          <FileField
            label="Sawir"
            uploading={imageUploading}
            currentUrl={form.image_url}
            accept="image/*"
            onPick={(f) => handleUpload(f, "image_url")}
            onClear={() => setForm({ ...form, image_url: "" })}
          />

          {kind === "courses" && (
            <FileField
              label="Video"
              uploading={videoUploading}
              currentUrl={form.video_url}
              accept="video/*"
              onPick={(f) => handleUpload(f, "video_url")}
              onClear={() => setForm({ ...form, video_url: "" })}
            />
          )}

          <Textarea label="Qoraal dheeraad ah (ikhtiyaari)" value={form.content} onChange={(v) => setForm({ ...form, content: v })} rows={5} />

          <label className="inline-flex items-center gap-2 text-sm">
            <input type="checkbox" checked={form.published} onChange={(e) => setForm({ ...form, published: e.target.checked })} />
            Daabac (ka muuji bogga)
          </label>
        </div>
        <div className="mt-6 flex justify-end gap-2">
          <button type="button" onClick={onClose} className="rounded-lg border border-border px-4 py-2 text-sm">Jooji</button>
          <button type="submit" disabled={busy} className="rounded-lg bg-brand-gradient px-5 py-2 text-sm font-semibold text-brand-foreground disabled:opacity-60">
            {busy ? "Kaydinaya..." : "Kaydi"}
          </button>
        </div>
      </form>
    </div>
  );
}

function FileField({
  label, uploading, currentUrl, accept, onPick, onClear,
}: { label: string; uploading: boolean; currentUrl: string; accept: string; onPick: (f: File) => void; onClear: () => void }) {
  return (
    <div>
      <label className="block text-sm font-medium">{label}</label>
      <div className="mt-1.5 flex flex-wrap items-center gap-3">
        <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-dashed border-border bg-secondary/40 px-4 py-2 text-sm hover:bg-secondary">
          <Upload className="h-4 w-4" /> {uploading ? "Geliyaya..." : "Dooro fayl"}
          <input
            type="file"
            accept={accept}
            className="hidden"
            disabled={uploading}
            onChange={(e) => { const f = e.target.files?.[0]; if (f) onPick(f); }}
          />
        </label>
        {currentUrl && (
          <>
            <a href={currentUrl} target="_blank" rel="noreferrer" className="text-xs text-accent underline">Daawo</a>
            <button type="button" onClick={onClear} className="text-xs text-destructive">Ka saar</button>
          </>
        )}
      </div>
    </div>
  );
}

function Input({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="block text-sm font-medium">{label}</label>
      <input value={value} onChange={(e) => onChange(e.target.value)} className="mt-1.5 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none ring-ring/20 focus:ring-2" />
    </div>
  );
}
function Textarea({ label, value, onChange, rows = 3 }: { label: string; value: string; onChange: (v: string) => void; rows?: number }) {
  return (
    <div>
      <label className="block text-sm font-medium">{label}</label>
      <textarea value={value} onChange={(e) => onChange(e.target.value)} rows={rows} className="mt-1.5 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none ring-ring/20 focus:ring-2" />
    </div>
  );
}

function MessagesView() {
  const { data, isLoading } = useQuery({
    queryKey: ["admin", "messages"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("contact_messages")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data ?? [];
    },
  });
  return (
    <div>
      <h2 className="flex items-center gap-2 font-display text-xl font-bold">
        <MessageSquare className="h-5 w-5" /> Fariimaha ({data?.length ?? 0})
      </h2>
      <div className="mt-5 space-y-3">
        {isLoading ? <p className="text-muted-foreground">Soo gelinaya...</p>
          : !data?.length ? <p className="rounded-xl border border-dashed border-border bg-card p-10 text-center text-muted-foreground">Wali ma jirto fariimo.</p>
          : data.map((m: any) => (
            <article key={m.id} className="rounded-xl border border-border bg-card p-5">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="font-semibold">{m.full_name}</h3>
                <time className="text-xs text-muted-foreground">{new Date(m.created_at).toLocaleString()}</time>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                <a href={`mailto:${m.email}`} className="text-accent underline">{m.email}</a>
              </p>
              <p className="mt-3 whitespace-pre-wrap text-sm">{m.message}</p>
            </article>
          ))}
      </div>
    </div>
  );
}

type ProfileRow = {
  id: string;
  full_name: string | null;
  email: string | null;
  approval_status: "pending" | "approved" | "rejected";
  created_at: string;
};

function UsersManager() {
  const qc = useQueryClient();
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<"all" | "pending" | "approved" | "rejected">("pending");

  const { data, isLoading } = useQuery({
    queryKey: ["admin", "profiles"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("id, full_name, email, approval_status, created_at")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return (data ?? []) as ProfileRow[];
    },
  });

  async function setStatus(id: string, status: ProfileRow["approval_status"]) {
    const patch: any = { approval_status: status };
    if (status === "approved") patch.approved_at = new Date().toISOString();
    const { error } = await supabase.from("profiles").update(patch).eq("id", id);
    if (error) return toast.error(error.message);
    toast.success(
      status === "approved" ? "La oggolaaday" : status === "rejected" ? "La diiday" : "Dib loo dejiyay"
    );
    qc.invalidateQueries({ queryKey: ["admin", "profiles"] });
  }

  const filtered = (data ?? []).filter((u) => {
    if (filter !== "all" && u.approval_status !== filter) return false;
    if (!q.trim()) return true;
    const needle = q.toLowerCase();
    return (u.full_name ?? "").toLowerCase().includes(needle) || (u.email ?? "").toLowerCase().includes(needle);
  });

  const counts = {
    pending: (data ?? []).filter((u) => u.approval_status === "pending").length,
    approved: (data ?? []).filter((u) => u.approval_status === "approved").length,
    rejected: (data ?? []).filter((u) => u.approval_status === "rejected").length,
    all: data?.length ?? 0,
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="flex items-center gap-2 font-display text-xl font-bold">
          <Users className="h-5 w-5" /> Isticmaalayaasha ({counts.all})
        </h2>
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Raadi magaca ama email..."
            className="w-64 max-w-full rounded-lg border border-input bg-background py-2 pl-9 pr-3 text-sm outline-none ring-ring/20 focus:ring-2"
          />
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {(["pending", "approved", "rejected", "all"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
              filter === f ? "border-transparent bg-brand-gradient text-brand-foreground" : "border-border hover:bg-secondary"
            }`}
          >
            {f === "pending" ? "Sugaya" : f === "approved" ? "La oggolaaday" : f === "rejected" ? "La diiday" : "Dhammaan"}
            <span className="ms-1 opacity-70">({counts[f]})</span>
          </button>
        ))}
      </div>

      <div className="mt-5">
        {isLoading ? (
          <p className="text-muted-foreground">Soo gelinaya...</p>
        ) : !filtered.length ? (
          <p className="rounded-xl border border-dashed border-border bg-card p-10 text-center text-muted-foreground">
            Wax isticmaale ah looma helin.
          </p>
        ) : (
          <ul className="space-y-2">
            {filtered.map((u) => (
              <li key={u.id} className="flex flex-wrap items-center gap-3 rounded-xl border border-border bg-card p-4">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-brand-gradient text-sm font-bold text-white">
                  {(u.full_name?.[0] ?? u.email?.[0] ?? "?").toUpperCase()}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-semibold">{u.full_name || "(magaca lama gelin)"}</p>
                  <p className="truncate text-xs text-muted-foreground">{u.email}</p>
                </div>
                <span
                  className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                    u.approval_status === "approved"
                      ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300"
                      : u.approval_status === "rejected"
                      ? "bg-destructive/15 text-destructive"
                      : "bg-amber-500/15 text-amber-700 dark:text-amber-300"
                  }`}
                >
                  {u.approval_status === "approved" ? "La oggolaaday" : u.approval_status === "rejected" ? "La diiday" : "Sugaya"}
                </span>
                <div className="flex gap-2">
                  {u.approval_status !== "approved" && (
                    <button
                      onClick={() => setStatus(u.id, "approved")}
                      className="inline-flex items-center gap-1 rounded-lg bg-emerald-500/10 px-3 py-1.5 text-xs font-semibold text-emerald-700 hover:bg-emerald-500 hover:text-white dark:text-emerald-300"
                    >
                      <CheckCircle2 className="h-3.5 w-3.5" /> Oggolow
                    </button>
                  )}
                  {u.approval_status !== "rejected" && (
                    <button
                      onClick={() => setStatus(u.id, "rejected")}
                      className="inline-flex items-center gap-1 rounded-lg bg-destructive/10 px-3 py-1.5 text-xs font-semibold text-destructive hover:bg-destructive hover:text-destructive-foreground"
                    >
                      <XCircle className="h-3.5 w-3.5" /> {u.approval_status === "approved" ? "Ka qaad" : "Diid"}
                    </button>
                  )}
                  {u.approval_status !== "pending" && (
                    <button
                      onClick={() => setStatus(u.id, "pending")}
                      className="inline-flex items-center gap-1 rounded-lg border border-border px-3 py-1.5 text-xs font-medium hover:bg-secondary"
                    >
                      <RotateCcw className="h-3.5 w-3.5" /> Dib u dej
                    </button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

type EnrollmentRow = {
  id: string;
  user_id: string;
  course_slug: string;
  payment_status: "unpaid" | "paid";
  access_granted: boolean;
  created_at: string;
  profile?: { full_name: string | null; email: string | null } | null;
};

function EnrollmentsManager() {
  const qc = useQueryClient();
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<"all" | "unpaid" | "paid" | "granted">("all");

  const { data, isLoading } = useQuery({
    queryKey: ["admin", "enrollments"],
    queryFn: async () => {
      const { data: rows, error } = await supabase
        .from("course_enrollments")
        .select("id, user_id, course_slug, payment_status, access_granted, created_at")
        .order("created_at", { ascending: false });
      if (error) throw error;
      const list = (rows ?? []) as EnrollmentRow[];
      const ids = Array.from(new Set(list.map((r) => r.user_id)));
      if (ids.length === 0) return list;
      const { data: profiles } = await supabase
        .from("profiles")
        .select("id, full_name, email")
        .in("id", ids);
      const map = new Map((profiles ?? []).map((p: any) => [p.id, p]));
      return list.map((r) => ({ ...r, profile: map.get(r.user_id) ?? null }));
    },
  });

  async function setStatus(
    id: string,
    patch: { payment_status?: "paid" | "unpaid"; access_granted?: boolean },
  ) {
    const { error } = await supabase.from("course_enrollments").update(patch).eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("La cusbooneysiiyay");
    qc.invalidateQueries({ queryKey: ["admin", "enrollments"] });
  }

  async function remove(id: string) {
    if (!confirm("Ma hubtaa inaad tirtirayso diiwaangelinta?")) return;
    const { error } = await supabase.from("course_enrollments").delete().eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Waa la tirtiray");
    qc.invalidateQueries({ queryKey: ["admin", "enrollments"] });
  }

  const filtered = (data ?? []).filter((r) => {
    if (filter === "unpaid" && r.payment_status !== "unpaid") return false;
    if (filter === "paid" && r.payment_status !== "paid") return false;
    if (filter === "granted" && !r.access_granted) return false;
    if (!q.trim()) return true;
    const needle = q.toLowerCase();
    return (
      (r.profile?.full_name ?? "").toLowerCase().includes(needle) ||
      (r.profile?.email ?? "").toLowerCase().includes(needle) ||
      r.course_slug.toLowerCase().includes(needle)
    );
  });

  const counts = {
    all: data?.length ?? 0,
    unpaid: (data ?? []).filter((r) => r.payment_status === "unpaid").length,
    paid: (data ?? []).filter((r) => r.payment_status === "paid").length,
    granted: (data ?? []).filter((r) => r.access_granted).length,
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="flex items-center gap-2 font-display text-xl font-bold">
          <CreditCard className="h-5 w-5" /> Diiwaangelinta Koorasooyinka ({counts.all})
        </h2>
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Raadi magaca, email ama kooras..."
            className="w-64 max-w-full rounded-lg border border-input bg-background py-2 pl-9 pr-3 text-sm outline-none ring-ring/20 focus:ring-2"
          />
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {(["all", "unpaid", "paid", "granted"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
              filter === f ? "border-transparent bg-brand-gradient text-brand-foreground" : "border-border hover:bg-secondary"
            }`}
          >
            {f === "all" ? "Dhammaan" : f === "unpaid" ? "Aan Bixin" : f === "paid" ? "La Bixiyay" : "Furan"}
            <span className="ms-1 opacity-70">({counts[f]})</span>
          </button>
        ))}
      </div>

      <div className="mt-5">
        {isLoading ? (
          <p className="text-muted-foreground">Soo gelinaya...</p>
        ) : !filtered.length ? (
          <p className="rounded-xl border border-dashed border-border bg-card p-10 text-center text-muted-foreground">
            Wax diiwaangelin ah lama helin.
          </p>
        ) : (
          <ul className="space-y-2">
            {filtered.map((r) => (
              <li key={r.id} className="flex flex-wrap items-center gap-3 rounded-xl border border-border bg-card p-4">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-brand-gradient text-sm font-bold text-white">
                  {(r.profile?.full_name?.[0] ?? r.profile?.email?.[0] ?? "?").toUpperCase()}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-semibold">{r.profile?.full_name || "(magaca lama gelin)"}</p>
                  <p className="truncate text-xs text-muted-foreground">{r.profile?.email}</p>
                  <p className="mt-0.5 truncate text-[11px] text-muted-foreground">{r.course_slug}</p>
                </div>
                <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                  r.payment_status === "paid" ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300" : "bg-amber-500/15 text-amber-700 dark:text-amber-300"
                }`}>
                  {r.payment_status === "paid" ? "La Bixiyay" : "Aan Bixin"}
                </span>
                <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                  r.access_granted ? "bg-blue-500/15 text-blue-700 dark:text-blue-300" : "bg-muted text-muted-foreground"
                }`}>
                  {r.access_granted ? "Furan" : "Xiran"}
                </span>
                <div className="flex flex-wrap gap-2">
                  {r.payment_status === "unpaid" ? (
                    <button
                      onClick={() => setStatus(r.id, { payment_status: "paid", access_granted: true })}
                      className="inline-flex items-center gap-1 rounded-lg bg-emerald-500/10 px-3 py-1.5 text-xs font-semibold text-emerald-700 hover:bg-emerald-500 hover:text-white dark:text-emerald-300"
                    >
                      <CheckCircle2 className="h-3.5 w-3.5" /> Calaamadi Lacag La Bixiyay
                    </button>
                  ) : (
                    <button
                      onClick={() => setStatus(r.id, { payment_status: "unpaid", access_granted: false })}
                      className="inline-flex items-center gap-1 rounded-lg border border-border px-3 py-1.5 text-xs font-medium hover:bg-secondary"
                    >
                      <RotateCcw className="h-3.5 w-3.5" /> Calaamadi Aan Bixin
                    </button>
                  )}
                  {r.access_granted ? (
                    <button
                      onClick={() => setStatus(r.id, { access_granted: false })}
                      className="inline-flex items-center gap-1 rounded-lg bg-destructive/10 px-3 py-1.5 text-xs font-semibold text-destructive hover:bg-destructive hover:text-destructive-foreground"
                    >
                      <Lock className="h-3.5 w-3.5" /> Xir
                    </button>
                  ) : (
                    <button
                      onClick={() => setStatus(r.id, { access_granted: true })}
                      className="inline-flex items-center gap-1 rounded-lg bg-blue-500/10 px-3 py-1.5 text-xs font-semibold text-blue-700 hover:bg-blue-500 hover:text-white dark:text-blue-300"
                    >
                      <Unlock className="h-3.5 w-3.5" /> Fur
                    </button>
                  )}
                  <button
                    onClick={() => remove(r.id)}
                    className="rounded-lg border border-border p-2 text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
