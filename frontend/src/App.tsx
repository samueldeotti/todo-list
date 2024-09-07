import { Route, Routes } from 'react-router-dom';
import Initial from './pages/Initial';
import { SignUp } from './pages/SignUp/SignUp';
import { SignIn } from './pages/SignIn/SignIn';
import Tasks from './pages/Tasks/Tasks';

function App() {
  return (
    <Routes>
      <Route path="/" element={ <Initial /> } />
      <Route path="/signup" element={ <SignUp /> } />
      <Route path="/signin" element={ <SignIn /> } />
      <Route path="/tasks" element={ <Tasks /> } />
    </Routes>
  );
}

export default App;
