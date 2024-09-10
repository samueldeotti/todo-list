import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { api } from '../../utils/apiService';
import { TaskType, UserType } from '../../types/types';
import TaskTitleInput from '../../components/TaskInput/TaskTitleInput';
import TaskDescriptionInput from '../../components/TaskInput/TaskDescriptionInput';

export default function AddTaskForm({ setTasks, user }
: { setTasks: React.Dispatch<React.SetStateAction<TaskType[]>>, user: UserType }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleAddTask = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const task = {
        title,
        description,
        status: 'not started',
      };
      const { data } = await api.post(`tasks/create/${user.id}`, task);
      setTasks((prevTasks) => [...prevTasks, data]);
      setTitle('');
      setDescription('');
    } catch (error) {
      console.error(error);
      toast.error('Error adding task');
    }
  };

  return (
    <form
      action=""
      onSubmit={ handleAddTask }
      className="w-full flex flex-col py-4 gap-4 lg:max-w-[600px] lg:m-auto"
    >
      <TaskTitleInput value={ title } setValue={ setTitle } />
      <TaskDescriptionInput value={ description } setValue={ setDescription } />

      <button
        type="submit"
        className="mt-2 w-full bg-slate-900
        rounded-md p-3 up font-bold disabled:cursor-not-allowed"
        disabled={ !title }
      >
        Add
      </button>
    </form>
  );
}
