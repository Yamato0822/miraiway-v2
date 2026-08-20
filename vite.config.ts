import build from '@hono/vite-build/cloudflare-pages'
import devServer from '@hono/vite-dev-server'
import adapter from '@hono/vite-dev-server/cloudflare'
import { transform } from 'esbuild'
import { readdir, readFile, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { defineConfig, type Plugin } from 'vite'

const minifyCopiedStaticAssets = (): Plugin => ({
  name: 'miraiway-minify-copied-static-assets',
  apply: 'build',
  async closeBundle() {
    const staticDir = resolve('dist/static')
    const files = await readdir(staticDir)
    await Promise.all(files.filter((file) => /\.(?:js|css)$/.test(file)).map(async (file) => {
      const path = resolve(staticDir, file)
      const source = await readFile(path, 'utf8')
      const loader = file.endsWith('.css') ? 'css' : 'js'
      const result = await transform(source, {
        loader,
        minify: true,
        sourcemap: false,
        target: 'es2020'
      })
      await writeFile(path, result.code)
    }))
  }
})

export default defineConfig({
  plugins: [
    build(),
    minifyCopiedStaticAssets(),
    devServer({
      adapter,
      entry: 'src/index.tsx'
    })
  ]
})
