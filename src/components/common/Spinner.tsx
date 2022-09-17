import { Center, Spinner as SpinningWheel } from '@chakra-ui/react';
import React from 'react';

type Props = {
  height?: string;
  width?: string;
};

const Spinner = ({ height = '100vh' }: Props) => (
  <Center h={height}>
    <SpinningWheel />
  </Center>
);

export default Spinner;
