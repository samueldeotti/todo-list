import DeleteTaskButton from './DeleteTaskButton';
import TaskItem from './TaskItem';
import { StatusType, TaskType, UserType } from '../../types/types';

export default function TasksContainer({ setTasks, tasks, user, taskStatus }:
{ setTasks: React.Dispatch<React.SetStateAction<TaskType[]>>,
  tasks: TaskType[], user: UserType, taskStatus: StatusType }) {
  return (
    <div className="p-4 bg-white rounded-lg text-black mb-4 sm:min-w-[320px] sm:min-h-[168px] h-fit w-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className=" text-2xl my-auto italic underline underline-offset-2">
          {taskStatus.charAt(0).toUpperCase() + taskStatus.slice(1).toLowerCase()
        ?? ''}
        </h2>
        <DeleteTaskButton
          setTasks={ setTasks }
          user={ user }
          param={ taskStatus }
          textColor="black"
          disabled={ tasks.length === 0 }
        />

      </div>
      <div className="flex flex-col gap-4 pb-2">

        {tasks.length === 0 ? (
          <p>No tasks</p>
        ) : (
          tasks.map((task) => (
            <div key={ task.id } className="border-none outline p-4 rounded-md">
              <TaskItem
                setTasks={ setTasks }
                task={ task }
                completed={ taskStatus === 'completed' }
              />
            </div>
          ))
        )}

      </div>
    </div>
  );
}
