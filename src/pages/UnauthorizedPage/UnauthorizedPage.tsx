import { Flex, Text } from '@chakra-ui/react';
import React from 'react';

const UnauthorizedPage = () => {
  return (
    <Flex w="100vw" h="100vh" flexDirection="column" justifyContent="center" alignItems="center">
      <Text>You are not authorized to view this page.</Text>
    </Flex>
  );
};

export default UnauthorizedPage;
