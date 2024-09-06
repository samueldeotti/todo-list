import { FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserData } from '../../components/UserForm/Form';
import UserForm from '../../components/UserForm/UserForm';

export function SignUp() {
  // const { isAuthenticated } = useAuth();

  const isAuthenticated = false;

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, []);

  async function handleSignup(event: FormEvent, userData: UserData) {
    setLoading(true);
    event.preventDefault();
    // const toastId = toast.loading('Criando conta...');

    // I put this in because I wanted to simulate what it would be like in production, but when I release it to production, remove it
    // I refer to setTimeOut in the following way:

    // try {
    //  await userApi.post('/users/create', userData);
    //
    //  setTimeout(() => {
    //    toast.success('Conta criada com sucesso!');
    //  }, 1001);
    //  setTimeout(() => {
    //    navigate('/login');
    //  }, 1500);
    // } catch (error: any) {
    //  setTimeout(() => {
    //    if (error.response.status === 401) {
    //      toast.error('Email já cadastrado!');
    //      return;
    //    }
    //    toast.error('Algo deu errado!');
    //  }, 1001);
    // } finally {
    //  setTimeout(() => {
    //    toast.dismiss(toastId);
    //    setLoading(false);
    //  }, 1000);
    // }
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }

  return <UserForm handleSubmit={ handleSignup } isSignup loading={ loading } />;
}
