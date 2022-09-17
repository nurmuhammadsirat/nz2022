import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { Main } from './components';

const App = () => {
  const queryClient = new QueryClient();

  return (
    <ChakraProvider>
      <QueryClientProvider client={queryClient}>
        <Main />
      </QueryClientProvider>
    </ChakraProvider>
  );
};

export default App;
