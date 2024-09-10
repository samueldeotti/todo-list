import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { X } from 'lucide-react';
import { api } from '../../utils/apiService';
import { StatusType, TaskType } from '../../types/types';
import TaskTitleInput from '../../components/TaskInput/TaskTitleInput';
import TaskDescriptionInput from '../../components/TaskInput/TaskDescriptionInput';
import TaskStatusInput from '../../components/TaskInput/TaskStatusInput';

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
      <X
        onClick={ () => setIsEditing(false) }
        className="absolute right-0 top-0 cursor-pointer"
      />
      <TaskTitleInput value={ title } setValue={ setTitle } />

      <TaskDescriptionInput value={ description } setValue={ setDescription } />
      <div className="flex w-full gap-2">
        <TaskStatusInput status={ task.status } setStatus={ setStatus } />
        <button
          type="submit"
          className="w-1/2 text-white bg-slate-900
          rounded-md p-2 up font-bold disabled:cursor-not-allowed"
        >
          Change
        </button>

      </div>
    </form>
  );
}
