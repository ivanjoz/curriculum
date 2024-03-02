import { defineConfig } from "@solidjs/start/config";
import { optimizeCssModules } from 'vite-plugin-optimize-css-modules';
import markdownRawPlugin from 'vite-raw-plugin'
import path from 'path';

const IS_PRD = import.meta.env.npm_lifecycle_event !== 'dev'
console.log("IS_PROD:", IS_PRD)

export default defineConfig({ 
  plugins: [
    IS_PRD && optimizeCssModules(), 
    markdownRawPlugin({ fileRegex: /\.md$/ })
  ].filter(x => x),
  start: { 
    ssr: IS_PRD,
    server: IS_PRD ? {
      prerender: {
        // autoSubfolderIndex: true,
        routes: ["/"],
        // crawlLinks: true,
      }
    } : {}
  },
  resolve: {
    alias: {
      "@styles": path.resolve(__dirname,'src/styles'),
    }
  },
  server: {
    hmr: false,
  },
  /*
  build: {
    // cssCodeSplit: false,
    assetsInlineLimit: 100000000,
    cssMinify: 'lightningcss',
  }
  */
});
