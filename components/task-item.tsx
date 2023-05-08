'use client'

import { deleteTask } from '@/actions/tasks'
import { Task } from '@prisma/client'

import { Icons } from './icons'
import { Button } from './ui/button'

interface TaskItemProps {
  task: Task & {
    sending?: boolean
  }
  tasks: (Task & {
    sending?: boolean
  })[]
  updateOptimisticTask: (
    action: (Task & {
      sending?: boolean | undefined
    })[]
  ) => void
}

export default function TaskItem({
  task,
  tasks,
  updateOptimisticTask
}: TaskItemProps) {
  async function deleteTaskAction() {
    updateOptimisticTask(tasks.filter(t => t.id !== task.id))
    await deleteTask(task.id)
  }

  return (
    <div className='group flex h-9 items-center justify-between rounded-lg pl-2 pr-1 hover:bg-muted'>
      <div className='flex items-center gap-2'>
        {task.sending && <Icons.spinner className='h-4 w-4 animate-spin' />}
        <span className={task.sending ? 'text-muted-foreground' : undefined}>
          {task.title}
        </span>
      </div>

      <Button
        variant='ghost'
        size='sm'
        className='hidden h-7 w-7 p-0 text-red-500 hover:text-red-600 group-hover:flex'
        onClick={deleteTaskAction}
      >
        <Icons.trash className='h-4 w-4' />
      </Button>
    </div>
  )
}
