'use client'

import { Task } from '@prisma/client'

import { cn } from '@/lib/utils'

import { Icons } from './icons'
import TaskItem from './task-item'
import { Card } from './ui/card'

interface TasksListProps {
  tasks: Task[]
  sending?: boolean
  updateOptimisticTask: (action: Task[]) => void
}

export default function TasksList({
  tasks,
  sending,
  updateOptimisticTask
}: TasksListProps) {
  return (
    <Card className={cn('relative p-1.5')}>
      {sending && (
        <div className='absolute inset-0 flex items-center justify-center bg-muted/50'>
          <Icons.spinner className='h-6 w-6 animate-spin' />
        </div>
      )}

      <div className='space-y-1.5'>
        {tasks.length > 0 ? (
          tasks.map(task => (
            <TaskItem
              key={task.id}
              task={task}
              tasks={tasks}
              updateOptimisticTask={updateOptimisticTask}
            />
          ))
        ) : (
          <p className='text-center font-semibold'>No tasks yet.</p>
        )}
      </div>
    </Card>
  )
}
