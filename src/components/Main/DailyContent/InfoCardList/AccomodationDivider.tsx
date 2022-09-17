import { Box, Flex, Text } from '@chakra-ui/react';
import { faEllipsis, faCarSide } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Colors } from '../../../../styles';

type Props = {
  checkInLocation: string;
  checkOutLocation: string;
};

const AccomodationDivider = ({ checkInLocation, checkOutLocation }: Props) => {
  return (
    <Flex h="40px" w="100%" justifyContent="space-between" alignItems="center" color={Colors.driving}>
      <Box w="min-content">
        <Text as="i" fontWeight="bold">
          {checkOutLocation}
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
      <Box w="min-content">
        <Text as="i" fontWeight="bold">
          {checkInLocation}
        </Text>
      </Box>
    </Flex>
  );
};

export default AccomodationDivider;
