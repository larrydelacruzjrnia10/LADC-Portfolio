import SectionHeader from './SectionHeader';
import ProjectCard from './ProjectCard';
import { projects } from '../data/siteContent';

function ProjectsSection() {
  return (
    <section id="projects" className="scroll-mt-28">
      <div className="section-shell">
        <SectionHeader
          eyebrow="Projects"
          title="Selected work focused on data systems, reporting workflows, and operational visibility."
          description="These sample portfolio pieces show the kind of structured support Larry can bring to reporting environments, dashboard workflows, and admin-heavy systems."
        />

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.title} {...project} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProjectsSection;
