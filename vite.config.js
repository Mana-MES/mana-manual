import { defineConfig } from 'vite'
import { viteStaticCopy } from 'vite-plugin-static-copy'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    viteStaticCopy({
      targets: [
        { src: 'artwork', dest: '.' },
        { src: 'mana_logo.png', dest: '.' },
        { src: 'IBM_Plex_Sans_Thai', dest: '.' },
        { src: 'Inclusive_Sans', dest: '.' }
      ]
    })
  ],
  server: {
    host: '0.0.0.0', // Allow all external connections
    port: 5173,
    strictPort: false,
    // Allow all hosts for development (less secure but works with ngrok)
    allowedHosts: 'all'
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    // Ensure proper handling of static assets
    rollupOptions: {
      input: {
        main: './index.html',
        'user-manual': './user-manual.html',
        'setup-master-data': './manuals/01-setup-master-data.html',
        'running-production': './manuals/02-running-production.html',
        'monitoring': './manuals/03-monitoring.html',
        'editing-data': './manuals/04-editing-data.html',
        'system-overview': './manuals/05-system-overview.html'
      }
    }
  }
})
