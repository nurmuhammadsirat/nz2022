/* eslint-disable @typescript-eslint/no-unused-vars */
import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import useIsAuthorized from './hooks/useIsAuthorized';
import useIsMobile from './hooks/useIsMobile';
import { LandingPage, Router, UnauthorizedPage, UnsupportedPage } from './pages';
import { SpinnerPage } from './pages/SpinnerPage';

const App = () => {
  const queryClient = new QueryClient();
  // const isMobile = useIsMobile();

  // if (!isMobile) {
  //   return (
  //     <ChakraProvider>
  //       <UnsupportedPage />
  //     </ChakraProvider>
  //   );
  // }

  return (
    <ChakraProvider>
      <QueryClientProvider client={queryClient}>
        <Router />
      </QueryClientProvider>
    </ChakraProvider>
  );
};

export default App;
