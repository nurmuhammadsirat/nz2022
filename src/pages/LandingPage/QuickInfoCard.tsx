import { Box, Flex } from '@chakra-ui/react';
import React from 'react';
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
    <Box p="8px" minH="200px">
      {accomodation && renderContent(accomodation)}
    </Box>
  );
};

export default QuickInfoCard;
