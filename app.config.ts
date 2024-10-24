import { defineConfig } from "@solidjs/start/config"
import { optimizeCssModules } from 'vite-plugin-optimize-css-modules'
import type { Options } from "vite-plugin-solid"
import markdownRawPlugin from 'vite-raw-plugin'
import { viteSingleFile } from "vite-plugin-singlefile"
import path from 'path'

const IS_PRD = process.env.npm_lifecycle_event !== 'dev'
console.log("IS_PROD:", IS_PRD)
/*

console.log(process.env)
*/
export default defineConfig({
  ssr: IS_PRD,
  server: {
    preset: "githubPages",
    prerender: {
      // autoSubfolderIndex: true,
      routes: ["/","/pdf"],
      // crawlLinks: true,
    }
  },
  solid: {
    hot: false,
    ssr: IS_PRD,
  } as Options,
  vite() {
    return {
      plugins: [
        IS_PRD && optimizeCssModules(),
        markdownRawPlugin({ fileRegex: /\.md$/ }),
      ].filter(x => x),
      resolve: {
        alias: {
          "@styles": path.resolve(process.env.PWD as string,'src/styles'),
        }
      },
      server: {
        hmr: false,
      },
      build: {
        rollupOptions: {
          output: {
            // manualChunks: false,
            inlineDynamicImports: false,
            entryFileNames: '[name].js',   // currently does not work for the legacy bundle
            assetFileNames: '[name].[ext]', // currently does not work for images
          }
        }
      }
    }
  }
})


/*
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
});
*/
