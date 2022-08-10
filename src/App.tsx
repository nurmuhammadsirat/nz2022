import { ChakraProvider, Flex, Text } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import useIsMobile from './hooks/useIsMobile';
import { LandingPage } from './pages';

const App = () => {
  const queryClient = new QueryClient();
  const isMobile = useIsMobile();

  const app = (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );

  const unsupported = (
    <Flex w="100vw" h="100vh" flexDirection="column" justifyContent="center" alignItems="center">
      <Text>App is not supported on desktop.</Text>
      <Text>Please resize or open on your mobile phone.</Text>
    </Flex>
  );

  return <ChakraProvider>{isMobile ? app : unsupported}</ChakraProvider>;
};

export default App;
