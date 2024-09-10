import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { api } from '../../utils/apiService';
import { StatusType, TaskType } from '../../types/types';

export default function EditTaskForm({ task, setIsEditing, setTasks }
: { task: TaskType, setIsEditing: React.Dispatch<React.SetStateAction<boolean>>,
  setTasks: React.Dispatch<React.SetStateAction<TaskType[]>> }) {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [status, setStatus] = useState(task.status);

  const handleEditTask = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await api.patch(`tasks/update/${task.id}`, { ...task, title, description, status });
      setIsEditing(false);
      setTasks((prevTasks) => prevTasks
        .map((t) => (t.id === task.id ? { ...t, title, description, status } : t)));

      toast.success('Task updated');
    } catch (error) {
      console.error(error);
      toast.error('Error updating task');
    }
  };

  return (
    <form action="" onSubmit={ (e) => handleEditTask(e) }>
      <input
        className="bg-gray-800"
        type="text"
        placeholder="Task title"
        value={ title }
        onChange={ (e) => setTitle(e.target.value) }
      />
      <input
        className="bg-gray-800"
        type="text"
        placeholder="Task description"
        value={ description }
        onChange={ (e) => setDescription(e.target.value) }
      />
      <select
        onChange={ (e) => setStatus(e.target.value as StatusType) }
        defaultValue={ task.status }
      >
        <option value="not started">Not Started</option>
        <option value="in progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>
      <button type="submit">Add</button>
    </form>
  );
}
