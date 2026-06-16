import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { a as useQueryClient, u as useQuery } from "../_libs/tanstack__react-query.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { u as useAuth, L as Layout } from "./router-LcFJ8l5I.mjs";
import { s as supabase } from "./client-CeIwuk8s.mjs";
import { k as LoaderCircle, x as ShieldAlert, p as CreditCard, y as Search, m as CircleCheck, z as RotateCcw, h as Lock, D as LockOpen, T as Trash2, H as Users, i as CircleX, P as Plus, J as Pencil, u as MessageSquare, K as Upload } from "../_libs/lucide-react.mjs";

import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/unenv.mjs";


import "../_libs/seroval-plugins.mjs";


import "../_libs/react-dom.mjs";
import "../_libs/isbot.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "../_libs/tslib.mjs";
import "../_libs/supabase__functions-js.mjs";
const LONG_EXPIRY = 60 * 60 * 24 * 365 * 100;
async function uploadMedia(file, folder) {
  const ext = file.name.split(".").pop() || "bin";
  const path = `${folder}/${crypto.randomUUID()}.${ext}`;
  const { error } = await supabase.storage.from("media").upload(path, file, {
    cacheControl: "31536000",
    upsert: false
  });
  if (error) throw error;
  const { data, error: sErr } = await supabase.storage.from("media").createSignedUrl(path, LONG_EXPIRY);
  if (sErr) throw sErr;
  return data.signedUrl;
}
function AdminPage() {
  const {
    user,
    isAdmin,
    loading
  } = useAuth();
  const nav = useNavigate();
  const [tab, setTab] = reactExports.useState("enrollments");
  reactExports.useEffect(() => {
    if (!loading && !user) nav({
      to: "/register"
    });
  }, [loading, user, nav]);
  if (loading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid min-h-[60vh] place-items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-8 w-8 animate-spin text-brand" }) }) });
  }
  if (!user) return null;
  if (!isAdmin) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-xl px-4 py-24 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldAlert, { className: "mx-auto h-14 w-14 text-destructive" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-4 font-display text-2xl font-bold", children: "Ogolaansho ma lihid" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-muted-foreground", children: "Akoonkaagu maaha admin. Si aad u hesho gelitaanka admin, la xiriir maamulaha." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-4 text-xs text-muted-foreground", children: [
        "User ID: ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "rounded bg-muted px-1.5 py-0.5", children: user.id })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "mt-6 inline-flex rounded-lg bg-brand-gradient px-4 py-2 font-semibold text-brand-foreground", children: "Bogga hore" })
    ] }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Layout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-hero-gradient py-10 text-white", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-6xl px-4 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-bold sm:text-4xl", children: "Admin Dashboard" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-white/85", children: "Maamul koorasooyinka, postsyada iyo fariimaha." })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2 border-b border-border pb-3", children: ["enrollments", "users", "courses", "posts", "messages"].map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setTab(t), className: `rounded-lg px-4 py-2 text-sm font-semibold transition ${tab === t ? "bg-brand-gradient text-brand-foreground shadow-elegant" : "border border-border hover:bg-secondary"}`, children: t === "enrollments" ? "Diiwaangelinta" : t === "users" ? "Isticmaalayaasha" : t === "courses" ? "Koorasooyinka" : t === "posts" ? "Postsyada" : "Fariimaha" }, t)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6", children: [
        tab === "enrollments" && /* @__PURE__ */ jsxRuntimeExports.jsx(EnrollmentsManager, {}),
        tab === "users" && /* @__PURE__ */ jsxRuntimeExports.jsx(UsersManager, {}),
        tab === "courses" && /* @__PURE__ */ jsxRuntimeExports.jsx(ItemManager, { kind: "courses" }),
        tab === "posts" && /* @__PURE__ */ jsxRuntimeExports.jsx(ItemManager, { kind: "posts" }),
        tab === "messages" && /* @__PURE__ */ jsxRuntimeExports.jsx(MessagesView, {})
      ] })
    ] })
  ] });
}
function ItemManager({
  kind
}) {
  const qc = useQueryClient();
  const [editing, setEditing] = reactExports.useState(null);
  const [open, setOpen] = reactExports.useState(false);
  const {
    data,
    isLoading
  } = useQuery({
    queryKey: ["admin", kind],
    queryFn: async () => {
      const {
        data: data2,
        error
      } = await supabase.from(kind).select("*").order("created_at", {
        ascending: false
      });
      if (error) throw error;
      return data2 ?? [];
    }
  });
  async function remove(id) {
    if (!confirm("Ma hubtaa inaad tirtirayso?")) return;
    const {
      error
    } = await supabase.from(kind).delete().eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Waa la tirtiray");
    qc.invalidateQueries({
      queryKey: ["admin", kind]
    });
    qc.invalidateQueries({
      queryKey: ["courses"]
    });
    qc.invalidateQueries({
      queryKey: ["posts"]
    });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-xl font-bold", children: [
        kind === "courses" ? "Koorasooyinka" : "Postsyada",
        " (",
        data?.length ?? 0,
        ")"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => {
        setEditing(null);
        setOpen(true);
      }, className: "inline-flex items-center gap-1.5 rounded-lg bg-brand-gradient px-4 py-2 text-sm font-semibold text-brand-foreground shadow-elegant transition hover:scale-105", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
        " ",
        kind === "courses" ? "Kooras Cusub" : "Post Cusub"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-5", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Soo gelinaya..." }) : !data?.length ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "rounded-xl border border-dashed border-border bg-card p-10 text-center text-muted-foreground", children: "Wali ma jiro waxyaabo la geliyay." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-3", children: data.map((it) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-4 rounded-xl border border-border bg-card p-4", children: [
      it.image_url ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: it.image_url, alt: it.title, className: "h-16 w-24 rounded-lg object-cover" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-16 w-24 rounded-lg bg-muted" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate font-semibold", children: it.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "truncate text-xs text-muted-foreground", children: [
          it.category,
          " · ",
          it.published ? "Published" : "Draft"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => {
        setEditing(it);
        setOpen(true);
      }, className: "rounded-lg border border-border p-2 hover:bg-secondary", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "h-4 w-4" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => remove(it.id), className: "rounded-lg border border-border p-2 text-destructive hover:bg-destructive/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" }) })
    ] }, it.id)) }) }),
    open && /* @__PURE__ */ jsxRuntimeExports.jsx(ItemForm, { kind, initial: editing, onClose: () => setOpen(false), onSaved: () => {
      setOpen(false);
      qc.invalidateQueries({
        queryKey: ["admin", kind]
      });
      qc.invalidateQueries({
        queryKey: ["courses"]
      });
      qc.invalidateQueries({
        queryKey: ["posts"]
      });
    } })
  ] });
}
function ItemForm({
  kind,
  initial,
  onClose,
  onSaved
}) {
  const categories = kind === "courses" ? [{
    v: "coding",
    l: "Code"
  }, {
    v: "video_editing",
    l: "Video Editing"
  }, {
    v: "ai",
    l: "AI"
  }] : [{
    v: "coding",
    l: "Code"
  }, {
    v: "video_editing",
    l: "Video Editing"
  }, {
    v: "ai",
    l: "AI"
  }, {
    v: "general",
    l: "Guud"
  }];
  const [form, setForm] = reactExports.useState({
    title: initial?.title ?? "",
    description: initial?.description ?? "",
    category: initial?.category ?? categories[0].v,
    image_url: initial?.image_url ?? "",
    video_url: initial?.video_url ?? "",
    content: initial?.content ?? "",
    published: initial?.published ?? true
  });
  const [busy, setBusy] = reactExports.useState(false);
  const [imageUploading, setImageUploading] = reactExports.useState(false);
  const [videoUploading, setVideoUploading] = reactExports.useState(false);
  async function handleUpload(file, kindField) {
    const set = kindField === "image_url" ? setImageUploading : setVideoUploading;
    set(true);
    try {
      const url = await uploadMedia(file, kind);
      setForm((f) => ({
        ...f,
        [kindField]: url
      }));
      toast.success("Faylka waa la geliyay");
    } catch (e) {
      toast.error(e?.message || "Khalad ayaa dhacay");
    } finally {
      set(false);
    }
  }
  async function save(e) {
    e.preventDefault();
    if (!form.title.trim()) return toast.error("Cinwaan geli");
    setBusy(true);
    const payload = {
      title: form.title.trim(),
      description: form.description.trim() || null,
      category: form.category,
      image_url: form.image_url || null,
      video_url: kind === "courses" ? form.video_url || null : null,
      content: form.content.trim() || null,
      published: form.published
    };
    const {
      error
    } = initial ? await supabase.from(kind).update(payload).eq("id", initial.id) : await supabase.from(kind).insert(payload);
    setBusy(false);
    if (error) return toast.error(error.message);
    toast.success("Waa la kaydiyay");
    onSaved();
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 animate-fade-in", onClick: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onClick: (e) => e.stopPropagation(), onSubmit: save, className: "max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-card p-6 shadow-elegant", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-xl font-bold", children: initial ? "Wax ka beddel" : "Cusub geli" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 grid gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { label: "Cinwaan", value: form.title, onChange: (v) => setForm({
        ...form,
        title: v
      }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium", children: "Qaybta" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("select", { value: form.category, onChange: (e) => setForm({
          ...form,
          category: e.target.value
        }), className: "mt-1.5 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm", children: categories.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: c.v, children: c.l }, c.v)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { label: "Sharaxaad", value: form.description, onChange: (v) => setForm({
        ...form,
        description: v
      }), rows: 3 }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FileField, { label: "Sawir", uploading: imageUploading, currentUrl: form.image_url, accept: "image/*", onPick: (f) => handleUpload(f, "image_url"), onClear: () => setForm({
        ...form,
        image_url: ""
      }) }),
      kind === "courses" && /* @__PURE__ */ jsxRuntimeExports.jsx(FileField, { label: "Video", uploading: videoUploading, currentUrl: form.video_url, accept: "video/*", onPick: (f) => handleUpload(f, "video_url"), onClear: () => setForm({
        ...form,
        video_url: ""
      }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { label: "Qoraal dheeraad ah (ikhtiyaari)", value: form.content, onChange: (v) => setForm({
        ...form,
        content: v
      }), rows: 5 }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "inline-flex items-center gap-2 text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", checked: form.published, onChange: (e) => setForm({
          ...form,
          published: e.target.checked
        }) }),
        "Daabac (ka muuji bogga)"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex justify-end gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: onClose, className: "rounded-lg border border-border px-4 py-2 text-sm", children: "Jooji" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", disabled: busy, className: "rounded-lg bg-brand-gradient px-5 py-2 text-sm font-semibold text-brand-foreground disabled:opacity-60", children: busy ? "Kaydinaya..." : "Kaydi" })
    ] })
  ] }) });
}
function FileField({
  label,
  uploading,
  currentUrl,
  accept,
  onPick,
  onClear
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1.5 flex flex-wrap items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "inline-flex cursor-pointer items-center gap-2 rounded-lg border border-dashed border-border bg-secondary/40 px-4 py-2 text-sm hover:bg-secondary", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "h-4 w-4" }),
        " ",
        uploading ? "Geliyaya..." : "Dooro fayl",
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "file", accept, className: "hidden", disabled: uploading, onChange: (e) => {
          const f = e.target.files?.[0];
          if (f) onPick(f);
        } })
      ] }),
      currentUrl && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: currentUrl, target: "_blank", rel: "noreferrer", className: "text-xs text-accent underline", children: "Daawo" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: onClear, className: "text-xs text-destructive", children: "Ka saar" })
      ] })
    ] })
  ] });
}
function Input({
  label,
  value,
  onChange
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value, onChange: (e) => onChange(e.target.value), className: "mt-1.5 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none ring-ring/20 focus:ring-2" })
  ] });
}
function Textarea({
  label,
  value,
  onChange,
  rows = 3
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { value, onChange: (e) => onChange(e.target.value), rows, className: "mt-1.5 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none ring-ring/20 focus:ring-2" })
  ] });
}
function MessagesView() {
  const {
    data,
    isLoading
  } = useQuery({
    queryKey: ["admin", "messages"],
    queryFn: async () => {
      const {
        data: data2,
        error
      } = await supabase.from("contact_messages").select("*").order("created_at", {
        ascending: false
      });
      if (error) throw error;
      return data2 ?? [];
    }
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "flex items-center gap-2 font-display text-xl font-bold", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "h-5 w-5" }),
      " Fariimaha (",
      data?.length ?? 0,
      ")"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-5 space-y-3", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Soo gelinaya..." }) : !data?.length ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "rounded-xl border border-dashed border-border bg-card p-10 text-center text-muted-foreground", children: "Wali ma jirto fariimo." }) : data.map((m) => /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "rounded-xl border border-border bg-card p-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-baseline justify-between gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold", children: m.full_name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("time", { className: "text-xs text-muted-foreground", children: new Date(m.created_at).toLocaleString() })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: `mailto:${m.email}`, className: "text-accent underline", children: m.email }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 whitespace-pre-wrap text-sm", children: m.message })
    ] }, m.id)) })
  ] });
}
function UsersManager() {
  const qc = useQueryClient();
  const [q, setQ] = reactExports.useState("");
  const [filter, setFilter] = reactExports.useState("pending");
  const {
    data,
    isLoading
  } = useQuery({
    queryKey: ["admin", "profiles"],
    queryFn: async () => {
      const {
        data: data2,
        error
      } = await supabase.from("profiles").select("id, full_name, email, approval_status, created_at").order("created_at", {
        ascending: false
      });
      if (error) throw error;
      return data2 ?? [];
    }
  });
  async function setStatus(id, status) {
    const patch = {
      approval_status: status
    };
    if (status === "approved") patch.approved_at = (/* @__PURE__ */ new Date()).toISOString();
    const {
      error
    } = await supabase.from("profiles").update(patch).eq("id", id);
    if (error) return toast.error(error.message);
    toast.success(status === "approved" ? "La oggolaaday" : status === "rejected" ? "La diiday" : "Dib loo dejiyay");
    qc.invalidateQueries({
      queryKey: ["admin", "profiles"]
    });
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
    all: data?.length ?? 0
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center justify-between gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "flex items-center gap-2 font-display text-xl font-bold", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-5 w-5" }),
        " Isticmaalayaasha (",
        counts.all,
        ")"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: q, onChange: (e) => setQ(e.target.value), placeholder: "Raadi magaca ama email...", className: "w-64 max-w-full rounded-lg border border-input bg-background py-2 pl-9 pr-3 text-sm outline-none ring-ring/20 focus:ring-2" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 flex flex-wrap gap-2", children: ["pending", "approved", "rejected", "all"].map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setFilter(f), className: `rounded-full border px-3 py-1.5 text-xs font-semibold transition ${filter === f ? "border-transparent bg-brand-gradient text-brand-foreground" : "border-border hover:bg-secondary"}`, children: [
      f === "pending" ? "Sugaya" : f === "approved" ? "La oggolaaday" : f === "rejected" ? "La diiday" : "Dhammaan",
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ms-1 opacity-70", children: [
        "(",
        counts[f],
        ")"
      ] })
    ] }, f)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-5", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Soo gelinaya..." }) : !filtered.length ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "rounded-xl border border-dashed border-border bg-card p-10 text-center text-muted-foreground", children: "Wax isticmaale ah looma helin." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2", children: filtered.map((u) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex flex-wrap items-center gap-3 rounded-xl border border-border bg-card p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-10 w-10 place-items-center rounded-full bg-brand-gradient text-sm font-bold text-white", children: (u.full_name?.[0] ?? u.email?.[0] ?? "?").toUpperCase() }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate font-semibold", children: u.full_name || "(magaca lama gelin)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate text-xs text-muted-foreground", children: u.email })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `rounded-full px-2.5 py-0.5 text-xs font-semibold ${u.approval_status === "approved" ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300" : u.approval_status === "rejected" ? "bg-destructive/15 text-destructive" : "bg-amber-500/15 text-amber-700 dark:text-amber-300"}`, children: u.approval_status === "approved" ? "La oggolaaday" : u.approval_status === "rejected" ? "La diiday" : "Sugaya" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
        u.approval_status !== "approved" && /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setStatus(u.id, "approved"), className: "inline-flex items-center gap-1 rounded-lg bg-emerald-500/10 px-3 py-1.5 text-xs font-semibold text-emerald-700 hover:bg-emerald-500 hover:text-white dark:text-emerald-300", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-3.5 w-3.5" }),
          " Oggolow"
        ] }),
        u.approval_status !== "rejected" && /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setStatus(u.id, "rejected"), className: "inline-flex items-center gap-1 rounded-lg bg-destructive/10 px-3 py-1.5 text-xs font-semibold text-destructive hover:bg-destructive hover:text-destructive-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "h-3.5 w-3.5" }),
          " ",
          u.approval_status === "approved" ? "Ka qaad" : "Diid"
        ] }),
        u.approval_status !== "pending" && /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setStatus(u.id, "pending"), className: "inline-flex items-center gap-1 rounded-lg border border-border px-3 py-1.5 text-xs font-medium hover:bg-secondary", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { className: "h-3.5 w-3.5" }),
          " Dib u dej"
        ] })
      ] })
    ] }, u.id)) }) })
  ] });
}
function EnrollmentsManager() {
  const qc = useQueryClient();
  const [q, setQ] = reactExports.useState("");
  const [filter, setFilter] = reactExports.useState("all");
  const {
    data,
    isLoading
  } = useQuery({
    queryKey: ["admin", "enrollments"],
    queryFn: async () => {
      const {
        data: rows,
        error
      } = await supabase.from("course_enrollments").select("id, user_id, course_slug, payment_status, access_granted, created_at").order("created_at", {
        ascending: false
      });
      if (error) throw error;
      const list = rows ?? [];
      const ids = Array.from(new Set(list.map((r) => r.user_id)));
      if (ids.length === 0) return list;
      const {
        data: profiles
      } = await supabase.from("profiles").select("id, full_name, email").in("id", ids);
      const map = new Map((profiles ?? []).map((p) => [p.id, p]));
      return list.map((r) => ({
        ...r,
        profile: map.get(r.user_id) ?? null
      }));
    }
  });
  async function setStatus(id, patch) {
    const {
      error
    } = await supabase.from("course_enrollments").update(patch).eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("La cusbooneysiiyay");
    qc.invalidateQueries({
      queryKey: ["admin", "enrollments"]
    });
  }
  async function remove(id) {
    if (!confirm("Ma hubtaa inaad tirtirayso diiwaangelinta?")) return;
    const {
      error
    } = await supabase.from("course_enrollments").delete().eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Waa la tirtiray");
    qc.invalidateQueries({
      queryKey: ["admin", "enrollments"]
    });
  }
  const filtered = (data ?? []).filter((r) => {
    if (filter === "unpaid" && r.payment_status !== "unpaid") return false;
    if (filter === "paid" && r.payment_status !== "paid") return false;
    if (filter === "granted" && !r.access_granted) return false;
    if (!q.trim()) return true;
    const needle = q.toLowerCase();
    return (r.profile?.full_name ?? "").toLowerCase().includes(needle) || (r.profile?.email ?? "").toLowerCase().includes(needle) || r.course_slug.toLowerCase().includes(needle);
  });
  const counts = {
    all: data?.length ?? 0,
    unpaid: (data ?? []).filter((r) => r.payment_status === "unpaid").length,
    paid: (data ?? []).filter((r) => r.payment_status === "paid").length,
    granted: (data ?? []).filter((r) => r.access_granted).length
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center justify-between gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "flex items-center gap-2 font-display text-xl font-bold", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { className: "h-5 w-5" }),
        " Diiwaangelinta Koorasooyinka (",
        counts.all,
        ")"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: q, onChange: (e) => setQ(e.target.value), placeholder: "Raadi magaca, email ama kooras...", className: "w-64 max-w-full rounded-lg border border-input bg-background py-2 pl-9 pr-3 text-sm outline-none ring-ring/20 focus:ring-2" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 flex flex-wrap gap-2", children: ["all", "unpaid", "paid", "granted"].map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setFilter(f), className: `rounded-full border px-3 py-1.5 text-xs font-semibold transition ${filter === f ? "border-transparent bg-brand-gradient text-brand-foreground" : "border-border hover:bg-secondary"}`, children: [
      f === "all" ? "Dhammaan" : f === "unpaid" ? "Aan Bixin" : f === "paid" ? "La Bixiyay" : "Furan",
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ms-1 opacity-70", children: [
        "(",
        counts[f],
        ")"
      ] })
    ] }, f)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-5", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Soo gelinaya..." }) : !filtered.length ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "rounded-xl border border-dashed border-border bg-card p-10 text-center text-muted-foreground", children: "Wax diiwaangelin ah lama helin." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2", children: filtered.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex flex-wrap items-center gap-3 rounded-xl border border-border bg-card p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-10 w-10 place-items-center rounded-full bg-brand-gradient text-sm font-bold text-white", children: (r.profile?.full_name?.[0] ?? r.profile?.email?.[0] ?? "?").toUpperCase() }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate font-semibold", children: r.profile?.full_name || "(magaca lama gelin)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate text-xs text-muted-foreground", children: r.profile?.email }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-0.5 truncate text-[11px] text-muted-foreground", children: r.course_slug })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `rounded-full px-2.5 py-0.5 text-xs font-semibold ${r.payment_status === "paid" ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300" : "bg-amber-500/15 text-amber-700 dark:text-amber-300"}`, children: r.payment_status === "paid" ? "La Bixiyay" : "Aan Bixin" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `rounded-full px-2.5 py-0.5 text-xs font-semibold ${r.access_granted ? "bg-blue-500/15 text-blue-700 dark:text-blue-300" : "bg-muted text-muted-foreground"}`, children: r.access_granted ? "Furan" : "Xiran" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2", children: [
        r.payment_status === "unpaid" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setStatus(r.id, {
          payment_status: "paid",
          access_granted: true
        }), className: "inline-flex items-center gap-1 rounded-lg bg-emerald-500/10 px-3 py-1.5 text-xs font-semibold text-emerald-700 hover:bg-emerald-500 hover:text-white dark:text-emerald-300", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-3.5 w-3.5" }),
          " Calaamadi Lacag La Bixiyay"
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setStatus(r.id, {
          payment_status: "unpaid",
          access_granted: false
        }), className: "inline-flex items-center gap-1 rounded-lg border border-border px-3 py-1.5 text-xs font-medium hover:bg-secondary", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { className: "h-3.5 w-3.5" }),
          " Calaamadi Aan Bixin"
        ] }),
        r.access_granted ? /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setStatus(r.id, {
          access_granted: false
        }), className: "inline-flex items-center gap-1 rounded-lg bg-destructive/10 px-3 py-1.5 text-xs font-semibold text-destructive hover:bg-destructive hover:text-destructive-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "h-3.5 w-3.5" }),
          " Xir"
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setStatus(r.id, {
          access_granted: true
        }), className: "inline-flex items-center gap-1 rounded-lg bg-blue-500/10 px-3 py-1.5 text-xs font-semibold text-blue-700 hover:bg-blue-500 hover:text-white dark:text-blue-300", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(LockOpen, { className: "h-3.5 w-3.5" }),
          " Fur"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => remove(r.id), className: "rounded-lg border border-border p-2 text-destructive hover:bg-destructive/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3.5 w-3.5" }) })
      ] })
    ] }, r.id)) }) })
  ] });
}
export {
  AdminPage as component
};
