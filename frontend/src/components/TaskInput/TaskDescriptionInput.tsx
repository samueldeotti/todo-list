import React from 'react';

export default function TaskDescriptionInput({ value, setValue }
: { value: string, setValue: React.Dispatch<React.SetStateAction<string>> }) {
  return (
    <textarea
      className="bg-transparent p-2 rounded-md
      outline outline-2 focus:outline-black max-h-[120px]"
      placeholder="Task description"
      value={ value }
      onChange={ (e) => setValue(e.target.value) }
    />
  );
}
