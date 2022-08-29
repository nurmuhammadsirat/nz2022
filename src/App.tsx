import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import useIsAuthorized from './hooks/useIsAuthorized';
import { LandingPage, UnauthorizedPage } from './pages';

const App = () => {
  const queryClient = new QueryClient();
  const isAuthorized = useIsAuthorized();

  const app = (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );

  return <ChakraProvider>{isAuthorized ? app : <UnauthorizedPage />}</ChakraProvider>;
};

export default App;
