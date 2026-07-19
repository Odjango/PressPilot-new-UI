import { useEffect, useRef, useState } from "react";
import { AmbientBackground } from "./components/AmbientBackground";
import { CustomizationPanel } from "./components/CustomizationPanel";
import { DownloadWorkspace } from "./components/DownloadWorkspace";
import { ProjectHeader } from "./components/ProjectHeader";
import { ReviewWorkspace } from "./components/ReviewWorkspace";
import { StepProgress } from "./components/StepProgress";
import { StudioActionBar } from "./components/StudioActionBar";
import { StudioHeader } from "./components/StudioHeader";
import { WebsitePreview } from "./components/WebsitePreview";
import { defaultProject } from "./data/sampleProjects";
import { getStepsForFlow } from "./data/studioFlow";
import type { StudioFlowState, StudioProjectSample } from "./types/studio";

export default function App() {
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
  const [flow, setFlow] = useState<StudioFlowState>("customize");
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
  const steps = getStepsForFlow(flow);

  const workspace = flow === "customize" ? (
    <>
      <div className="refine-workspace">
        <CustomizationPanel project={project} onChange={handleChange} />
        <WebsitePreview project={project} isUpdating={isUpdating} />
      </div>
      <StudioActionBar onReview={() => setFlow("review")} />
    </>
  ) : flow === "review" || flow === "building" ? (
    <ReviewWorkspace
      project={project}
      onCreate={() => setFlow("building")}
      onBack={() => setFlow("customize")}
      onEdit={() => setFlow("customize")}
      building={flow === "building"}
      onBuildComplete={() => setFlow("download")}
    />
  ) : (
    <DownloadWorkspace
      project={project}
      onBack={() => setFlow("review")}
      onRestart={() => setFlow("customize")}
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
