import React from 'react';
import { Navigate, useLocation } from 'react-router';
import { Preloader } from '../ui/preloader';
import { selectUser, selectUserAuthChecked } from '../../services/userSlice';
import { useSelector } from '../../services/store';

type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children: React.ReactElement;
};

export const ProtectedRoute = ({ onlyUnAuth, children }: ProtectedRouteProps) => {
  
  const isAuthChecked = useSelector(selectUserAuthChecked);
  const user = useSelector(selectUser);
  const location = useLocation();

  if (!isAuthChecked) {
    return <Preloader />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate replace to='/login' state={{ from: location }} />;
  }

  if (onlyUnAuth && user) {
        const from  = location.state?.from || { pathname: '/' };

        return <Navigate replace to={from} />;
  }

  return children;
};
