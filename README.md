# unplugin-auto-import-api

[![NPM version](https://img.shields.io/npm/v/unplugin-auto-import-api?color=a1b858&label=)](https://www.npmjs.com/package/unplugin-auto-import-api)

Auto import APIs on-demand for Vite, Webpack and Rollup

---

without

```ts
import { computed, ref } from 'vue'
const count = ref(0)
const doubled = computed(() => count.value * 2)
```

with

```ts
const count = ref(0)
const doubled = computed(() => count.value * 2)
```

---

## Install

```bash
npm i -D unplugin-auto-import-api
```

<details>
<summary>Vite</summary><br>

```ts
// vite.config.ts
import AutoImport from 'unplugin-auto-import-api/vite'

export default defineConfig({
  plugins: [
    AutoImport({ /* options */ }),
  ],
})
```

Example: [`playground/`](./playground/)

<br></details>

<details>
<summary>Rollup</summary><br>

```ts
// rollup.config.js
import AutoImport from 'unplugin-auto-import-api/rollup'

export default {
  plugins: [
    AutoImport({ /* options */ }),
    // other plugins
  ],
}
```

<br></details>


<details>
<summary>Webpack</summary><br>

```ts
// webpack.config.js
module.exports = {
  /* ... */
  plugins: [
    require('unplugin-auto-import-api/webpack')({ /* options */ }),
  ],
}
```

<br></details>

<details>
<summary>Nuxt</summary><br>

> You **don't need** this plugin for Nuxt, it's already builtin.

<br></details>

<details>
<summary>Vue CLI</summary><br>

```ts
// vue.config.js
module.exports = {
  configureWebpack: {
    plugins: [
      require('unplugin-auto-import-api/webpack')({ /* options */ }),
    ],
  },
}
```

<br></details>

<details>
<summary>Quasar</summary><br>

```ts
// quasar.conf.js [Vite]
module.exports = {
  vitePlugins: [
    ['unplugin-auto-import-api/vite', { /* options */ }],
  ],
}
```

```ts
// quasar.conf.js [Webpack]
const AutoImportPlugin = require('unplugin-auto-import-api/webpack')

module.exports = {
  build: {
    chainWebpack(chain) {
      chain.plugin('unplugin-auto-import-api').use(
        AutoImportPlugin({ /* options */ }),
      )
    },
  },
}
```

<br></details>


<details>
<summary>esbuild</summary><br>

```ts
// esbuild.config.js
import { build } from 'esbuild'

build({
  /* ... */
  plugins: [
    require('unplugin-auto-import-api/esbuild')({
      /* options */
    }),
  ],
})
```

<br></details>


<details>
<summary>Astro</summary><br>

```ts
// astro.config.mjs
import AutoImport from 'unplugin-auto-import-api/astro'

export default defineConfig({
  integrations: [
    AutoImport({
      /* options */
    })
  ],
})
```

<br></details>

## Configuration

```ts
AutoImport({
  // targets to transform
  include: [
    /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
    /\.vue$/, /\.vue\?vue/, // .vue
    /\.md$/, // .md
  ],

  // global imports to register
  imports: [
    // presets
    'vue',
    'vue-router',
    // custom
    {
      '@vueuse/core': [
        // named imports
        'useMouse', // import { useMouse } from '@vueuse/core',
        // alias
        ['useFetch', 'useMyFetch'], // import { useFetch as useMyFetch } from '@vueuse/core',
      ],
      'axios': [
        // default imports
        ['default', 'axios'], // import { default as axios } from 'axios',
      ],
      '[package-name]': [
        '[import-names]',
        // alias
        ['[from]', '[alias]'],
      ],
    },
  ],
  // Enable auto import by filename for default module exports under directories
  defaultExportByFilename: false,

  // Auto import for module exports under directories
  // by default it only scan one level of modules under the directory
  dirs: [
    // './hooks',
    // './composables' // only root modules
    // './composables/**', // all nested modules
    // ...
  ],

  // Filepath to generate corresponding .d.ts file.
  // Defaults to './auto-imports.d.ts' when `typescript` is installed locally.
  // Set `false` to disable.
  dts: './auto-imports.d.ts',

  // Auto import inside Vue template
  // see https://github.com/unjs/unimport/pull/15 and https://github.com/unjs/unimport/pull/72
  vueTemplate: false,

  // Custom resolvers, compatible with `unplugin-vue-components`
  // see https://github.com/antfu/unplugin-auto-import/pull/23/
  resolvers: [
    /* ... */
  ],

  // Generate corresponding .eslintrc-auto-import.json file.
  // eslint globals Docs - https://eslint.org/docs/user-guide/configuring/language-options#specifying-globals
  eslintrc: {
    enabled: false, // Default `false`
    filepath: './.eslintrc-auto-import.json', // Default `./.eslintrc-auto-import.json`
    globalsPropValue: true, // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
  },
})
```

Refer to the [type definitions](./src/types.ts) for more options.

## TypeScript

In order to properly hint types for auto-imported APIs

<table>
<tr>
<td width="400px" valign="top">

1. Enable `options.dts` so that `auto-imports.d.ts` file is automatically generated
2. Make sure `auto-imports.d.ts` is not excluded in `tsconfig.json`

</td>
<td width="600px"><br>

```ts
AutoImport({
  dts: true // or a custom path
})
```

</td>
</tr>
</table>

## License

[MIT](./LICENSE) License © 2023 [Elone Hoo](https://github.com/elonehoo)
