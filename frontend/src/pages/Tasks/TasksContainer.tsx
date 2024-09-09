import { Edit, Trash } from 'lucide-react';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { StatusType, TaskType, UserType } from './Tasks';
import { api } from '../../utils/apiService';
import DeleteTaskButton from './DeleteTaskButton';
import AddTaskForm from './AddTaskForm';
import TaskItem from './TaskItem';

export default function TasksContainer({ setTasks, tasks, user, taskStatus }:
{ setTasks: React.Dispatch<React.SetStateAction<TaskType[]>>,
  tasks: TaskType[], user: UserType, taskStatus: StatusType }) {

  const handleDeleteTask = async (id: string) => {
    try {
      await api.delete(`tasks/delete/${id}`);
      setTasks(tasks.filter((task) => task.id !== id));
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
        .map((task) => (task.id === newTask.id ? { ...task, status: newStatus } : task)));
      toast.success('Task status updated');
    } catch (error) {
      console.error(error);
      toast.error('Error updating task status');
    }
  };

  return (
    <div>
      <h2>
        {taskStatus.charAt(0).toUpperCase() + taskStatus.slice(1).toLowerCase()
        ?? ''}
      </h2>
      <div>

        <DeleteTaskButton setTasks={ setTasks } user={ user } param={ taskStatus } />
        {tasks.map((task) => (
          <div key={ task.id }>
            <TaskItem
              task={ task }
              handleDeleteTask={ handleDeleteTask }
              handleChangeStatus={ handleChangeStatus }
            />

          </div>
        ))}
      </div>
    </div>
  );
}
