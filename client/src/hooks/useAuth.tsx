import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router';
import { User } from '../context/auth';
import { getUser, signIn, signOut, signUp } from '../utils/api/Axios';

const useAuth = () => {
  const [user, setUser] = useState<User>();
  const [error, setError] = useState({ show: false, message: '' });
  const navigate = useNavigate();

  const login = useCallback((username, password) => {
    //Fetch User from API
    //For now ill setuser to 1
    console.log(username, password);
    signIn(username, password)
      .then(({ data }) => {
        console.log('At Data part');
        console.log(user);
        console.log(data);
        setUser(data);
        // navigate('/');
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
    signOut()
      .then(() => setUser(undefined))
      .catch(console.error);
  }, [user?.id]);

  const signup = useCallback((username, password) => {
    signUp(username, password)
      .then(({ data }) => {
        setUser(data);
        navigate('/');
      })
      .catch((err) => {
        const res = err.response;
        console.log(res);
        console.log('Error');
        setError({ show: true, message: res.data.message });
      });
  }, []);

  useEffect(() => {
    // login();
    getUser()
      .then(({ data }) => {
        setUser(data);
      })
      .catch((err) => console.error(err));
  }, [login, signup]); //Login & Logout only change on mount so this is only called once.

  return { user, login, logout, signup, error, setError };
};

export default useAuth;
