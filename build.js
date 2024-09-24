import esbuild, { build } from 'esbuild'
import ghPages from 'esbuild-plugin-ghpages-pwa'

const { plugin: githubPages, buildOptions } = ghPages({
  app: 'math-test',
  description: 'Probably does something cool',
  cacheTag: 4,//used to clear old browser caches
  serve: 3014// port for local web server
})
let watch = false
if (buildOptions.watch) {
  watch = true
}
delete buildOptions.watch

try {
  const options = {
    entryPoints: [
      'javascripts/index.js',
      'stylesheets/index.css'
    ],
    target: ['chrome120', 'safari17'],
    plugins: [
      githubPages
    ]
  }
  if (watch) {
    const ctx = await esbuild.context(Object.assign(buildOptions, options))
    await ctx.watch()
  } else {
    await esbuild.build(Object.assign(buildOptions, options))
  }
} catch (err) {
  console.error(err)
  process.exit(1)
}