import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ command }) => ({
  plugins: [react()],
  // Use the repository path for GitHub Pages production builds.
  base: command === 'build' ? '/LADC-Portfolio/' : '/',
}));
