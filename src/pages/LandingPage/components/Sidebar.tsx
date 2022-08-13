import { Flex } from '@chakra-ui/react';
import React from 'react';
import DateBubble from './DateBubble';

type Props = {
  date: string;
};

const Sidebar = ({ date }: Props) => {
  return (
    <Flex flexDirection="column" justifyContent="space-between" h="100%" w="90px">
      <DateBubble date={date} />
    </Flex>
  );
};

export default Sidebar;
