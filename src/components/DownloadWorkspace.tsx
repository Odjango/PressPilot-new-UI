import { ArrowLeft, CheckCircle2, RefreshCw } from "lucide-react";
import type { StudioProjectSample } from "../types/studio";
import { DownloadPackageCard } from "./DownloadPackageCard";
import { InstallGuide } from "./InstallGuide";

interface DownloadWorkspaceProps {
  project: StudioProjectSample;
  onBack: () => void;
  onRestart: () => void;
  headingRef?: React.RefObject<HTMLHeadingElement | null>;
}

export function DownloadWorkspace({ project, onBack, onRestart, headingRef }: DownloadWorkspaceProps) {
  return (
    <section className="download-workspace" aria-labelledby="download-title">
      <header className="download-heading">
        <div className="download-heading__check"><CheckCircle2 size={26} /></div>
        <span>Step 5 of 5</span>
        <h1 id="download-title" ref={headingRef} tabIndex={-1}>Your website is ready</h1>
        <p>The website you reviewed has been packaged and is ready to install.</p>
      </header>
      <div className="download-content">
        <DownloadPackageCard project={project} />
        <InstallGuide />
      </div>
      <footer className="download-actions">
        <button type="button" onClick={onBack}><ArrowLeft size={16} /> Back to review</button>
        <span>Need a different direction?</span>
        <button type="button" onClick={onRestart}><RefreshCw size={15} /> Create another design</button>
      </footer>
    </section>
  );
}
