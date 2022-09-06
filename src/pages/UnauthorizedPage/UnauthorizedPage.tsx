import { Box, Button, Flex, Input, Text } from '@chakra-ui/react';
import React, { ChangeEvent, useState } from 'react';
import { setAccessCode } from '../../utils';

const UnauthorizedPage = () => {
  const [value, setValue] = useState('');

  const handleClick = () => {
    setAccessCode(value);
    window.location.reload();
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => setValue(event.target.value);

  return (
    <Flex w="100vw" h="100vh" flexDirection="column" gap="15px" justifyContent="center" alignItems="center">
      <Text>Please enter access code</Text>
      <Box width="175px">
        <Input size="lg" value={value} onChange={handleChange} />
      </Box>
      <Button colorScheme="teal" size="lg" onClick={handleClick}>
        Submit
      </Button>
    </Flex>
  );
};

export default UnauthorizedPage;
