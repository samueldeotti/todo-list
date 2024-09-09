import React, { useState } from 'react';
import { StatusType, TaskType, UserType } from './Tasks';

import DeleteTaskButton from './DeleteTaskButton';
import TaskItem from './TaskItem';

export default function TasksContainer({ setTasks, tasks, user, taskStatus }:
{ setTasks: React.Dispatch<React.SetStateAction<TaskType[]>>,
  tasks: TaskType[], user: UserType, taskStatus: StatusType }) {
  return (
    <div>
      <h2>
        {taskStatus.charAt(0).toUpperCase() + taskStatus.slice(1).toLowerCase()
        ?? ''}
      </h2>
      <div>

        <DeleteTaskButton setTasks={ setTasks } user={ user } param={ taskStatus } />

        {tasks.map((task) => (
          <div key={ task.id }>
            <TaskItem
              setTasks={ setTasks }
              task={ task }
            />
          </div>
        ))}

      </div>
    </div>
  );
}
