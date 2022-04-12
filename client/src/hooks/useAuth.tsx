import { useState, useEffect, useCallback } from 'react';
import { User } from '../context/auth';
import { getUser, signIn } from '../utils/api/Axios';

const useAuth = () => {
  const [user, setUser] = useState<User>();

  const login = useCallback((username, password) => {
    //Fetch User from API
    //For now ill setuser to 1
    console.log(username, password);
    signIn(username, password)
      .then(({ data, status }) => {
        console.log(status);
        console.log(data);
        setUser(data);
      })
      .catch((err) => {
        const res = err.response;
        if (res.status === 401) {
          console.log('Invalid Credentails');
        }
      });
  }, []);

  const logout = useCallback(() => {
    //Call Logout Endpoint
    setUser(undefined);
  }, [user?.id]);

  useEffect(() => {
    // login();
    getUser()
      .then(({ data }) => {
        setUser(data);
      })
      .catch((err) => console.error(err));
  }, [login, logout]); //Login & Logout only change on mount so this is only called once.

  return { user, login, logout };
};

export default useAuth;
