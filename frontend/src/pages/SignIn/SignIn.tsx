/* eslint-disable react/jsx-no-bind */
import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { UserData } from '../../components/UserForm/Form';
import UserForm from '../../components/UserForm/UserForm';
import { api } from '../../utils/apiService';
import useRedirectIfAuthenticated from '../../hooks/useRedirectIfAuthenticated';

export function SignIn() {
  useRedirectIfAuthenticated();

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSigIn(event: FormEvent, userData: UserData) {
    event.preventDefault();
    setLoading(true);

    const toastId = toast.loading('Validating data...');

    // I put this in because I wanted to simulate what it would be like in production, and see the toasts, but when release it to production, remove it
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
      setTimeout(() => {
        toast.error('Invalid Credentials!');
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
