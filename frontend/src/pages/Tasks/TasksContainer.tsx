import DeleteTaskButton from './DeleteTaskButton';
import TaskItem from './TaskItem';
import { StatusType, TaskType, UserType } from '../../types/types';

export default function TasksContainer({ setTasks, tasks, user, taskStatus }:
{ setTasks: React.Dispatch<React.SetStateAction<TaskType[]>>,
  tasks: TaskType[], user: UserType, taskStatus: StatusType }) {
  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className=" text-2xl my-auto ">
          {taskStatus.charAt(0).toUpperCase() + taskStatus.slice(1).toLowerCase()
        ?? ''}
        </h2>
        <DeleteTaskButton setTasks={ setTasks } user={ user } param={ taskStatus } />

      </div>
      <div className="flex flex-col gap-4 ">

        {tasks.map((task) => (
          <div key={ task.id } className="ring-1 ring-[#f3f3f3] p-4 rounded-md">
            <TaskItem
              setTasks={ setTasks }
              task={ task }
            />
          </div>
        ))}

      </div>
    </div>
  );
}
