import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { CATEGORIES } from "@/lib/site";
import { CourseCard, useCourses } from "./courses";
import codingImg from "@/assets/cat-coding.jpg";

export const Route = createFileRoute("/coding")({
  head: () => ({
    meta: [
      { title: "Code — Eng_omar" },
      { name: "description", content: "Koorasooyinka Code-ka ee Eng_omar." },
    ],
  }),
  component: () => <CategoryPage cat="coding" img={codingImg} />,
});

export function CategoryPage({ cat, img }: { cat: keyof typeof CATEGORIES; img: string }) {
  const meta = CATEGORIES[cat];
  const { data, isLoading } = useCourses(meta.key);
  return (
    <Layout>
      <section className="relative overflow-hidden bg-hero-gradient py-16 text-white">
        <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div className="animate-fade-in-up">
            <span className="rounded-full bg-white/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider">
              {meta.short}
            </span>
            <h1 className="mt-4 font-display text-4xl font-bold sm:text-5xl">{meta.label}</h1>
            <p className="mt-3 max-w-lg text-white/85">{meta.desc}</p>
          </div>
          <img src={img} alt={meta.label} loading="lazy" className="rounded-2xl shadow-elegant ring-1 ring-white/20" />
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="font-display text-2xl font-bold">Koorasooyinka {meta.short}</h2>
        <div className="mt-6">
          {isLoading ? (
            <p className="text-muted-foreground">Soo gelinaya...</p>
          ) : !data || data.length === 0 ? (
            <p className="text-muted-foreground">Wali ma jiraan koorasooyin la gelinay qaybtan.</p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {data.map((c) => <CourseCard key={c.id} c={c} />)}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
