import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { AuthProvider } from "@/lib/auth";
import { Toaster } from "@/components/ui/sonner";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-brand-gradient">404</h1>
        <h2 className="mt-4 text-xl font-semibold">Bogga lama helin</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Bogga aad raadinayso ma jiro ama waa la beddelay.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-brand-gradient px-4 py-2 text-sm font-medium text-brand-foreground shadow-elegant transition hover:scale-105"
          >
            Ku noqo bogga hore
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold">Khalad ayaa dhacay</h1>
        <p className="mt-2 text-sm text-muted-foreground">Fadlan mar kale isku day.</p>
        <div className="mt-6 flex justify-center gap-2">
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="rounded-md bg-brand-gradient px-4 py-2 text-sm font-medium text-brand-foreground"
          >
            Mar kale isku day
          </button>
          <a href="/" className="rounded-md border border-border bg-background px-4 py-2 text-sm font-medium">
            Bogga hore
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Eng_omar" },
      { name: "description", content: "Eng_omar — barnaamijyo waxbarasho oo casri ah: Code, Video Editing iyo AI af Soomaali." },
      { property: "og:title", content: "Eng_omar" },
      { property: "og:description", content: "Eng_omar — barnaamijyo waxbarasho oo casri ah: Code, Video Editing iyo AI af Soomaali." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Eng_omar" },
      { name: "twitter:description", content: "Eng_omar — barnaamijyo waxbarasho oo casri ah: Code, Video Editing iyo AI af Soomaali." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/3103e920-ab1b-4fb4-b4a4-3a7ac04cfaf7/id-preview-112eb8ec--09734f3b-2b59-47be-a4c8-9eac1ae87657.lovable.app-1781182905739.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/3103e920-ab1b-4fb4-b4a4-3a7ac04cfaf7/id-preview-112eb8ec--09734f3b-2b59-47be-a4c8-9eac1ae87657.lovable.app-1781182905739.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@600;700;800&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="so">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Outlet />
        <Toaster richColors position="top-center" />
      </AuthProvider>
    </QueryClientProvider>
  );
}
