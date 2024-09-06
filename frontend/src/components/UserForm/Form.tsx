import React, { useState } from 'react';
import Input from '../Input/Input';

interface FormProps {
  loading: boolean;
  isSignup?: boolean;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>, userData: UserData) => void;
}

export interface UserData {
  name: string;
  password: string;
}

export default function Form({ loading, handleSubmit, isSignup = false }: FormProps) {
  const initialUserData = {
    name: '',
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
    <form onSubmit={ (e) => handleSubmit(e, userData) } className="flex flex-col mt-2">
      <Input
        verifyValue={ verifyName }
        type="text"
        value={ userData.name }
        name="name"
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
          || (isSignup && !verifyName(userData.name)) }
        className={ `p-6 bg-zinc-900 text-white hover:bg-zinc-900/90 
          transition mb-4 rounded-lg ${loading && 'cursor-not-allowed'} md:text-lg` }
      >
        {loading && 'carregando'}
        {isSignup ? 'Criar conta' : 'Entrar'}
      </button>
    </form>
  );
}
