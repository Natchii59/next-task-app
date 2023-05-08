import { notFound } from 'next/navigation'

import { db } from '@/lib/db'
import { getCurrentUser } from '@/lib/session'
import Header from '@/components/header'
import Tasks from '@/components/tasks'

async function getTasks(userId: string) {
  return await db.task.findMany({
    where: {
      userId
    },
    orderBy: {
      createdAt: 'desc'
    }
  })
}

export default async function Home() {
  const user = await getCurrentUser()

  if (!user) {
    return notFound()
  }

  const tasks = await getTasks(user.id)

  return (
    <div className='container min-h-screen py-8'>
      <div className='relative space-y-4'>
        <Header user={user} />

        <Tasks tasks={tasks} user={user} />
      </div>
    </div>
  )
}
