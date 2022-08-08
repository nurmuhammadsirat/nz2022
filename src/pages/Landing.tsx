import React from 'react';
import styled from 'styled-components';
import Box from '../components/Box';
import Flex from '../components/Flex';

const Landing = () => {
  return (
    <ViewContainer justifyContent='center' alignItems='center'>
      <Content>hello world!</Content>
    </ViewContainer>
  );
};

const ViewContainer = styled(Flex)`
  width: 100vw;
  height: 100vh;
`;

const Content = styled(Box)`
  height: 100%;
  width: 60%;
`;

export default Landing;
