import { ArrowLeft, LayoutDashboard } from "lucide-react";
import type { StudioProjectSample } from "../types/studio";

export function ProjectHeader({ project }: { project: StudioProjectSample }) {
  return (
    <div className="project-header">
      <div>
        <a href="/projects" className="back-link"><ArrowLeft size={15} /> Back to projects</a>
        <div className="project-heading">
          <span className="project-heading__monogram">PP</span>
          <span>PRESSPILOT STUDIO</span>
        </div>
        <h2>{project.name}</h2>
        <p>Project ID: {project.id}</p>
      </div>
      <div className="project-actions">
        <div className="status-lockup"><span>Status</span><strong>Draft</strong></div>
        <a className="button button--quiet" href="/projects"><LayoutDashboard size={16} /> Project dashboard</a>
      </div>
    </div>
  );
}
