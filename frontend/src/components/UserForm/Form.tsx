import React, { useState } from 'react';
import { Loader, Loader2 } from 'lucide-react';
import Input from '../Input/Input';

interface FormProps {
  loading: boolean;
  isSignup?: boolean;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>, userData: UserData) => void;
}

export interface UserData {
  username: string;
  password: string;
}

export default function Form({ loading, handleSubmit, isSignup = false }: FormProps) {
  const initialUserData = {
    username: '',
    password: '',
  };

  const [userData, setUserData] = useState<UserData>(initialUserData);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };

  const verifyName = (name: string) => name.length >= 3;
  const verifyPassword = (password: string) => password.length >= 4;

  return (
    <form onSubmit={ (e) => handleSubmit(e, userData) } className="flex flex-col mt-2 w-5/6">
      <Input
        verifyValue={ verifyName }
        type="text"
        value={ userData.username }
        name="username"
        onChange={ handleChange }
      >
        Usuário
      </Input>
      <Input
        verifyValue={ verifyPassword }
        type="password"
        value={ userData.password }
        name="password"
        onChange={ handleChange }
      >
        Senha
      </Input>

      <button
        type="submit"
        disabled={ loading || !verifyPassword(userData.password)
          || (isSignup && !verifyName(userData.username)) }
        className={ `p-6 bg-zinc-900 text-white hover:bg-zinc-900/90
          transition disabled:cursor-not-allowed 
           disabled:bg-zinc-700 mb-4 rounded-lg 
           ${loading && 'cursor-not-allowed'} md:text-lg` }
      >
        {
            loading ? <Loader2 className="animate-spin mr-2 w-full" size={ 24 } />
              : isSignup ? 'Criar conta' : 'Entrar'
          }
      </button>
    </form>
  );
}
