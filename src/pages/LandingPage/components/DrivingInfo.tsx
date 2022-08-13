import { Box, Flex, Text } from '@chakra-ui/react';
import { faEllipsis, faCarSide } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Colors } from '../../../styles';
import { Accomodation } from '../../../types/GoogleSheetTrip.type';

type Props = {
  checkInAccomodation: Accomodation;
  checkOutAccomodation: Accomodation;
};

const DrivingInfo = ({ checkInAccomodation, checkOutAccomodation }: Props) => {
  return (
    <Flex h="40px" w="100%" justifyContent="space-between" alignItems="center" color={Colors.driving}>
      <Box>
        <Text as="i" fontWeight="bold">
          {checkOutAccomodation!.location}
        </Text>
      </Box>
      <Box>
        <FontAwesomeIcon icon={faEllipsis} />
      </Box>
      <Box>
        <FontAwesomeIcon icon={faCarSide} />
      </Box>
      <Box>
        <FontAwesomeIcon icon={faEllipsis} />
      </Box>
      <Box>
        <Text as="i" fontWeight="bold">
          {checkInAccomodation!.location}
        </Text>
      </Box>
    </Flex>
  );
};

export default DrivingInfo;
