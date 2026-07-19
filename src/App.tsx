import { useEffect, useRef, useState } from "react";
import { AmbientBackground } from "./components/AmbientBackground";
import { BusinessDetailsWorkspace } from "./components/BusinessDetailsWorkspace";
import { CustomizationPanel } from "./components/CustomizationPanel";
import { DownloadWorkspace } from "./components/DownloadWorkspace";
import { LayoutChooserWorkspace } from "./components/LayoutChooserWorkspace";
import { MarketingHome } from "./components/MarketingHome";
import { PricingPage } from "./components/PricingPage";
import { ProjectsPage } from "./components/ProjectsPage";
import { SignInPage } from "./components/SignInPage";
import { ProjectHeader } from "./components/ProjectHeader";
import { ReviewWorkspace } from "./components/ReviewWorkspace";
import { StepProgress } from "./components/StepProgress";
import { StudioActionBar } from "./components/StudioActionBar";
import { StudioHeader } from "./components/StudioHeader";
import { WebsitePreview } from "./components/WebsitePreview";
import { defaultProject } from "./data/sampleProjects";
import { getStepsForFlow } from "./data/studioFlow";
import { resolveAppRoute, resolveStudioStep } from "./routing";
import type { StudioFlowState, StudioProjectSample } from "./types/studio";

function StudioPrototype() {
  const [project, setProject] = useState(() => {
    const rtlRequested = typeof window !== "undefined" && new URLSearchParams(window.location.search).get("dir") === "rtl";
    return rtlRequested ? {
      ...defaultProject,
      name: "متجر أميغو",
      description: "وجهة منتقاة للأزياء الرجالية الخالدة، والعلامات المستقلة، وأناقة الحياة اليومية.",
      headline: "أناقة تبقى معك.",
      language: "Arabic",
      direction: "rtl" as const,
    } : defaultProject;
  });
  const [flow, setFlow] = useState<StudioFlowState>(() => resolveStudioStep(window.location.search));
  const [isUpdating, setIsUpdating] = useState(false);
  const initialized = useRef(false);
  const downloadHeadingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!initialized.current) { initialized.current = true; return; }
    setIsUpdating(true);
    const timeout = window.setTimeout(() => setIsUpdating(false), 220);
    return () => window.clearTimeout(timeout);
  }, [project]);

  useEffect(() => {
    if (flow === "download") downloadHeadingRef.current?.focus();
  }, [flow]);

  useEffect(() => {
    document.documentElement.dir = project.direction;
    document.documentElement.lang = project.direction === "rtl" ? "ar" : "en";
  }, [project.direction]);

  const handleChange = (next: StudioProjectSample) => setProject(next);
  const navigateToFlow = (next: StudioFlowState) => {
    const params = new URLSearchParams(window.location.search);
    params.set("step", next);
    window.history.pushState({}, "", `${window.location.pathname}?${params.toString()}`);
    setFlow(next);
  };
  const steps = getStepsForFlow(flow);

  const workspace = flow === "details" ? <BusinessDetailsWorkspace project={project} onChange={handleChange} onContinue={() => navigateToFlow("layout")} /> : flow === "layout" ? <LayoutChooserWorkspace project={project} onChange={handleChange} onBack={() => navigateToFlow("details")} onContinue={() => navigateToFlow("customize")} /> : flow === "customize" ? (
    <>
      <div className="refine-workspace">
        <CustomizationPanel project={project} onChange={handleChange} onLayout={() => navigateToFlow("layout")} />
        <WebsitePreview project={project} isUpdating={isUpdating} />
      </div>
      <StudioActionBar onBack={() => navigateToFlow("layout")} onReview={() => navigateToFlow("review")} />
    </>
  ) : flow === "review" || flow === "building" ? (
    <ReviewWorkspace
      project={project}
      onCreate={() => navigateToFlow("building")}
      onBack={() => navigateToFlow("customize")}
      onEdit={() => navigateToFlow("customize")}
      building={flow === "building"}
      onBuildComplete={() => navigateToFlow("download")}
    />
  ) : (
    <DownloadWorkspace
      project={project}
      onBack={() => navigateToFlow("review")}
      onRestart={() => navigateToFlow("layout")}
      headingRef={downloadHeadingRef}
    />
  );

  return (
    <div className="app-shell">
      <a className="skip-link" href="#studio-workspace">Skip to Studio workspace</a>
      <AmbientBackground />
      <StudioHeader />
      <main className="studio-page" id="studio-workspace" tabIndex={-1}>
        <ProjectHeader project={project} />
        <StepProgress steps={steps} />
        {workspace}
      </main>
    </div>
  );
}

export default function App() {
  const route = resolveAppRoute(window.location.pathname);
  if (route === "studio") return <StudioPrototype />;
  if (route === "pricing") return <PricingPage />;
  if (route === "signin") return <SignInPage />;
  if (route === "projects") return <ProjectsPage />;
  return <MarketingHome />;
}
