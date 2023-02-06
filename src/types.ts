import type { Arrayable, Awaitable } from '@antfu/utils'
import type { FilterPattern } from '@rollup/pluginutils'
import type { Import } from 'unimport'
import { PresetName } from './presets'

export interface ImportLegacy {
  /**
   * @deprecated renamed to `as`
   */
  name?: string
  /**
   * @deprecated renamed to `name`
   */
  importName?: string
  /**
   * @deprecated renamed to `from`
   */
  path: string

  sideEffects?: SideEffectsInfo
}

export interface ImportExtended extends Import {
  sideEffects?: SideEffectsInfo
  __source?: 'dir' | 'resolver'
}

export type ImportNameAlias = [string, string]
export type SideEffectsInfo = Arrayable<ResolverResult | string> | undefined

export interface ResolverResult {
  as?: string
  name?: string
  from: string
}

export type ResolverFunction = (name: string) => Awaitable<string | ResolverResult | ImportExtended | null | undefined | void>

export interface ResolverResultObject {
  type: 'component' | 'directive'
  resolve: ResolverFunction
}

/**
 * Given a identifier name, returns the import path or an import object
 */
export type Resolver = ResolverFunction | ResolverResultObject

/**
 * module, name, alias
 */
export type ImportsMap = Record<string, (string | ImportNameAlias)[]>

export type ESLintGlobalsPropValue = boolean | 'readonly' | 'readable' | 'writable' | 'writeable'

export interface ESLintrc {
  /**
   * @default false
   */
  enabled?: boolean
  /**
   * Filepath to save the generated eslint config
   *
   * @default './.eslintrc-auto-import.json'
   */
  filepath?: string
  /**
   * @default true
   */
  globalsPropValue?: ESLintGlobalsPropValue
}

export interface Options {
  /**
   * Preset names or custom imports map
   *
   * @default []
   */
  imports?: Arrayable<ImportsMap | PresetName>

  /**
   * Identifiers to be ignored
   */
  ignore?: (string | RegExp)[]

  /**
   * Path for directories to be auto imported
   */
  dirs?: string[]

  /**
   * Pass a custom function to resolve the component importing path from the component name.
   *
   * The component names are always in PascalCase
   */
  resolvers?: Arrayable<Arrayable<Resolver>>

  /**
   * Filepath to generate corresponding .d.ts file.
   * Default enabled when `typescript` is installed locally.
   * Set `false` to disable.
   *
   * @default './auto-imports.d.ts'
   */
  dts?: string | boolean

  /**
   * Auto import inside Vue templates
   *
   * @see https://github.com/unjs/unimport/pull/15
   * @see https://github.com/unjs/unimport/pull/72
   * @default false
   */
  vueTemplate?: boolean

  /**
   * Set default export alias by file name
   *
   * @default false
   */
  defaultExportByFilename?: boolean

  /**
   * Allow overriding imports sources from multiple presets.
   *
   * @default false
   */
  presetOverriding?: boolean

  /**
   * Rules to include transforming target.
   *
   * @default [/\.[jt]sx?$/, /\.vue\??/]
   */
  include?: FilterPattern

  /**
   * Rules to exclude transforming target.
   *
   * @default [/node_modules/, /\.git/]
   */
  exclude?: FilterPattern

  /**
   * Generate source map.
   *
   * @default false
   */
  sourceMap?: boolean

  /**
   * Generate corresponding .eslintrc-auto-import.json file.
   */
  eslintrc?: ESLintrc
}

export { PresetName }
