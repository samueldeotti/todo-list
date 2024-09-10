// useRedirectIfAuthenticated.js
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../utils/apiService';

const useRedirectIfAuthenticated = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');

      if (!token) return;

      api.defaults.headers.common.Authorization = `Bearer ${token}`;

      try {
        const response = await api.post('/auth/status', token);
        if (response.status === 200) {
          navigate('/tasks'); // Redireciona para /tasks se o token for válido
        }
      } catch {
        localStorage.removeItem('token');
        delete api.defaults.headers.common.Authorization;
      }
    };

    checkAuth();
  }, [navigate]);
};

export default useRedirectIfAuthenticated;
