import type { NavItem } from '$lib/types'

const menu: NavItem[] = [
  {
    ident: 'maths',
    text: 'Maths',
    href: '/maths-links',
  },
  {
    ident: 'film-pick',
    text: 'Film Picks',
    href: '/film-pick/2018',
    sub: [
      { href: '/film-pick/2016', text: '2016', ident: '2016' },
      { href: '/film-pick/2017', text: '2017', ident: '2017' },
      { href: '/film-pick/2018', text: '2018', ident: '2018' },
    ],
  },
]

export default menu
