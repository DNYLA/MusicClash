import React, { useContext } from 'react';
import { BrowserRouter, Routes as RouteSwitch, Route } from 'react-router-dom';
import UserContext from './context/auth';
import Login from './pages/Auth/Login';
import SignUp from './pages/Auth/SignUp';
import Clash from './pages/Clash/Clash';
import FormPage from './pages/FormPage';
import Heardle from './pages/Heardle/Heardle';
import Home from './pages/Home/Home';

export default function Routes() {
  const { isLoggedIn } = useContext(UserContext);

  return isLoggedIn ? (
    <RouteSwitch>
      <Route path="/" element={<Home />} />
      <Route path="create" element={<FormPage />} />
      <Route path="/clash/:id" element={<Clash />} />
      <Route path="/heardle/:artist" element={<Heardle />} />
    </RouteSwitch>
  ) : (
    <RouteSwitch>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="create" element={<FormPage />} />
      <Route path="/clash/:id" element={<Clash />} />
      <Route path="/heardle/:artist" element={<Heardle />} />
    </RouteSwitch>
  );
}
