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
import WithSubnavigation from './components/Navbar';
import Dsll from './components/Navbar2';
import TableC from './components/Table';
import FormPage from './pages/FormPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Clash from './pages/Clash';
import UserContext from './context/auth';
import AppProviders from './components/AppProviders';

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
          <WithSubnavigation />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="create" element={<FormPage />} />
            <Route path="/clash/:id" element={<Clash />} />
          </Routes>
        </ChakraProvider>
      </AppProviders>
    </BrowserRouter>
  );
};
