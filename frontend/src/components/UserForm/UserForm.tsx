/* eslint-disable max-len */
import { Link } from 'react-router-dom';
import Form from './Form';

export interface UserData {
  username: string;
  password: string;
}

interface UserFormProps {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>, userData: UserData) => void;
  loading: boolean;
  isSignup?: boolean;
}

export default function UserForm({ handleSubmit, loading, isSignup = false }
: UserFormProps) {
  return (
    <main className="flex w-5/6 max-w-[400px] bg-white px-6 pb-4 pt-10 rounded-2xl flex-col items-center gap-2">
      <h1 className="text-xl font-semibold md:text-2xl lg:text-3xl">{isSignup ? 'Criar conta' : 'Acesse sua conta'}</h1>

      <Form loading={ loading } isSignup={ isSignup } handleSubmit={ handleSubmit } />

      <span className="text-xs font-light sm:text-sm">
        {isSignup ? 'Já tem uma conta? ' : 'Ainda não tem uma conta? '}
        <Link to={ isSignup ? '/signin' : '/signup' } className="font-semibold underline">
          {isSignup ? 'Entrar ' : 'Inscrever-se '}
        </Link>
      </span>
    </main>
  );
}
