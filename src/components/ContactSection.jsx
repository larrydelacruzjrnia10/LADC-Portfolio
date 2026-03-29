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

              <div className="mt-8 grid gap-4">
                {contactContent.methods.map((method) => {
                  const isMailLink = method.href.startsWith('mailto:');
                  const isPlaceholder = method.href === '#';

                  return (
                    <a
                      key={method.label}
                      href={method.href}
                      target={!isMailLink && !isPlaceholder ? '_blank' : undefined}
                      rel={!isMailLink && !isPlaceholder ? 'noreferrer' : undefined}
                      onClick={isPlaceholder ? (event) => event.preventDefault() : undefined}
                      className="group min-w-0 rounded-[1.4rem] border border-white/10 bg-white/[0.03] p-5 transition duration-300 hover:-translate-y-1 hover:border-brand-400/30 hover:shadow-soft"
                    >
                      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-200">{method.label}</p>
                      <div className="mt-3 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
                        <p className="min-w-0 break-all text-base font-semibold text-white">{method.value}</p>
                        <span className="rounded-full bg-brand-400/10 px-3 py-1 text-sm text-brand-100 transition duration-300 group-hover:bg-brand-400/20">
                          {isPlaceholder ? 'Add Link' : 'Open'}
                        </span>
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>

            <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-5 sm:p-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <input
                  type="text"
                  placeholder="Full Name"
                  className="rounded-[1rem] border border-white/10 bg-slate-950/50 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-brand-400 focus:outline-none"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  className="rounded-[1rem] border border-white/10 bg-slate-950/50 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-brand-400 focus:outline-none"
                />
                <input
                  type="text"
                  placeholder="Mobile Number"
                  className="rounded-[1rem] border border-white/10 bg-slate-950/50 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-brand-400 focus:outline-none"
                />
                <input
                  type="text"
                  placeholder="Email Subject"
                  className="rounded-[1rem] border border-white/10 bg-slate-950/50 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-brand-400 focus:outline-none"
                />
              </div>

              <textarea
                rows="8"
                placeholder="Your Message"
                className="mt-4 w-full rounded-[1rem] border border-white/10 bg-slate-950/50 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-brand-400 focus:outline-none"
              />

              <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="max-w-lg text-sm leading-7 text-slate-400">
                  This contact panel is a portfolio-style UI. Use the email button below or the profile links on the left to reach Larry directly.
                </p>
                <ActionButton href={contactContent.methods[0].href} className="w-full sm:w-auto">
                  Send Message
                </ActionButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;
