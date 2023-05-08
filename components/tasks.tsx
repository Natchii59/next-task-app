'use client'

import { experimental_useOptimistic as useOptimistic, useRef } from 'react'
import { addTask } from '@/actions/tasks'
import { Task, User } from '@prisma/client'

import TasksList from './tasks-list'
import { Button } from './ui/button'
import { Input } from './ui/input'

interface TasksProps {
  tasks: Task[]
  user: User
}

interface OptimisticTasksState {
  tasks: Task[]
  sending?: boolean
}

export default function Tasks({ tasks, user }: TasksProps) {
  const formRef = useRef<HTMLFormElement>(null)

  const [optimisticTasks, updateOptimisticTask] = useOptimistic<
    OptimisticTasksState,
    OptimisticTasksState['tasks']
  >({ tasks, sending: false }, (state, tasks) => ({
    ...state,
    tasks,
    sending: true
  }))

  async function addTaskAction(data: FormData) {
    const title = data.get('title') as string

    if (!title.trim().length) return

    updateOptimisticTask([
      {
        id: Math.random().toString(),
        title,
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: user.id
      },
      ...optimisticTasks.tasks
    ])
    await addTask(title, user.id)
    formRef.current?.reset()
  }

  return (
    <>
      <TasksList
        tasks={optimisticTasks.tasks}
        sending={optimisticTasks.sending}
        updateOptimisticTask={updateOptimisticTask}
      />

      <form ref={formRef} action={addTaskAction} className='space-y-3'>
        <Input
          type='text'
          name='title'
          placeholder='Write something...'
          required
        />

        <Button type='submit' className='w-full'>
          Add task
        </Button>
      </form>
    </>
  )
}
