import { useState } from 'react';
import SectionHeader from './SectionHeader';
import { contactContent } from '../data/siteContent';

const FORMSPREE_ENDPOINT = import.meta.env.VITE_FORMSPREE_ENDPOINT || '';

const initialFormState = {
  fullName: '',
  email: '',
  mobileNumber: '',
  subject: '',
  message: '',
};

function buildMailtoLink(emailAddress, formState) {
  const fallbackSubject = formState.subject.trim() || 'Portfolio Inquiry';
  const body = [
    `Full Name: ${formState.fullName || '-'}`,
    `Email Address: ${formState.email || '-'}`,
    `Mobile Number: ${formState.mobileNumber || '-'}`,
    '',
    formState.message || '',
  ].join('\n');

  return `mailto:${emailAddress}?subject=${encodeURIComponent(fallbackSubject)}&body=${encodeURIComponent(body)}`;
}

function ContactSection() {
  const [formState, setFormState] = useState(initialFormState);
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const emailMethod = contactContent.methods.find((method) => method.href.startsWith('mailto:'));
  const emailAddress = emailMethod?.href.replace(/^mailto:/, '') || '';

  function handleChange(event) {
    const { name, value } = event.target;
    setFormState((current) => ({
      ...current,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!formState.fullName.trim() || !formState.email.trim() || !formState.message.trim()) {
      setStatus({
        type: 'error',
        message: 'Please fill in your name, email address, and message before sending.',
      });
      return;
    }

    if (!emailAddress) {
      setStatus({
        type: 'error',
        message: 'No destination email is configured yet.',
      });
      return;
    }

    setIsSubmitting(true);
    setStatus({ type: '', message: '' });

    if (FORMSPREE_ENDPOINT) {
      const payload = new FormData();
      payload.append('fullName', formState.fullName);
      payload.append('email', formState.email);
      payload.append('_replyto', formState.email);
      payload.append('mobileNumber', formState.mobileNumber);
      payload.append('subject', formState.subject || 'Portfolio Inquiry');
      payload.append('message', formState.message);
      payload.append('_subject', formState.subject || 'Portfolio Inquiry');

      try {
        const response = await fetch(FORMSPREE_ENDPOINT, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
          },
          body: payload,
        });

        if (!response.ok) {
          throw new Error('Form submission failed.');
        }

        setFormState(initialFormState);
        setStatus({
          type: 'success',
          message: 'Your message was sent successfully.',
        });
      } catch {
        setStatus({
          type: 'error',
          message: 'Unable to send right now. Please try the email link on the left.',
        });
      } finally {
        setIsSubmitting(false);
      }

      return;
    }

    window.location.href = buildMailtoLink(emailAddress, formState);
    setStatus({
      type: 'info',
      message: 'Opening your email app with a prefilled draft.',
    });
    setIsSubmitting(false);
  }

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

            <form
              className="rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-5 sm:p-6"
              onSubmit={handleSubmit}
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <input
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                  value={formState.fullName}
                  onChange={handleChange}
                  className="rounded-[1rem] border border-white/10 bg-slate-950/50 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-brand-400 focus:outline-none"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formState.email}
                  onChange={handleChange}
                  className="rounded-[1rem] border border-white/10 bg-slate-950/50 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-brand-400 focus:outline-none"
                />
                <input
                  type="text"
                  name="mobileNumber"
                  placeholder="Mobile Number"
                  value={formState.mobileNumber}
                  onChange={handleChange}
                  className="rounded-[1rem] border border-white/10 bg-slate-950/50 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-brand-400 focus:outline-none"
                />
                <input
                  type="text"
                  name="subject"
                  placeholder="Email Subject"
                  value={formState.subject}
                  onChange={handleChange}
                  className="rounded-[1rem] border border-white/10 bg-slate-950/50 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-brand-400 focus:outline-none"
                />
              </div>

              <textarea
                rows="8"
                name="message"
                placeholder="Your Message"
                value={formState.message}
                onChange={handleChange}
                className="mt-4 w-full rounded-[1rem] border border-white/10 bg-slate-950/50 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-brand-400 focus:outline-none"
              />

              {status.message ? (
                <div
                  className={`mt-4 rounded-[1rem] border px-4 py-3 text-sm ${
                    status.type === 'success'
                      ? 'border-mint-400/30 bg-mint-400/10 text-mint-100'
                      : status.type === 'error'
                        ? 'border-red-400/30 bg-red-400/10 text-red-100'
                        : 'border-brand-400/30 bg-brand-400/10 text-brand-100'
                  }`}
                >
                  {status.message}
                </div>
              ) : null}

              <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="max-w-lg text-sm leading-7 text-slate-400">
                  {FORMSPREE_ENDPOINT
                    ? "Messages submitted here are sent from the site contact form to Larry's inbox."
                    : 'This form currently opens a prefilled email draft. Add a Formspree endpoint later to send directly from the website.'}
                </p>
                <button type="submit" className="button-primary w-full sm:w-auto" disabled={isSubmitting}>
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;
