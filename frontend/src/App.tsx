import { Route, Routes } from 'react-router-dom';
import { SignUp } from './pages/SignUp/SignUp';
import { SignIn } from './pages/SignIn/SignIn';
import Tasks from './pages/Tasks/Tasks';
import PrivateRoutes from './pages/PrivateRoutes/PrivateRoutes';

function App() {
  return (
    <Routes>
      <Route path="/signup" element={ <SignUp /> } />
      <Route path="/signin" element={ <SignIn /> } />

      <Route path="" element={ <PrivateRoutes /> }>
        <Route path="/tasks" element={ <Tasks /> } />
      </Route>
    </Routes>
  );
}

export default App;
