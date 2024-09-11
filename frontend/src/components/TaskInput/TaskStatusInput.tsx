import React from 'react';
import { StatusType } from '../../types/types';

export default function TaskStatusInput({ status, setStatus }
: { status: StatusType,
  setStatus: React.Dispatch<React.SetStateAction<StatusType>>
  | ((value: StatusType) => void) }) {
  return (
    <select
      onChange={ (e) => setStatus(e.target.value as StatusType) }
      defaultValue={ status }
      className="p-2 w-1/2 rounded-md"
    >
      <option value="not started">Not Started</option>
      <option value="in progress">In Progress</option>
      <option value="completed">Completed</option>
    </select>
  );
}
