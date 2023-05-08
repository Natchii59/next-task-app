'use client'

import { User } from '@prisma/client'
import { signOut } from 'next-auth/react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from './ui/dropdown-menu'
import { UserAvatar } from './user-avatar'

interface UserAccountNavProps {
  user: Pick<User, 'name' | 'email' | 'image'>
}

export function UserAccountNav({ user }: UserAccountNavProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserAvatar
          user={{ name: user.name || null, image: user.image || null }}
          className='h-8 w-8'
        />
      </DropdownMenuTrigger>

      <DropdownMenuContent align='end'>
        <div className='flex flex-col space-y-1 p-2 leading-none'>
          {user.name && <p className='font-medium'>{user.name}</p>}
          {user.email && (
            <p className='w-[200px] truncate text-sm text-muted-foreground'>
              {user.email}
            </p>
          )}
        </div>

        <DropdownMenuSeparator />
        <DropdownMenuItem
          className='cursor-pointer text-red-500 hover:!text-red-600'
          onSelect={event => {
            event.preventDefault()
            signOut({
              callbackUrl: `${window.location.origin}/login`
            })
          }}
        >
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
