import { Trash } from 'lucide-react';
import React from 'react';
import toast from 'react-hot-toast';
import { api } from '../../utils/apiService';
import { TaskType, UserType } from '../../types/types';

export default function DeleteTaskButton({ setTasks, user, disabled, param = '',
  children = '', textColor = 'white', background = false }: {
  setTasks: React.Dispatch<React.SetStateAction<TaskType[]>>;
  user: UserType;
  disabled: boolean;
  param?: string;
  children?: React.ReactNode;
  textColor?: string;
  background?: boolean;
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
      className={ `text-center text-${textColor} 
      ${background && 'bg-red-500'}  p-2 rounded-md disabled:cursor-not-allowed` }
      onClick={ () => handleDeleteAllTasks() }
      disabled={ disabled }
    >
      <Trash />
      {children}
    </button>
  );
}
