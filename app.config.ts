import { defineConfig } from "@solidjs/start/config"
import { optimizeCssModules } from 'vite-plugin-optimize-css-modules'
import type { Options, } from "vite-plugin-solid"
import markdownRawPlugin from 'vite-raw-plugin'
import inlineSource from 'vite-plugin-inline-source'
import path from 'path'

const IS_PRD = process.env.npm_lifecycle_event !== 'dev'
console.log("IS_PROD:", IS_PRD)

export default defineConfig({
  ssr: IS_PRD,
  server: {
    preset: "githubPages",
    prerender: {
      routes: ["/","/pdf"],
      // crawlLinks: true,
      // autoSubfolderIndex: true
    }
  },
  solid: {
    hot: false,
    ssr: IS_PRD,
  } as Options,
  vite() {
    return {
      plugins: ([
        IS_PRD && optimizeCssModules(), 
        markdownRawPlugin({ fileRegex: /\.md$/ }),
        IS_PRD && inlineSource({
          optimizeCss: true, // Optional: minify CSS/JS
        })
      ].filter(x => x)) as any[],
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