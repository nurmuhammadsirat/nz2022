import { Center, Spinner } from '@chakra-ui/react';
import React from 'react';

type Props = {
  height?: string;
  width?: string;
};

const SpinnerPage = ({ height = '100vh', width = '100vw' }: Props) => (
  <Center h={height} w={width}>
    <Spinner />
  </Center>
);

export default SpinnerPage;
