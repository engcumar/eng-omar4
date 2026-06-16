import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Layout } from "@/components/Layout";
import { supabase } from "@/integrations/supabase/client";
import { CATEGORIES } from "@/lib/site";
import { PlayCircle, ImageOff } from "lucide-react";

export const Route = createFileRoute("/courses")({
  head: () => ({
    meta: [
      { title: "Koorasooyinka — Eng_omar" },
      { name: "description", content: "Liiska dhammaan koorasooyinka Eng_omar — Code, Video Editing iyo AI." },
    ],
  }),
  component: CoursesPage,
});

export type Course = {
  id: string;
  title: string;
  description: string | null;
  category: "coding" | "video_editing" | "ai";
  image_url: string | null;
  video_url: string | null;
  content: string | null;
  created_at: string;
};

export function useCourses(category?: Course["category"]) {
  return useQuery({
    queryKey: ["courses", category ?? "all"],
    queryFn: async () => {
      let q = supabase
        .from("courses")
        .select("*")
        .eq("published", true)
        .order("created_at", { ascending: false });
      if (category) q = q.eq("category", category);
      const { data, error } = await q;
      if (error) throw error;
      return (data ?? []) as Course[];
    },
  });
}

export function CourseCard({ c }: { c: Course }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card hover-lift animate-fade-in-up">
      <div className="relative aspect-video overflow-hidden bg-secondary">
        {c.image_url ? (
          <img
            src={c.image_url}
            alt={c.title}
            loading="lazy"
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="grid h-full w-full place-items-center text-muted-foreground">
            <ImageOff className="h-10 w-10" />
          </div>
        )}
        {c.video_url && (
          <div className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-black/60 text-white">
            <PlayCircle className="h-5 w-5" />
          </div>
        )}
        <span className="absolute left-3 top-3 rounded-full bg-brand-gradient px-3 py-1 text-xs font-semibold text-white">
          {CATEGORIES[c.category].short}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-lg font-bold">{c.title}</h3>
        {c.description && (
          <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">{c.description}</p>
        )}
        {c.video_url && (
          <a
            href={c.video_url}
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-flex w-fit items-center gap-2 rounded-lg bg-brand-gradient px-4 py-2 text-sm font-semibold text-white transition hover:scale-105"
          >
            <PlayCircle className="h-4 w-4" /> Daawo Video
          </a>
        )}
      </div>
    </article>
  );
}

function CoursesPage() {
  const { data, isLoading } = useCourses();
  return (
    <Layout>
      <section className="bg-hero-gradient py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="font-display text-4xl font-bold sm:text-5xl">Koorasooyinka</h1>
          <p className="mt-3 max-w-xl text-white/85">
            Liiska koorasooyinka Eng_omar — soo dooro kan kuu haboon.
          </p>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {isLoading ? (
          <p className="text-center text-muted-foreground">Soo gelinaya...</p>
        ) : !data || data.length === 0 ? (
          <p className="text-center text-muted-foreground">Wali ma jiraan koorasooyin la gelinay.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {data.map((c) => <CourseCard key={c.id} c={c} />)}
          </div>
        )}
      </section>
    </Layout>
  );
}
