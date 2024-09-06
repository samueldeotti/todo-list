import { Route, Routes } from 'react-router-dom';
import Initial from './pages/Initial';

function App() {
  return (
    <Routes>
      <Route path="/" element={ <Initial /> } />
    </Routes>
  );
}

export default App;
