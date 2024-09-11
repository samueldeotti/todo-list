export default function TaskTitleInput({ value, setValue }
: { value: string, setValue: React.Dispatch<React.SetStateAction<string>> }) {
  return (
    <input
      className="bg-transparent p-2
      rounded-md outline outline-2 focus:outline-black "
      type="text"
      placeholder="Task title"
      value={ value }
      onChange={ (e) => setValue(e.target.value) }
    />
  );
}
