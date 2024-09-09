/* eslint-disable react/jsx-max-depth */
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
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

  return (
    <div className="w-full h-[100vh] bg-black text-white">

      <div>
        <h1>All tasks</h1>
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
                {tasks.filter((task) => task.status === 'not started').map((task) => (
                  <div key={ task.id }>
                    <h2>{task.title}</h2>
                    <p>{task.description}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h2>In progress</h2>
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
