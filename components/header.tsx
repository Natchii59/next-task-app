import Link from 'next/link'
import { User } from '@prisma/client'

import { siteConfig } from '@/config/site'

import { Icons } from './icons'
import { UserAccountNav } from './user-account-nav'

interface HeaderProps {
  user: Pick<User, 'name' | 'image' | 'email'>
}

export default function Header({ user }: HeaderProps) {
  return (
    <header className='flex items-center justify-between'>
      <Link href='/' className='flex items-center gap-1 font-heading text-xl'>
        <Icons.logo />
        <span>{siteConfig.name}</span>
      </Link>

      <UserAccountNav user={user} />
    </header>
  )
}
