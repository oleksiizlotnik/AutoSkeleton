import {
  addComponent,
  addImports,
  addPluginTemplate,
  addTypeTemplate,
  defineNuxtModule,
} from '@nuxt/kit'
import type { AutoSkeletonOptions } from '../config'

const PKG = 'auto-skeleton-vue'

/**
 * Options under the `autoSkeleton` key in nuxt.config. Everything from
 * createAutoSkeleton() except `store`, which isn't serializable — set a custom
 * store at runtime via `nuxtApp.$autoSkeleton.store` instead.
 */
export interface ModuleOptions extends Omit<AutoSkeletonOptions, 'store'> {
  /** Add the skeleton stylesheet to the app. Default: true. */
  css?: boolean
}

// Generated (not shipped as a runtime file) so `auto-skeleton-vue` resolves from
// the app itself — the plugin and the auto-imported components then always
// share one module instance, even with linked or pnpm-isolated installs.
// Nuxt runs plugins per request on the server, so each request gets its own store.
const PLUGIN = `import { defineNuxtPlugin, useRuntimeConfig } from '#imports'
import { AUTO_SKELETON_KEY, resolveConfig } from '${PKG}'

export default defineNuxtPlugin({
  name: '${PKG}',
  setup(nuxtApp) {
    const config = resolveConfig({ ...useRuntimeConfig().public.autoSkeleton })
    nuxtApp.vueApp.provide(AUTO_SKELETON_KEY, config)
    return { provide: { autoSkeleton: config } }
  },
})
`

const TYPES = `import type { AutoSkeletonConfig } from '${PKG}'

declare module '#app' {
  interface NuxtApp {
    $autoSkeleton: AutoSkeletonConfig
  }
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $autoSkeleton: AutoSkeletonConfig
  }
}

export {}
`

/** Nuxt module: `modules: ['auto-skeleton-vue/nuxt']`. */
export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: PKG,
    configKey: 'autoSkeleton',
    compatibility: { nuxt: '^3.10.0 || ^4.0.0' },
  },
  defaults: { css: true },
  setup(options, nuxt) {
    const { css, ...config } = options

    // Public runtime config: serialized to the client, and any key set in
    // nuxt.config can be overridden with NUXT_PUBLIC_AUTO_SKELETON_<KEY>.
    nuxt.options.runtimeConfig.public.autoSkeleton = {
      ...config,
      ...(nuxt.options.runtimeConfig.public.autoSkeleton as ModuleOptions | undefined),
    }

    if (css) nuxt.options.css.push(`${PKG}/style.css`)

    for (const name of ['AutoSkeleton', 'SkeletonCanvas']) {
      addComponent({ name, export: name, filePath: PKG })
    }
    addImports(['useAutoSkeleton', 'useAutoSkeletonConfig'].map((name) => ({ name, from: PKG })))

    addPluginTemplate({ filename: 'auto-skeleton.mjs', getContents: () => PLUGIN })
    addTypeTemplate({ filename: 'types/auto-skeleton.d.ts', getContents: () => TYPES })
  },
})
