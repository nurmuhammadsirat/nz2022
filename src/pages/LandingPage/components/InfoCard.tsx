import { Box, Flex, Text } from '@chakra-ui/react';
import React, { ReactNode } from 'react';
import { BoxShadow, Colors } from '../../../styles';

type Props = {
  title: string;
  children: ReactNode;
};

const InfoCard = ({ title, children }: Props) => {
  return (
    <Box boxShadow={BoxShadow.light} borderRadius="8px" overflow="hidden">
      <SectionTitle title={title} />
      <Flex flexDirection="column" gap="16px" p="8px">
        {children}
      </Flex>
    </Box>
  );
};

const SectionTitle = ({ title }: { title: string }) => (
  <Box backgroundColor={Colors.sectionTitle.background} color={Colors.sectionTitle.text} textAlign="center" p="4px">
    <Text fontSize="22px" fontWeight="800">
      {title}
    </Text>
  </Box>
);

export default InfoCard;
