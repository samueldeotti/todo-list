import { Edit, Trash } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { StatusType, TaskType } from './Tasks';
import EditTaskForm from './EditTaskForm';
import { api } from '../../utils/apiService';

export default function TaskItem({ task, setTasks }
: { task: TaskType, setTasks: React.Dispatch<React.SetStateAction<TaskType[]>> }) {
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

  const handleChangeStatus = async (newTask: TaskType, newStatus: StatusType) => {
    try {
      await api.patch(`tasks/update/${newTask.id}`, { ...newTask, status: newStatus });

      setTasks((prevTasks) => prevTasks
        .map((t) => (t.id === newTask.id ? { ...t, status: newStatus } : t)));
      toast.success('Task status updated');
    } catch (error) {
      console.error(error);
      toast.error('Error updating task status');
    }
  };

  return (
    <div>
      {isEditing ? (
        <EditTaskForm task={ task } setIsEditing={ setIsEditing } setTasks={ setTasks } />
      ) : (
        <>
          <h2>{task.title}</h2>
          <p>{task.description}</p>
          <button onClick={ () => handleDeleteTask(task.id) }><Trash /></button>
          <button onClick={ () => setIsEditing(true) }><Edit /></button>
          <select
            value={ task.status }
            onChange={ (e) => handleChangeStatus(task, e.target.value as StatusType) }
            className="bg-gray-800 text-white"
          >
            <option value="not started">Not Started</option>
            <option value="in progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>

        </>
      )}
    </div>
  );
}
