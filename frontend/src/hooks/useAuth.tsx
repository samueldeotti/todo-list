import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { api } from '../utils/apiService';

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;

    const checkAuthStatus = async () => {
      try {
        const token = localStorage.getItem('token');

        if (!token) {
          setIsAuthenticated(false);
          localStorage.removeItem('user');
          delete api.defaults.headers.common.Authorization;
          setLoading(false);
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
      } catch (err) {
        if (isMounted) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          delete api.defaults.headers.common.Authorization;
          setIsAuthenticated(false);
          toast.error('Session expired, please login again');
        }

        setTimeout(() => {
          toast.dismiss();
        }, 1000);
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();

    return () => {
      isMounted = false;
    };
  }, [navigate]);

  return { isAuthenticated, loading };
};

export default useAuth;
