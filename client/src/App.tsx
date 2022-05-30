import * as React from 'react';
import {
  Button,
  ChakraProvider,
  extendTheme,
  useColorMode,
} from '@chakra-ui/react';
import Navbar from './components/Navbar';
import AppProviders from './components/AppProviders';
import Routes from './Routes';
import { BrowserRouter } from 'react-router-dom';
import { ColorModeSwitcher } from './ColorModeSwitcher';

// 2. Extend the theme to include custom colors, fonts, etc
const colors = {
  brand: {
    900: '#1a365d',
    800: '#153e75',
    700: '#2a69ac',
  },
};
const theme = extendTheme({ config: { initialColorMode: 'dark' }, colors });

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
