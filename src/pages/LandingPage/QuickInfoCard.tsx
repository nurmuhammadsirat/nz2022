/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, Flex, Text } from '@chakra-ui/react';
import React, { useCallback, useMemo } from 'react';
import { Colors } from '../../styles';
import { Accomodation } from '../../types/GoogleSheetTrip.type';

type Props = {
  date: string;
  checkInAccomodation?: Accomodation;
  checkOutAccomodation?: Accomodation;
};

const ACCOMTYPE: { [key: string]: { name: string; color: string; time: string } } = {
  checkout: {
    name: 'Checking Out',
    color: Colors.trafficLight.red,
    time: '10:00 AM',
  },
  checkin: {
    name: 'Checking In',
    color: Colors.trafficLight.green,
    time: '3:00 PM',
  },
  current: {
    name: 'Currently At',
    color: Colors.trafficLight.amber,
    time: '-',
  },
};

const QuickInfoCard = ({ date, checkInAccomodation, checkOutAccomodation }: Props) => {
  const isCheckingIn = useMemo(() => date === checkInAccomodation?.checkIn, [checkInAccomodation, date]);

  const accomodationInfo = useCallback(
    (acc: Accomodation, type: string) => (
      <Flex justifyContent="space-between">
        <Box w="200px" h="75px">
          <Text as="i" fontSize="sm" fontWeight="bold" color={ACCOMTYPE[type].color}>
            {ACCOMTYPE[type].name}
          </Text>
          <Text>{acc.name}</Text>
        </Box>
        {type !== 'current' && (
          <Box w="70px">
            <Text as="i" fontSize="sm" fontWeight="bold" color={ACCOMTYPE[type].color}>
              Time
            </Text>
            <Text>{ACCOMTYPE[type].time}</Text>
          </Box>
        )}
      </Flex>
    ),
    [],
  );

  return (
    <Flex flexDirection="column" gap="5px" pl="15px" minH="250px" w="calc(100% - 90px)">
      {checkOutAccomodation && accomodationInfo(checkOutAccomodation, 'checkout')}
      {checkInAccomodation && isCheckingIn && accomodationInfo(checkInAccomodation, 'checkin')}
      {checkInAccomodation && !isCheckingIn && accomodationInfo(checkInAccomodation, 'current')}
    </Flex>
  );
};

export default QuickInfoCard;
