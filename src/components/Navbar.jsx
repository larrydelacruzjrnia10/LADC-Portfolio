import { useState } from 'react';
import ActionButton from './ActionButton';

function Navbar({ links, activeSection }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 px-3 pt-3 sm:px-6 sm:pt-4 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div
          className={`gradient-border px-4 py-3 shadow-soft backdrop-blur-md transition-all sm:px-5 ${
            isOpen ? 'rounded-[1.75rem]' : 'rounded-full'
          }`}
        >
          <div className="flex items-center justify-between gap-4">
            <a className="min-w-0" href="#home" onClick={() => setIsOpen(false)}>
              <p className="truncate text-xs font-semibold uppercase tracking-[0.16em] text-brand-200 sm:text-sm sm:tracking-[0.25em]">
                Larry A. Dela Cruz Jr.
              </p>
              <p className="hidden truncate text-xs text-slate-400 sm:block">Virtual Assistant Portfolio</p>
            </a>

            <button
              type="button"
              className="inline-flex rounded-full border border-white/10 bg-white/5 p-2 text-brand-200 md:hidden"
              onClick={() => setIsOpen((current) => !current)}
              aria-label="Toggle navigation menu"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current stroke-[1.8]">
                <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
              </svg>
            </button>

            <nav className="hidden items-center gap-1 md:flex">
              {links.map((link) => {
                const sectionId = link.href.slice(1);
                const isActive = activeSection === sectionId;

                return (
                  <a
                    key={link.href}
                    href={link.href}
                    className={`nav-link ${isActive ? 'nav-link-active' : ''}`}
                  >
                    {link.label}
                  </a>
                );
              })}
            </nav>

            <ActionButton href="#contact" className="hidden md:inline-flex">
              Let&apos;s Talk
            </ActionButton>
          </div>

          {isOpen ? (
            <nav className="mt-4 grid gap-2 border-t border-white/10 pt-4 md:hidden">
              {links.map((link) => {
                const sectionId = link.href.slice(1);
                const isActive = activeSection === sectionId;

                return (
                  <a
                    key={link.href}
                    href={link.href}
                    className={`nav-link text-center ${isActive ? 'nav-link-active' : ''}`}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </a>
                );
              })}
              <ActionButton
                href="#contact"
                className="mt-2 w-full"
                variant="secondary"
                onClick={() => setIsOpen(false)}
              >
                Contact Larry
              </ActionButton>
            </nav>
          ) : null}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
