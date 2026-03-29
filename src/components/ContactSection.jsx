import ActionButton from './ActionButton';
import SectionHeader from './SectionHeader';
import { contactContent } from '../data/siteContent';

function ContactSection() {
  return (
    <section id="contact" className="scroll-mt-28">
      <div className="section-shell pt-10">
        <div className="section-card overflow-hidden p-6 sm:p-10">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <SectionHeader
                eyebrow="Contact"
                title={contactContent.heading}
                description={contactContent.description}
              />
              <div className="mt-8">
                <ActionButton href={contactContent.methods[0].href} className="w-full sm:w-auto">
                  Email Larry
                </ActionButton>
              </div>
            </div>

            <div className="grid gap-4">
              {contactContent.methods.map((method) => (
                <a
                  key={method.label}
                  href={method.href}
                  target={method.href.startsWith('mailto:') ? undefined : '_blank'}
                  rel={method.href.startsWith('mailto:') ? undefined : 'noreferrer'}
                  className="group min-w-0 rounded-[1.6rem] border border-slate-200 bg-white/90 p-5 transition duration-300 hover:-translate-y-1 hover:border-brand-300 hover:shadow-soft"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">{method.label}</p>
                  <div className="mt-3 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
                    <p className="min-w-0 break-all text-base font-semibold text-slate-900">{method.value}</p>
                    <span className="rounded-full bg-brand-50 px-3 py-1 text-sm text-brand-700 transition duration-300 group-hover:bg-brand-100">
                      Open
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;
