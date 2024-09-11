import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { Trash, X } from 'lucide-react';
import { api } from '../../utils/apiService';
import { TaskType } from '../../types/types';
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

  const handleDeleteTask = async (id: string) => {
    try {
      await api.delete(`tasks/delete/${id}`);
      setTasks((prevTasks) => prevTasks.filter((t) => t.id !== id));
      toast.success('Task deleted');
    } catch (error) {
      console.error(error);
      toast.error('Error deleting task');
    }
  };

  return (
    <form
      action=""
      onSubmit={ (e) => handleEditTask(e) }
      className="flex flex-col gap-4 relative bg-white p-4 rounded-md max-w-[400px]
      sm:justify-around  sm:w-full sm:min-w-[300px] sm:min-h-[320px]"
    >
      <div className="flex flex-col gap-4 w-full">
        <div className="flex justify-between items-center">
          <button
            className="bg-red-500 rounded-md p-1 text-white"
            type="button"
            onClick={ () => handleDeleteTask(task.id) }
          >
            <Trash />
          </button>
          <button
            className="cursor-pointer self-end p-1 bg-black rounded-full text-white"
            type="button"
            onClick={ () => setIsEditing(false) }
          >
            <X />

          </button>
        </div>
      </div>
      <div className="flex flex-col w-full gap-4">
        <TaskTitleInput value={ title } setValue={ setTitle } />
        <TaskDescriptionInput value={ description } setValue={ setDescription } />

      </div>
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
