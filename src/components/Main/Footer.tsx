import { Center, Flex } from '@chakra-ui/react';
import { faRotateRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Colors } from '../../styles';

type Props = {
  height: number;
  onReloadClick: () => void;
};

const Footer = ({ height, onReloadClick }: Props) => {
  return (
    <Flex
      justifyContent="space-around"
      alignItems="center"
      h={`${height}px`}
      position="sticky"
      bottom="0"
      backgroundColor={Colors.footerBackground}
      color={Colors.footerText}
    >
      <Center h="50px" w="50px" onClick={onReloadClick}>
        <FontAwesomeIcon icon={faRotateRight} />
      </Center>
    </Flex>
  );
};

export default Footer;
