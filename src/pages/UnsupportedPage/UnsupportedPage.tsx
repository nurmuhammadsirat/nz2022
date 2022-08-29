import { Flex, Text } from '@chakra-ui/react';
import React from 'react';

const UnsupportedPage = () => (
  <Flex w="100vw" h="100vh" flexDirection="column" justifyContent="center" alignItems="center">
    <Text>App is not supported on desktop.</Text>
    <Text>Please resize or open on your mobile phone.</Text>
  </Flex>
);

export default UnsupportedPage;
