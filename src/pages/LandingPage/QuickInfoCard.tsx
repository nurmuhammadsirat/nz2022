import { Box, Flex } from '@chakra-ui/react';
import React from 'react';
import { BoxShadow } from '../../styles';
import { Accomodation } from '../../types/GoogleSheetTrip.type';

type Props = {
  accomodation?: Accomodation;
};

const QuickInfoCard = ({ accomodation }: Props) => {
  if (!accomodation) {
    return null;
  }

  const renderContent = (accomodation: Accomodation) => (
    <Flex>
      <Box>{accomodation.name}</Box>
    </Flex>
  );

  return (
    <Box ml="10px" mb="10px" p="10px" boxShadow={BoxShadow.light} w="calc(100% - 140px)" minH="200px">
      {accomodation && renderContent(accomodation)}
    </Box>
  );
};

export default QuickInfoCard;
