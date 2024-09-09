import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { api } from '../utils/apiService';

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthStatus = async () => {
      console.log('Checking auth status');

      try {
        const token = localStorage.getItem('token');

        if (!token) {
          setIsAuthenticated(false);
          return;
        }

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
        api.defaults.headers.common.Authorization = '';
        toast.error('Sessão expirada, faça login novamente');

        navigate('/signin');
        setTimeout(() => {
          toast.dismiss();
        }, 1000);
      }
    };

    checkAuthStatus();
  }, [navigate]);

  return { isAuthenticated };
};

export default useAuth;
