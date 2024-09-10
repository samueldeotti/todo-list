import { useNavigate } from 'react-router-dom';
import { User } from 'lucide-react';
import useAuth from '../../hooks/useAuth';
import { UserType } from '../../types/types';
import { api } from '../../utils/apiService';

export default function Header() {
  useAuth();

  const navigate = useNavigate();

  const user:UserType = JSON.parse(localStorage.getItem('user') || '{}');

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    api.defaults.headers.Authorization = '';

    navigate('/signin');
  };

  return (
    <header className="flex justify-between p-4 bg-white items-center">
      <h1 className="text-xl italic">Todo List</h1>
      <div className="flex gap-4 items-center">
        <div className="flex gap-1 items-center">
          <User size={ 18 } />
          <p>{user.username}</p>
        </div>
        <button onClick={ handleLogout }>
          Logout
        </button>
      </div>
    </header>
  );
}
