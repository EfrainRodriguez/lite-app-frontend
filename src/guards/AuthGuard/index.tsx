import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

import { useCustomSelector } from '@/redux/store';

interface AuthGuardProps {
  children: ReactNode;
}

const AuthGuard = ({ children }: AuthGuardProps) => {
  const { accessToken } = useCustomSelector((state) => state.auth);

  const isAuthenticated = accessToken !== null;

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

export default AuthGuard;
