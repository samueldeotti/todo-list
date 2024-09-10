export type UserType = {
  id: string;
  username: string;
};

export type StatusType = 'not started' | 'in progress' | 'completed';

export type TaskType = {
  id: string;
  title: string;
  description: string;
  status: StatusType;
  user: UserType;
};
