import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// base './' lets the built site work from any sub-path (GitHub Pages, Netlify, Vercel).
export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss()],
});
