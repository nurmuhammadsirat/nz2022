import { Flex, Center } from '@chakra-ui/react';
import React from 'react';
import { Colors } from '../../../styles';

type Props = {
  date: string;
};

const DateBubble = ({ date }: Props) => {
  return (
    <Flex
      h="90px"
      w="90px"
      borderRadius="45px"
      backgroundColor={Colors.dateBackground}
      flexDirection="column"
      justifyContent="center"
    >
      <Center color="white" fontSize="22px" fontWeight="700">
        {date.split('-')[1]}
      </Center>
      <Center color="white" fontSize="32px" fontWeight="800">
        {date.split('-')[0]}
      </Center>
    </Flex>
  );
};

export default DateBubble;
