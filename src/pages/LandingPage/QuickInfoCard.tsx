import { Box, Flex, Text } from '@chakra-ui/react';
import React from 'react';
import { Colors } from '../../styles';
import { Accomodation } from '../../types/GoogleSheetTrip.type';

type Props = {
  accomodation?: Accomodation;
};

const QuickInfoCard = ({ accomodation }: Props) => {
  if (!accomodation) {
    return null;
  }

  const renderContent = (accomodation: Accomodation) => (
    <Flex flexDirection="column" gap="5px">
      <Box>
        <Text as="i" fontSize="xs" color={Colors.infoTitle}>
          Accomodation
        </Text>
        <Text fontSize="sm">{accomodation.name}</Text>
      </Box>
      <Flex justifyContent="space-between">
        <Box>
          <Text as="i" fontSize="xs" color={Colors.infoTitle}>
            Check In
          </Text>
          <Text fontSize="sm">{accomodation.checkIn}</Text>
        </Box>
        <Box>
          <Text as="i" fontSize="xs" color={Colors.infoTitle}>
            Check Out
          </Text>
          <Text fontSize="sm">{accomodation.checkOut}</Text>
        </Box>
      </Flex>
    </Flex>
  );

  return (
    <Box pl="15px" minH="250px" w="calc(100% - 90px)">
      {accomodation && renderContent(accomodation)}
    </Box>
  );
};

export default QuickInfoCard;
