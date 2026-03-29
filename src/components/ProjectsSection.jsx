import SectionHeader from './SectionHeader';
import ProjectCard from './ProjectCard';
import { projects } from '../data/siteContent';

function ProjectsSection() {
  const [featuredProject, ...secondaryProjects] = projects;

  return (
    <section id="projects" className="scroll-mt-28">
      <div className="section-shell">
        <SectionHeader
          eyebrow="Projects"
          title="Selected work focused on data systems, reporting workflows, and operational visibility."
          description="These sample portfolio pieces show the kind of structured support Larry can bring to reporting environments, dashboard workflows, and admin-heavy systems."
        />

        {featuredProject ? <ProjectCard {...featuredProject} featured /> : null}

        <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-6">
          {secondaryProjects.map((project, index) => (
            <ProjectCard
              key={project.title}
              {...project}
              className={index === 0 ? 'md:col-span-2 xl:col-span-2' : 'xl:col-span-2'}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProjectsSection;
