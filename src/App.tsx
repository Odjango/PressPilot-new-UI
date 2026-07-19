import { useEffect, useRef, useState } from "react";
import { AmbientBackground } from "./components/AmbientBackground";
import { CustomizationPanel } from "./components/CustomizationPanel";
import { ProjectHeader } from "./components/ProjectHeader";
import { StepProgress } from "./components/StepProgress";
import { StudioActionBar } from "./components/StudioActionBar";
import { StudioHeader } from "./components/StudioHeader";
import { WebsitePreview } from "./components/WebsitePreview";
import { defaultProject } from "./data/sampleProjects";
import type { StudioProjectSample } from "./types/studio";

export default function App() {
  const [project, setProject] = useState(defaultProject);
  const [isUpdating, setIsUpdating] = useState(false);
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) { initialized.current = true; return; }
    setIsUpdating(true);
    const timeout = window.setTimeout(() => setIsUpdating(false), 220);
    return () => window.clearTimeout(timeout);
  }, [project]);

  const handleChange = (next: StudioProjectSample) => setProject(next);

  return (
    <div className="app-shell">
      <AmbientBackground />
      <StudioHeader />
      <main className="studio-page">
        <ProjectHeader project={project} />
        <StepProgress steps={project.steps} />
        <div className="refine-workspace">
          <CustomizationPanel project={project} onChange={handleChange} />
          <WebsitePreview project={project} isUpdating={isUpdating} />
        </div>
        <StudioActionBar />
      </main>
    </div>
  );
}
