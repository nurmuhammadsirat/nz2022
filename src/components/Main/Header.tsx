import { Box, Center, Collapse, Flex } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import backgroundImage from '../../assets/negative-space-truck-road-mountains.jpg';
import { Colors } from '../../styles';
import { DATES } from '../../utils';
import Countdown from './Countdown';

type Props = {
  height: number;
};

const innerHeight = 70;

const Header = ({ height }: Props) => {
  const [showDate, setShowDate] = useState(true);

  useEffect(() => {
    const print = () => {
      if (window.scrollY > 30) {
        setShowDate(false);
      } else {
        setShowDate(true);
      }
    };

    window.addEventListener('scroll', print);

    return () => {
      window.removeEventListener('scroll', print);
    };
  }, []);

  return (
    <>
      <Flex
        h={`${height}px`}
        flexDirection="column"
        justifyContent="center"
        backgroundImage={backgroundImage}
        backgroundPosition="center"
        backgroundSize="cover"
        position="sticky"
        top={`${innerHeight - height}px`}
        zIndex={2}
      >
        <Flex w="100%" h={height} flexDirection="column" justifyContent="center" backgroundColor="rgb(0, 0, 0, 0.4)">
          <Box h={`${innerHeight}px`} position="sticky" top="0">
            <Center fontSize="40px" color={Colors.headerText}>
              New Zealand 2022
            </Center>
            <Collapse in={showDate}>
              <Center fontSize="20px" color={Colors.headerText}>
                Nov 30 - Dec 26
              </Center>
            </Collapse>
          </Box>
        </Flex>
      </Flex>
      <Countdown firstDayDate={DATES[0]} />
    </>
  );
};

export default Header;
