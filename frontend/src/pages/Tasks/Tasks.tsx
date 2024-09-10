/* eslint-disable react/jsx-max-depth */
import { useEffect, useState } from 'react';
import { api } from '../../utils/apiService';
import useAuth from '../../hooks/useAuth';
import AddTaskForm from './AddTaskForm';
import TasksContainer from './TasksContainer';
import DeleteTaskButton from './DeleteTaskButton';
import { TaskType, UserType } from '../../types/types';
import Header from '../../components/Header/Header';

export default function Tasks() {
  useAuth();

  const [tasks, setTasks] = useState<TaskType[]>([]);

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

  return (
    <>

      <Header />
      <div className="w-full text-white mt-6">

        <div className="px-4 ">
          <AddTaskForm setTasks={ setTasks } user={ user } />
          <div className="flex justify-between mb-8 mt-4">
            <h1 className="text-3xl">All tasks</h1>
            <DeleteTaskButton setTasks={ setTasks } user={ user } background />
          </div>
          <div>
            <div>

              <TasksContainer
                setTasks={ setTasks }
                tasks={ tasks?.filter((task) => task.status === 'not started') }
                user={ user }
                taskStatus="not started"
              />

              <TasksContainer
                setTasks={ setTasks }
                tasks={ tasks?.filter((task) => task.status === 'in progress') }
                user={ user }
                taskStatus="in progress"
              />

              <TasksContainer
                setTasks={ setTasks }
                tasks={ tasks?.filter((task) => task.status === 'completed') }
                user={ user }
                taskStatus="completed"
              />

              {/* <div>
              <h2>{tasks[0]?.title}</h2>
              <p>{tasks[0]?.description}</p>
              <p>{tasks[0]?.status}</p>
            </div> */}

            </div>
          </div>
        </div>
      </div>
    </>
  );
}
