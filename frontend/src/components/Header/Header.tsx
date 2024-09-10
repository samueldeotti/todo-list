import { useNavigate } from 'react-router-dom';
import { User } from 'lucide-react';
import { UserType } from '../../types/types';
import { api } from '../../utils/apiService';

export default function Header() {
  const navigate = useNavigate();

  const user:UserType = JSON.parse(localStorage.getItem('user') || '{}');

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    delete api.defaults.headers.Authorization;

    navigate('/signin');
  };

  return (
    <header className=" py-4 bg-white items-center w-full">
      <div
        className="flex justify-between md:max-w-[760px]
       lg:max-w-[1200px] m-auto px-4 sm:px-12 items-center"
      >
        <h1 className="text-xl italic font-bold">Todo List</h1>
        <div className="flex gap-4 items-center">
          <div className="flex gap-1 items-center">
            <User size={ 18 } />
            <p>{user.username}</p>
          </div>
          <button
            onClick={ handleLogout }
            className="bg-slate-800 p-2 rounded-md text-white"
          >
            Logout
          </button>
        </div>

      </div>
    </header>
  );
}
