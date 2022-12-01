import { Navigate } from 'react-router-dom';

interface Props {
  children: React.ReactElement;
}
export const ProtectedRoute = ({ children }: Props) => {
  const auth = localStorage.getItem('jwt') || null;

  return auth ? children : <Navigate to="/login" />;
};
