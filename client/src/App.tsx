import * as React from 'react';
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  useColorMode,
  extendTheme,
} from '@chakra-ui/react';
import Navbar from './components/Navbar';
import TableC from './components/Table';
import FormPage from './pages/FormPage';
import Home from './pages/Home';
import Clash from './pages/Clash';
import UserContext from './context/auth';
import AppProviders from './components/AppProviders';
import Login from './pages/Auth/Login';
import SignUp from './pages/Auth/SignUp';
import { useContext } from 'react';
import Routes from './Routes';
import { BrowserRouter } from 'react-router-dom';

// 2. Extend the theme to include custom colors, fonts, etc
const colors = {
  brand: {
    900: '#1a365d',
    800: '#153e75',
    700: '#2a69ac',
  },
};
const theme = extendTheme({ colors });

export const App = () => {
  return (
    <BrowserRouter>
      <AppProviders>
        <ChakraProvider theme={theme}>
          <Navbar />
          <Routes />
        </ChakraProvider>
      </AppProviders>
    </BrowserRouter>
  );
};
