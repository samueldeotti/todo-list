/* eslint-disable react/jsx-max-depth */
/* eslint-disable max-len */
import { Edit, Trash } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import EditTaskForm from './EditTaskForm';
import { api } from '../../utils/apiService';
import { TaskType } from '../../types/types';

export default function TaskItem({ task, setTasks, completed }
: { task: TaskType, setTasks: React.Dispatch<React.SetStateAction<TaskType[]>>, completed: boolean }) {
  const [isEditing, setIsEditing] = useState(false);

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

  const handleOpenEditModal = () => {
    setIsEditing(true);
  };

  return (
    <>
      <div className="w-full flex flex-col justify-between gap-4 px-2 cursor-pointer">

        <div className="flex justify-between gap-2 items-center">
          <h2 className={ `text-lg font-semibold overflow-hidden text-ellipsis whitespace-nowrap ${completed && 'line-through'}` }>{task.title}</h2>
          <div className="flex gap-4">
            <button onClick={ handleOpenEditModal }><Edit /></button>
            <button onClick={ () => handleDeleteTask(task.id) }><Trash /></button>
          </div>
        </div>

        <p className={ `overflow-hidden text-ellipsis whitespace-nowrap ${completed && 'line-through'}` }>{task.description || '...'}</p>

      </div>
      {isEditing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <EditTaskForm task={ task } setIsEditing={ setIsEditing } setTasks={ setTasks } />
        </div>
      )}
    </>

  );
}
