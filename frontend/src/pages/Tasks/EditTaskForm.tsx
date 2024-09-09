import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { api } from '../../utils/apiService';
import { TaskType } from './Tasks';

export default function EditTaskForm({ task, setIsEditing, setTasks }
: { task: TaskType, setIsEditing: React.Dispatch<React.SetStateAction<boolean>>,
  setTasks: React.Dispatch<React.SetStateAction<TaskType[]>> }) {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);

  const handleEditTask = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await api.patch(`tasks/update/${task.id}`, { ...task, title, description });
      setIsEditing(false);
      setTasks((prevTasks) => prevTasks
        .map((t) => (t.id === task.id ? { ...t, title, description,
        } : t)));

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
      <button type="submit">Add</button>
    </form>
  );
}
