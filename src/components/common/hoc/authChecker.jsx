import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { setLogin } from '@MERedux/authentication/authenticationSlice';
import { getAuthData } from '@MEHelpers/authHelpers';

const AuthChecker = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const authData = getAuthData();

    if (authData) {
      dispatch(setLogin({ 
        user: authData.user, 
        token: authData.token,
      }));
    }
  }, [dispatch]);

  return children;
};

export default AuthChecker;
