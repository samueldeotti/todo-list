/* eslint-disable react/jsx-no-bind */
import { FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { UserData } from '../../components/UserForm/Form';
import UserForm from '../../components/UserForm/UserForm';
import { api } from '../../utils/apiService';
import useAuth from '../../hooks/useAuth';

export function SignIn() {
  const { isAuthenticated } = useAuth();

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, []);

  async function handleSigIn(event: FormEvent, userData: UserData) {
    event.preventDefault();
    setLoading(true);

    const toastId = toast.loading('Verificando dados...');

    // I put this in because I wanted to simulate what it would be like in production, but when I release it to production, remove it
    // I refer to setTimeOut in the following way:

    try {
      const { data } = await api.post('/auth/login', { ...userData });
      localStorage.setItem('user', JSON.stringify({
        username: data.username,
        id: data.id,
      }));
      localStorage.setItem('token', data.token);
      api.defaults.headers.common.Authorization = `Basic ${data.token}`;
      setTimeout(() => {
        navigate('/tasks');
      }, 1001);
    } catch (error: any) {
      console.log(error);
      setTimeout(() => {
        toast.error('Dados inválidos!');
      }, 1001);
    } finally {
      setTimeout(() => {
        toast.dismiss(toastId);
        setLoading(false);
      }, 1000);
    }
  }

  return <UserForm handleSubmit={ handleSigIn } loading={ loading } />;
}
