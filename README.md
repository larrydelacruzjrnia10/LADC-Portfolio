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

- Update editable portfolio content in [src/data/siteContent.js](/c:/Users/EOD/Documents/PORTFOLIO/src/data/siteContent.js).
- Replace placeholder contact links in [src/data/siteContent.js](/c:/Users/EOD/Documents/PORTFOLIO/src/data/siteContent.js).
- Add real screenshots later by replacing the mockup components or adding image assets.

## Tailwind setup

Tailwind is already configured through:

- [tailwind.config.js](/c:/Users/EOD/Documents/PORTFOLIO/tailwind.config.js)
- [postcss.config.js](/c:/Users/EOD/Documents/PORTFOLIO/postcss.config.js)
- [src/index.css](/c:/Users/EOD/Documents/PORTFOLIO/src/index.css)

## GitHub Pages deployment

This project includes a GitHub Actions workflow at [.github/workflows/deploy.yml](/c:/Users/EOD/Documents/PORTFOLIO/.github/workflows/deploy.yml).

### Recommended deployment steps

1. Push this project to a GitHub repository.
2. In GitHub, open `Settings > Pages`.
3. Set the source to **GitHub Actions**.
4. Push to the `main` branch to trigger deployment.

### Notes

- `vite.config.js` uses `base: './'`, which works well for GitHub Pages static deployment.
- If you later want a repo-specific base path, change `base` in [vite.config.js](/c:/Users/EOD/Documents/PORTFOLIO/vite.config.js).
