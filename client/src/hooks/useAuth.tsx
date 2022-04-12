import { useState, useEffect, useCallback } from 'react';
import { User } from '../context/auth';

const useAuth = () => {
  const [user, setUser] = useState<User>();

  const login = useCallback(() => {
    //Fetch User from API
    //For now ill setuser to 1
    setUser({ id: 1, username: 'Johnson', avatarUrl: '' });
  }, []);

  const logout = useCallback(() => {
    //Call Logout Endpoint
    setUser(undefined);
  }, [user?.id]);

  useEffect(() => {
    login();
  }, [login, logout]); //Login & Logout only change on mount so this is only called once.

  return { user, login, logout };
};

export default useAuth;
