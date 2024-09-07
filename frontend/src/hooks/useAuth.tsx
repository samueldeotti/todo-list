import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { api } from '../utils/apiService';

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const token = localStorage.getItem('token');

        if (!token) {
          setIsAuthenticated(false);
          return;
        }

        console.log(token);

        api.defaults.headers.common.Authorization = `Bearer ${token}`;

        const response = await api.post('/auth/status', token);

        if (response.status === 200) {
          setIsAuthenticated(true);
          navigate('/tasks');
          return;
        }
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        navigate('/signin');
      } catch (err) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setIsAuthenticated(false);
        toast.error('Sessão expirada, faça login novamente');

        setTimeout(() => {
          navigate('/signin');
          toast.dismiss();
        }, 1000);
      }
    };

    checkAuthStatus();
  }, [navigate]);

  return { isAuthenticated };
};

export default useAuth;
