import { Trash } from 'lucide-react';
import React from 'react';
import toast from 'react-hot-toast';
import { api } from '../../utils/apiService';
import { TaskType, UserType } from '../../types/types';

export default function DeleteTaskButton({ setTasks, user, param = '', children = '' }: {
  setTasks: React.Dispatch<React.SetStateAction<TaskType[]>>;
  user: UserType;
  param?: string;
  children?: React.ReactNode;
}) {
  const handleDeleteAllTasks = async () => {
    try {
      const statusQuery = param ? `?status=${param.replace(' ', '+')}` : '';
      await api.delete(`tasks/delete/user-tasks/${user.id}${statusQuery}`);
      setTasks((prevTasks) => (param
        ? prevTasks.filter((task) => task.status !== param) : []));
      toast.success('All tasks deleted');
    } catch (error) {
      console.error(error);
      toast.error('Error deleting all tasks');
    }
  };

  return (
    <button
      onClick={ () => handleDeleteAllTasks() }
    >
      <Trash />
      {children}
    </button>
  );
}
