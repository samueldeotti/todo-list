import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { X } from 'lucide-react';
import { api } from '../../utils/apiService';
import { StatusType, TaskType } from '../../types/types';

export default function EditTaskForm({ task, setIsEditing, setTasks }
: { task: TaskType, setIsEditing: React.Dispatch<React.SetStateAction<boolean>>,
  setTasks: React.Dispatch<React.SetStateAction<TaskType[]>> }) {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [status, setStatus] = useState(task.status);

  const handleEditTask = async (e: React.FormEvent<HTMLFormElement>) => {
    console.log('task', task);
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
    <form
      action=""
      onSubmit={ (e) => handleEditTask(e) }
      className="flex flex-col gap-2 relative"
    >
      <X onClick={ () => setIsEditing(false) } className="absolute right-0 top-0 cursor-pointer" />
      <input
        className="bg-transparent p-2 rounded-md outline outline-2 focus:outline-black mt-8 "
        type="text"
        placeholder="Task title"
        value={ title }
        onChange={ (e) => setTitle(e.target.value) }
      />
      <textarea
        className="bg-transparent p-2 rounded-md outline outline-2 focus:outline-black max-h-[120px]"
        placeholder="Task description"
        value={ description }
        onChange={ (e) => setDescription(e.target.value) }
      />
      <div className="flex w-full gap-2">
        <select
          onChange={ (e) => setStatus(e.target.value as StatusType) }
          defaultValue={ task.status }
          className="p-2 w-1/2 rounded-md"
        >
          <option value="not started">Not Started</option>
          <option value="in progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
        <button type="submit" className="w-1/2 text-white bg-slate-900 rounded-md p-2 up font-bold disabled:cursor-not-allowed">Change</button>

      </div>
    </form>
  );
}
