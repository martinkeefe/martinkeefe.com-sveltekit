// import type { Readable } from 'svelte/store'

export interface NavItem {
  href: string
  text: string
  ident: string
  sub?: Array<NavItem>
}
