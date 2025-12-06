/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
  readonly hot?: {
    readonly data: Record<string, unknown>
    accept(): void
    accept(cb: (mod: unknown) => void): void
    accept(dep: string, cb: (mod: unknown) => void): void
    accept(deps: readonly string[], cb: (mods: unknown[]) => void): void
    dispose(cb: (data: Record<string, unknown>) => void): void
    decline(): void
    invalidate(): void
    on(event: string, cb: (...args: unknown[]) => void): void
  }
}
