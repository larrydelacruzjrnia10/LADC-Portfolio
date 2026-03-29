import { footerContent } from '../data/siteContent';

function Footer() {
  return (
    <footer className="px-4 pb-8 pt-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl rounded-[1.75rem] border border-white/10 bg-white/[0.04] px-6 py-5 text-center shadow-soft backdrop-blur-md">
        <p className="text-sm text-slate-400">
          &copy; {new Date().getFullYear()} {footerContent.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
