import { Box, Flex, IconButton, Text } from '@chakra-ui/react';
import { faAirbnb, IconDefinition } from '@fortawesome/free-brands-svg-icons';
import { faCampground, faHotel, faMapLocationDot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Colors, Fonts } from '../../styles';
import { Accomodation } from '../../types/GoogleSheetTrip.type';
import { AccomodationType } from '../../types/types';

const ACCOMTYPE: { [key in AccomodationType]: { name: string; color: string; time: string; showIcon: boolean } } = {
  [AccomodationType.CHECKOUT]: {
    name: 'Checking Out @ 10:00 am',
    color: Colors.trafficLight.red,
    time: '10:00 AM',
    showIcon: false,
  },
  [AccomodationType.CHECKIN]: {
    name: 'Checking In @ 3:00 pm',
    color: Colors.trafficLight.green,
    time: '3:00 PM',
    showIcon: true,
  },
  [AccomodationType.CURRENT]: {
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

type Props = {
  accomodation: Accomodation;
  type: AccomodationType;
};

const AccomodationInfo = ({ accomodation, type }: Props) => {
  const handleLinkOpen = (url: string) => {
    window.open(url, '_blank')!.focus();
  };

  return (
    <Flex flexDirection="column" justifyContent="space-between">
      <Flex justifyContent="space-between">
        <Box w="100%" maxH="75px">
          <Text as="i" fontSize="sm" fontWeight="bold" color={ACCOMTYPE[type].color}>
            {ACCOMTYPE[type].name}
          </Text>
          <Flex justifyContent="space-between" alignItems="center">
            <Text fontFamily={Fonts.noto}>
              <FontAwesomeIcon icon={iconType[accomodation.type] || faHotel} /> {accomodation.name}
            </Text>
            {ACCOMTYPE[type].showIcon && (
              <IconButton
                w="40px"
                h="40px"
                colorScheme="blue"
                aria-label="Google Maps"
                icon={
                  <FontAwesomeIcon icon={faMapLocationDot} onClick={() => handleLinkOpen(accomodation.googleMapsUrl)} />
                }
              />
            )}
          </Flex>
        </Box>
      </Flex>
    </Flex>
  );
};

export default AccomodationInfo;
