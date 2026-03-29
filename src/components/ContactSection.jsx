import { useEffect, useState } from 'react';
import SectionHeader from './SectionHeader';
import { contactContent } from '../data/siteContent';

const FORMSPREE_ENDPOINT = import.meta.env.VITE_FORMSPREE_ENDPOINT || '';
const MIN_SUBMIT_DELAY_MS = 3500;
const SUCCESS_RESET_MS = 5000;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const URL_PATTERN = /(?:https?:\/\/|www\.)[^\s]+/gi;
const SUSPICIOUS_URL_PATTERN =
  /(?:bit\.ly|tinyurl\.com|t\.co|goo\.gl|rb\.gy|rebrand\.ly|cutt\.ly|is\.gd|buff\.ly|grabify|ngrok|discord\.gg|telegram\.me|wa\.me|\.ru\b|\.cn\b|\.tk\b|\.xyz\b|\.click\b|\.top\b|\.shop\b)/i;

const initialFormState = {
  fullName: '',
  email: '',
  mobileNumber: '',
  subject: '',
  message: '',
  _gotcha: '',
};

const initialTouchedState = {
  fullName: false,
  email: false,
  mobileNumber: false,
  subject: false,
  message: false,
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

function getUrlChecks(text) {
  const detectedUrls = text.match(URL_PATTERN) || [];

  if (detectedUrls.length > 2) {
    return 'Please remove extra links and keep your message focused on your inquiry.';
  }

  if (detectedUrls.some((url) => SUSPICIOUS_URL_PATTERN.test(url))) {
    return 'Please remove shortened or suspicious links before sending your message.';
  }

  return '';
}

function getFieldErrors(formState, delayPassed) {
  const subjectUrlMessage = getUrlChecks(formState.subject);
  const messageUrlMessage = getUrlChecks(formState.message);

  return {
    fullName: formState.fullName.trim() ? '' : 'Full name is required.',
    email: !formState.email.trim()
      ? 'Email address is required.'
      : EMAIL_PATTERN.test(formState.email.trim())
        ? ''
        : 'Please enter a valid email address.',
    mobileNumber: '',
    subject: subjectUrlMessage,
    message: !formState.message.trim()
      ? 'Message is required.'
      : messageUrlMessage,
    form: !delayPassed ? 'Please wait a moment before sending.' : '',
  };
}

function getInputClassName(hasError) {
  return `rounded-[1rem] border bg-slate-950/50 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none ${
    hasError
      ? 'border-red-400/50 bg-red-500/[0.06] focus:border-red-400'
      : 'border-white/10 focus:border-brand-400'
  }`;
}

function ContactSection() {
  const [formState, setFormState] = useState(initialFormState);
  const [touchedFields, setTouchedFields] = useState(initialTouchedState);
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [delayPassed, setDelayPassed] = useState(false);
  const [submitAttempted, setSubmitAttempted] = useState(false);

  const emailMethod = contactContent.methods.find((method) => method.href.startsWith('mailto:'));
  const emailAddress = emailMethod?.href.replace(/^mailto:/, '') || '';
  const fieldErrors = getFieldErrors(formState, delayPassed);
  const requiredFieldsFilled =
    formState.fullName.trim() !== '' && formState.email.trim() !== '' && formState.message.trim() !== '';
  const hasBlockingFieldErrors = Boolean(fieldErrors.fullName || fieldErrors.email || fieldErrors.subject || fieldErrors.message);
  const canSubmit = requiredFieldsFilled && !hasBlockingFieldErrors && delayPassed && !isSubmitting;

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setDelayPassed(true);
    }, MIN_SUBMIT_DELAY_MS);

    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (status.type !== 'success') {
      return undefined;
    }

    const timer = window.setTimeout(() => {
      setStatus({ type: '', message: '' });
    }, SUCCESS_RESET_MS);

    return () => window.clearTimeout(timer);
  }, [status.type]);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormState((current) => ({
      ...current,
      [name]: value,
    }));

    if (name in initialTouchedState) {
      setTouchedFields((current) => ({
        ...current,
        [name]: true,
      }));
    }
  }

  function handleBlur(event) {
    const { name } = event.target;

    if (name in initialTouchedState) {
      setTouchedFields((current) => ({
        ...current,
        [name]: true,
      }));
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitAttempted(true);

    if (fieldErrors.fullName || fieldErrors.email || fieldErrors.subject || fieldErrors.message) {
      setStatus({
        type: 'error',
        message: fieldErrors.fullName || fieldErrors.email || fieldErrors.subject || fieldErrors.message,
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

    if (formState._gotcha.trim()) {
      setFormState(initialFormState);
      setTouchedFields(initialTouchedState);
      setStatus({
        type: 'success',
        message: 'Your message was sent successfully.',
      });
      return;
    }

    if (!delayPassed) {
      setStatus({
        type: 'error',
        message: 'Please wait a moment before sending your message.',
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
      payload.append('_gotcha', formState._gotcha);
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
        setTouchedFields(initialTouchedState);
        setSubmitAttempted(false);
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

  const showFieldError = (fieldName) => Boolean((submitAttempted || touchedFields[fieldName]) && fieldErrors[fieldName]);

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
              <div className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
                <label htmlFor="contact-company">Leave this field empty</label>
                <input
                  id="contact-company"
                  type="text"
                  name="_gotcha"
                  tabIndex="-1"
                  autoComplete="off"
                  value={formState._gotcha}
                  onChange={handleChange}
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <input
                    type="text"
                    name="fullName"
                    placeholder="Full Name"
                    value={formState.fullName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    aria-invalid={showFieldError('fullName')}
                    className={getInputClassName(showFieldError('fullName'))}
                  />
                  {showFieldError('fullName') ? (
                    <p className="mt-2 text-xs text-red-200">{fieldErrors.fullName}</p>
                  ) : null}
                </div>

                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formState.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    aria-invalid={showFieldError('email')}
                    className={getInputClassName(showFieldError('email'))}
                  />
                  {showFieldError('email') ? <p className="mt-2 text-xs text-red-200">{fieldErrors.email}</p> : null}
                </div>

                <div>
                  <input
                    type="text"
                    name="mobileNumber"
                    placeholder="Mobile Number"
                    value={formState.mobileNumber}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={getInputClassName(false)}
                  />
                </div>

                <div>
                  <input
                    type="text"
                    name="subject"
                    placeholder="Email Subject"
                    value={formState.subject}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    aria-invalid={showFieldError('subject')}
                    className={getInputClassName(showFieldError('subject'))}
                  />
                  {showFieldError('subject') ? (
                    <p className="mt-2 text-xs text-red-200">{fieldErrors.subject}</p>
                  ) : null}
                </div>
              </div>

              <div className="mt-4">
                <textarea
                  rows="8"
                  name="message"
                  placeholder="Your Message"
                  value={formState.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  aria-invalid={showFieldError('message')}
                  className={`w-full rounded-[1rem] border bg-slate-950/50 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none ${
                    showFieldError('message')
                      ? 'border-red-400/50 bg-red-500/[0.06] focus:border-red-400'
                      : 'border-white/10 focus:border-brand-400'
                  }`}
                />
                {showFieldError('message') ? (
                  <p className="mt-2 text-xs text-red-200">{fieldErrors.message}</p>
                ) : null}
              </div>

              <div className="mt-4 rounded-[1rem] border border-dashed border-brand-400/30 bg-brand-400/[0.05] p-4">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm font-semibold text-brand-100">reCAPTCHA-ready area</p>
                    <p className="mt-1 text-xs leading-6 text-slate-400">
                      Reserved space for a future reCAPTCHA or Turnstile widget if you want stronger bot protection later.
                    </p>
                  </div>
                  <span className="rounded-full border border-brand-400/25 bg-brand-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand-100">
                    Future Upgrade
                  </span>
                </div>
              </div>

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

              {!status.message && submitAttempted && fieldErrors.form ? (
                <div className="mt-4 rounded-[1rem] border border-brand-400/20 bg-brand-400/8 px-4 py-3 text-sm text-brand-100">
                  {fieldErrors.form}
                </div>
              ) : null}

              <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="max-w-lg text-sm leading-7 text-slate-400">
                  {FORMSPREE_ENDPOINT
                    ? "Messages submitted here are sent from the site contact form to Larry's inbox. A hidden honeypot field, suspicious-link filter, and short submit delay are also enabled for basic bot filtering."
                    : 'This form currently opens a prefilled email draft. Add a Formspree endpoint later to send directly from the website.'}
                </p>
                <button
                  type="submit"
                  className={`button-primary w-full sm:w-auto ${!canSubmit ? 'cursor-not-allowed opacity-60' : ''}`}
                  disabled={!canSubmit}
                >
                  {isSubmitting ? 'Sending...' : !delayPassed && requiredFieldsFilled && !hasBlockingFieldErrors ? 'Please Wait...' : 'Send Message'}
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
