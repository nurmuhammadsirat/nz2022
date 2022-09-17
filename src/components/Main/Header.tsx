import { Box, Flex, Text } from '@chakra-ui/react';
import React from 'react';
import backgroundImage from '../../assets/negative-space-truck-road-mountains.jpg';
import { Colors } from '../../styles';

type Props = {
  height: number;
};

const Header = ({ height }: Props) => {
  const backgroundImageProps = {
    backgroundImage,
    backgroundPosition: 'center',
  };

  return (
    <Box h={`${height}px`} flexDirection="column" justifyContent="center" {...backgroundImageProps}>
      <Flex w="100%" h={height} flexDirection="column" justifyContent="center" backgroundColor="rgb(0, 0, 0, 0.4)">
        <Text align="center" fontSize="40px" color={Colors.headerText}>
          New Zealand 2022
        </Text>
        <Text align="center" fontSize="20px" color={Colors.headerText}>
          Nov 30 - Dec 26
        </Text>
      </Flex>
    </Box>
  );
};

export default Header;
