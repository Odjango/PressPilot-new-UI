import { ArrowRight, Clock3, Download, LayoutDashboard, Plus, Settings2 } from "lucide-react";
import { AmbientBackground } from "./AmbientBackground";
import { StudioHeader } from "./StudioHeader";
import { dashboardProjects } from "../data/projectDashboard";

export function ProjectsPage() {
  return <div className="app-shell dashboard-shell">
    <a className="skip-link" href="#projects-content">Skip to projects</a>
    <AmbientBackground />
    <StudioHeader />
    <main className="projects-page" id="projects-content" tabIndex={-1}>
      <header className="projects-heading"><div><p>PressPilot dashboard</p><h1>Your websites</h1><span>Continue a project or start with a new business brief.</span></div><a className="primary-action" href="/studio?step=details"><Plus size={17} /> Start a new website</a></header>
      <section className="dashboard-summary" aria-label="Project summary">
        <div><LayoutDashboard size={18} /><span><strong>3</strong> websites</span></div>
        <div><Clock3 size={18} /><span><strong>2</strong> in progress</span></div>
        <div><Download size={18} /><span><strong>1</strong> ready to download</span></div>
      </section>
      <section className="project-atlas" aria-label="Website projects">
        {dashboardProjects.map((project) => <article className="project-card" key={project.id}>
          <div className="project-card__preview"><img src={project.asset} alt="" /><span>{project.progress}</span></div>
          <div className="project-card__body"><div className="project-card__status"><i /> {project.status}</div><h2>{project.name}</h2><p>{project.category}</p><small>Project ID: {project.id}</small><div><a href={project.href}>{project.action} <ArrowRight size={15} /></a><button type="button" aria-label={`Project settings for ${project.name}`}><Settings2 size={16} /></button></div></div>
        </article>)}
      </section>
    </main>
  </div>;
}
