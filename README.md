# Larry VA Portfolio

Professional React + Vite + Tailwind CSS portfolio website for **Larry Abistano Dela Cruz Jr.**, positioned as a **Virtual Assistant specializing in Data Management, Dashboard Support, and Admin Support**.

## Stack

- React + Vite
- Tailwind CSS
- Responsive single-page layout
- GitHub Pages ready

## Local setup

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Create a production build:

```bash
npm run build
```

4. Preview the production build locally:

```bash
npm run preview
```

## Customization notes

- Update editable portfolio content in `src/data/siteContent.js`.
- Replace placeholder contact links in `src/data/siteContent.js`.
- Add real screenshots later by replacing the mockup components or adding image assets.
- A full-stack POS sample project is included at `sample-projects/quickbite-pos`.
- The contact form supports a frontend-only Formspree integration. Copy `.env.example` to `.env.local` and set `VITE_FORMSPREE_ENDPOINT` if you want messages delivered directly from the website.
- The contact form now includes a hidden Formspree `_gotcha` honeypot field for basic bot filtering. For stronger spam protection, also enable reCAPTCHA and `Restrict to Domain` in your Formspree dashboard.

## Tailwind setup

Tailwind is already configured through:

- `tailwind.config.js`
- `postcss.config.js`
- `src/index.css`

## GitHub Pages deployment

This project includes a GitHub Actions workflow at `.github/workflows/deploy.yml`.

### Recommended deployment steps

1. Push this project to a GitHub repository.
2. In GitHub, open `Settings > Pages`.
3. Set the source to **GitHub Actions**.
4. Push to the `main` branch to trigger deployment.

### Notes

- `vite.config.js` is already configured for this repository's GitHub Pages path: `/LADC-Portfolio/`.
- Local development keeps the normal `/` base while production builds use the GitHub Pages repo path.
