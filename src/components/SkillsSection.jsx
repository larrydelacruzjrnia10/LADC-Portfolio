import SectionHeader from './SectionHeader';
import SkillGroup from './SkillGroup';
import { skillGroups } from '../data/siteContent';

function SkillsSection() {
  const [featuredGroup, ...secondaryGroups] = skillGroups;

  return (
    <section id="skills" className="scroll-mt-28">
      <div className="section-shell">
        <SectionHeader
          eyebrow="Skills"
          title="A practical blend of data support, admin coordination, and dashboard-ready organization."
          description="Larry's skill set is tailored for clients and teams that need accurate records, dependable follow-through, and clear operational support."
          align="center"
        />

        <div className="mt-12 grid gap-6 xl:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
          {featuredGroup ? <SkillGroup {...featuredGroup} featured /> : null}

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-1">
            {secondaryGroups.map((group) => (
              <SkillGroup key={group.title} {...group} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default SkillsSection;
