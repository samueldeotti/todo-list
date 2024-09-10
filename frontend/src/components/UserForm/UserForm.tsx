/* eslint-disable max-len */
import { Link } from 'react-router-dom';
import Form from './Form';

export type UserData = {
  username: string;
  password: string;
};

type UserFormProps = {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>, userData: UserData) => void;
  loading: boolean;
  isSignup?: boolean;
};

export default function UserForm({ handleSubmit, loading, isSignup = false }
: UserFormProps) {
  return (
    <main className="flex w-5/6 max-w-[400px] bg-white px-6 pb-4 pt-10 rounded-2xl flex-col items-center gap-2 mx-auto absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <h1 className="text-xl font-semibold md:text-2xl lg:text-3xl">{isSignup ? 'Sign up' : 'Sign in'}</h1>

      <Form loading={ loading } isSignup={ isSignup } handleSubmit={ handleSubmit } />

      <span className="text-xs font-light sm:text-sm">
        {isSignup ? 'Already have an account? ' : 'No account? '}
        <Link to={ isSignup ? '/signin' : '/signup' } className="font-semibold underline">
          {isSignup ? 'Log in ' : 'Create account '}
        </Link>
      </span>
    </main>
  );
}
