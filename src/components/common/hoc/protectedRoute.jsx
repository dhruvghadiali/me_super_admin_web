import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { SIGN_IN } from '@MEUtils/pageRoutes';

const ProtectedRoute = ({ children }) => {
  const { token } = useSelector((state) => state.authentication);

  if (!token) {
    return <Navigate to={SIGN_IN} replace />;
  }

  return children;
};

export default ProtectedRoute;
