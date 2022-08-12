import { Box, Flex, IconButton, Text } from '@chakra-ui/react';
import { faAirbnb, IconDefinition } from '@fortawesome/free-brands-svg-icons';
import { faCampground, faCarSide, faEllipsis, faHotel, faMapLocationDot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useCallback, useMemo } from 'react';
import { Colors, Fonts } from '../../styles';
import { Accomodation } from '../../types/GoogleSheetTrip.type';

type Props = {
  date: string;
  checkInAccomodation?: Accomodation;
  checkOutAccomodation?: Accomodation;
};

const ACCOMTYPE: { [key: string]: { name: string; color: string; time: string; showIcon: boolean } } = {
  checkout: {
    name: 'Checking Out @ 10:00 am',
    color: Colors.trafficLight.red,
    time: '10:00 AM',
    showIcon: false,
  },
  checkin: {
    name: 'Checking In @ 3:00 pm',
    color: Colors.trafficLight.green,
    time: '3:00 PM',
    showIcon: true,
  },
  current: {
    name: 'Currently At',
    color: Colors.trafficLight.amber,
    time: '-',
    showIcon: true,
  },
};

const iconType: { [key: string]: IconDefinition } = {
  Airbnb: faAirbnb,
  'Powered Site': faCampground,
};

const QuickInfoCard = ({ date, checkInAccomodation, checkOutAccomodation }: Props) => {
  const handleLinkOpen = (url: string) => {
    window.open(url, '_blank')!.focus();
  };

  const isCheckingIn = useMemo(() => date === checkInAccomodation?.checkIn, [checkInAccomodation, date]);

  const accomodationInfo = useCallback(
    (acc: Accomodation, type: string) => (
      <Flex flexDirection="column" justifyContent="space-between">
        <Flex justifyContent="space-between">
          <Box w="100%" maxH="75px">
            <Text as="i" fontSize="sm" fontWeight="bold" color={ACCOMTYPE[type].color}>
              {ACCOMTYPE[type].name}
            </Text>
            <Flex justifyContent="space-between" alignItems="center">
              <Text fontFamily={Fonts.noto}>
                <FontAwesomeIcon icon={iconType[acc.type] || faHotel} /> {acc.name}
              </Text>
              {ACCOMTYPE[type].showIcon && (
                <IconButton
                  w="40px"
                  h="40px"
                  colorScheme="blue"
                  aria-label="Google Maps"
                  icon={<FontAwesomeIcon icon={faMapLocationDot} onClick={() => handleLinkOpen(acc.googleMapsUrl)} />}
                />
              )}
            </Flex>
          </Box>
        </Flex>
      </Flex>
    ),
    [],
  );

  const drivingInfo = useCallback(() => {
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
  }, [checkOutAccomodation, checkInAccomodation]);

  return (
    <Flex flexDirection="column" justifyContent="space-between" gap="10px" pl="15px" minH="250px" w="calc(100% - 90px)">
      {checkOutAccomodation && accomodationInfo(checkOutAccomodation, 'checkout')}
      {checkOutAccomodation && checkInAccomodation && drivingInfo()}
      {checkInAccomodation && isCheckingIn && accomodationInfo(checkInAccomodation, 'checkin')}
      {checkInAccomodation && !isCheckingIn && accomodationInfo(checkInAccomodation, 'current')}
    </Flex>
  );
};

export default QuickInfoCard;
