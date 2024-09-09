import { Edit, Trash } from 'lucide-react';
import React, { useState } from 'react';
import { StatusType } from './Tasks';
import AddTaskForm from './AddTaskForm';
import EditTaskForm from './EditTaskForm';

export default function TaskItem({ task, handleDeleteTask, handleChangeStatus, setTasks }) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div>
      {isEditing ? (
        <EditTaskForm task={ task } setIsEditing={ setIsEditing } setTasks={ setTasks } />
      ) : (
        <>
          <h2>{task.title}</h2>
          <p>{task.description}</p>
          <button onClick={ () => handleDeleteTask(task.id) }><Trash /></button>
          <button onClick={ () => setIsEditing(true) }><Edit /></button>
          <select
            value={ task.status }
            onChange={ (e) => handleChangeStatus(task, e.target.value as StatusType) }
            className="bg-gray-800 text-white"
          >
            <option value="not started">Not Started</option>
            <option value="in progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>

        </>
      )}
    </div>
  );
}
