// PrivateRoutes.js
import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

export default function PrivateRoutes() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <div />;

  return isAuthenticated ? <Outlet /> : <Navigate to="/signin" />;
}
