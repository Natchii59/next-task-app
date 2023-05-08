export type SiteConfig = {
  name: string
  description: string
  url: string
  links: {
    twitter: string
    github: string
  }
}

export type NavItem = {
  title: string
  href: string
  disabled?: boolean
}

export type MainNavItem = NavItem
