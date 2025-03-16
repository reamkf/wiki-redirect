/// <reference types="vite/client" />
import type { Env } from 'hono'

type Head = {
  title?: string
  meta?: { name: string; content: string }[]
  link?: { rel: string; href: string }[]
}

declare module 'hono' {
  interface Env {
    Variables: {}
    Bindings: {}
  }
  interface ContextRenderer {
    (content: string | Promise<string>, head?: Head): Response | Promise<Response>
  }
}