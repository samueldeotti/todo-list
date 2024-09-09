import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { api } from '../../utils/apiService';
import { TaskType, UserType } from './Tasks';

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
    <form action="" onSubmit={ handleAddTask }>
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
