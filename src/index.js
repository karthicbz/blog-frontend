import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { ChakraProvider } from '@chakra-ui/react';
import { Router } from './components/Router';
import { ColorModeScript } from '@chakra-ui/react';
import theme from './components/theme';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {!localStorage.getItem('chakra-ui-color-mode')?localStorage.setItem('chakra-ui-color-mode', 'dark'):''}
    <ChakraProvider>
      <Router />
    </ChakraProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
