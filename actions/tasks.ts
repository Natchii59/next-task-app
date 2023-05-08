'use server'

import { revalidatePath } from 'next/cache'

import { db } from '@/lib/db'

export async function addTask(title: string, userId: string) {
  await db.task.create({
    data: {
      title,
      userId
    }
  })
  revalidatePath('/')
}

export async function deleteTask(id: string) {
  await db.task.delete({
    where: {
      id
    }
  })
  revalidatePath('/')
}
