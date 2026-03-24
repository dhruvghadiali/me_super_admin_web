import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PublicRoute = ({ children, redirectAuthenticated = false, redirectTo = '/' }) => {
  const { token } = useSelector((state) => state.authentication);

  if (redirectAuthenticated && token) {
    return <Navigate to={redirectTo} replace />;
  }

  return children;
};

export default PublicRoute;
