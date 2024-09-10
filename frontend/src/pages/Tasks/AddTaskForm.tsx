import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { api } from '../../utils/apiService';
import { TaskType, UserType } from '../../types/types';

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
    <form action="" onSubmit={ handleAddTask } className="w-full flex flex-col p-4 gap-2">
      <input
        className="bg-gray-800 p-2 rounded-md"
        type="text"
        placeholder="Task title"
        value={ title }
        onChange={ (e) => setTitle(e.target.value) }
      />
      <textarea
        className="bg-gray-800 p-2"
        placeholder="Task description"
        value={ description }
        onChange={ (e) => setDescription(e.target.value) }
      />
      <button
        type="submit"
        className="mt-2 w-full bg-slate-600 rounded-md p-2"
      >
        Add
      </button>
    </form>
  );
}
