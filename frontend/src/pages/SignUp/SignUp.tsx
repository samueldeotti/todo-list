/* eslint-disable react/jsx-no-bind */
import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { UserData } from '../../components/UserForm/Form';
import UserForm from '../../components/UserForm/UserForm';
import { api } from '../../utils/apiService';
import useRedirectIfAuthenticated from '../../hooks/useRedirectIfAuthenticated';

export function SignUp() {
  useRedirectIfAuthenticated();

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSignup(event: FormEvent, userData: UserData) {
    event.preventDefault();
    setLoading(true);
    const toastId = toast.loading('Criando conta...');

    // I put this in, because I wanted to simulate what it would be like in production, but when I release it to production, remove it
    // I refer to setTimeOut in the following way:

    try {
      await api.post('/users/create', { ...userData });

      setTimeout(() => {
        toast.success('Conta criada com sucesso!');
      }, 1001);
      setTimeout(() => {
        navigate('/signin');
      }, 1500);
    } catch (error: any) {
      setTimeout(() => {
        // if (error.response.status === 409) {
        //   toast.error('Ja existem alguem com esse usuário!');
        // }
        console.log(error);
        toast.error('Algo deu errado!');
      }, 1001);
    } finally {
      setTimeout(() => {
        toast.dismiss(toastId);
        setLoading(false);
      }, 1000);
    }
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }

  return <UserForm handleSubmit={ handleSignup } isSignup loading={ loading } />;
}
