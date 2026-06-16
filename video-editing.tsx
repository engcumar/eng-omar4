import { createFileRoute, Link } from "@tanstack/react-router";
import { CategoryPage } from "./coding";
import videoImg from "@/assets/cat-video.jpg";
import { Button } from "@/components/ui/button";
import { GraduationCap } from "lucide-react";

export const Route = createFileRoute("/video-editing")({
  head: () => ({
    meta: [
      { title: "Video Editing — Eng_omar" },
      { name: "description", content: "Koorasooyinka Video Editing-ka ee Eng_omar." },
    ],
  }),
  component: VideoEditingPage,
});

function VideoEditingPage() {
  return (
    <>
      <CategoryPage cat="video_editing" img={videoImg} />
      <section className="mx-auto -mt-8 max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-3xl border border-border bg-hero-gradient p-6 text-white shadow-elegant sm:p-10">
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
            <div>
              <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider">
                Koorso Cusub
              </span>
              <h3 className="mt-3 font-display text-2xl font-bold sm:text-3xl">
                Course Basic Video Editing — CapCut
              </h3>
              <p className="mt-2 max-w-xl text-white/85">
                10 module, layliyo, imtixaano iyo shahaado. Laga bilaabo bilow ilaa heer xirfadeed.
              </p>
            </div>
            <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90">
              <Link to="/enroll/capcut">
                <GraduationCap className="h-5 w-5" /> Fur Koorsada
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
