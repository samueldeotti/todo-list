/* eslint-disable react/jsx-max-depth */
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Trash, X } from 'lucide-react';
import { api } from '../../utils/apiService';
import useAuth from '../../hooks/useAuth';

type UserType = {
  id: string;
  username: string;
};

type StatusType = 'not started' | 'in progress' | 'completed';

type TaskType = {
  id: string;
  title: string;
  description: string;
  status: StatusType;
  user: UserType;
};

export default function Tasks() {
  useAuth();

  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const user:UserType = JSON.parse(localStorage.getItem('user') || '{}');

  useEffect(() => {
    if (!user) {
      return;
    }

    const getTasks = async () => {
      try {
        const { data } = await api.get(`tasks/user/${user.id}`);
        setTasks(data);
      } catch (error) {
        console.error(error);
        setTasks([]);
      }
    };
    getTasks();
  }, []);

  const handleAddTask = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const task = {
        title,
        description,
        status: 'not started',
      };
      const { data } = await api.post(`tasks/create/${user.id}`, task);
      setTasks([...tasks, data]);
      setTitle('');
      setDescription('');
    } catch (error) {
      console.error(error);
      toast.error('Error adding task');
    }
  };

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

  const handleDeleteAllTasks = async (param?: string) => {
    try {
      await api.delete(`tasks/delete/user-tasks/${user.id}${`?status=${param?.replace(' ', '+')}`}`);
      setTasks((prevTasks) => (param
        ? prevTasks.filter((task) => task.status !== param) : []));
      toast.success('All tasks deleted');
    } catch (error) {
      console.error(error);
      toast.error('Error deleting all tasks');
    }
  };

  return (
    <div className="w-full h-[100vh] bg-black text-white">

      <div>
        <h1>All tasks</h1>
        <button
          onClick={ () => handleDeleteAllTasks() }
        >
          <Trash />
          Delete all tasks
        </button>
        <div>
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
          <div>
            <div>
              <h2>To do</h2>
              <div>
                <button
                  onClick={ () => handleDeleteAllTasks('not started') }
                >
                  <Trash />
                  aaaaaaaaaaaa
                </button>
                {tasks.filter((task) => task.status === 'not started').map((task) => (
                  <div key={ task.id }>
                    <h2>{task.title}</h2>
                    <p>{task.description}</p>
                    <button onClick={ () => handleDeleteTask(task.id) }><Trash /></button>
                    <select
                      value={ task.status }
                      onChange={ (e) => handleChangeStatus(task, e.target.value as StatusType) }
                      className="bg-gray-800 text-white"
                    >
                      <option value="not started">Not Started</option>
                      <option value="in progress">In Progress</option>
                      <option value="completed">Completed</option>
                    </select>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h2>In progress</h2>
              <button
                onClick={ () => handleDeleteAllTasks('in progress') }
              >
                <Trash />
                aaaaaaaaaaaa
              </button>
              <div>
                {tasks.filter((task) => task.status === 'in progress').map((task) => (
                  <div key={ task.id }>
                    <h2>{task.title}</h2>
                    <p>{task.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2>Completed</h2>
              <button
                onClick={ () => handleDeleteAllTasks('completed') }
              >
                <Trash />
                aaaaaaaaaaaa
              </button>
              <div>
                {tasks.filter((task) => task.status === 'completed').map((task) => (
                  <div key={ task.id }>
                    <h2>{task.title}</h2>
                    <p>{task.description}</p>
                  </div>
                ))}
              </div>

            </div>

            <div>
              <h2>{tasks[0]?.title}</h2>
              <p>{tasks[0]?.description}</p>
              <p>{tasks[0]?.status}</p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
