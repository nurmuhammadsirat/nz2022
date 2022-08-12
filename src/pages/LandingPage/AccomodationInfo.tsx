import { Box, Flex, IconButton, Text } from '@chakra-ui/react';
import { faAirbnb, IconDefinition } from '@fortawesome/free-brands-svg-icons';
import { faCampground, faFileLines, faHotel, faMapLocationDot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Colors, Fonts } from '../../styles';
import { Accomodation } from '../../types/GoogleSheetTrip.type';
import { AccomodationType } from '../../types/types';

type METADATATYPE = {
  [key in AccomodationType]: {
    name: string;
    color: string;
    time: string;
    showMapIcon: boolean;
    showBookingIcon: boolean;
  };
};

const METADATA: METADATATYPE = {
  [AccomodationType.CHECKOUT]: {
    name: 'Checking Out @ 10:00 am',
    color: Colors.trafficLight.red,
    time: '10:00 AM',
    showMapIcon: false,
    showBookingIcon: false,
  },
  [AccomodationType.CHECKIN]: {
    name: 'Checking In @ 3:00 pm',
    color: Colors.trafficLight.green,
    time: '3:00 PM',
    showMapIcon: true,
    showBookingIcon: true,
  },
  [AccomodationType.CURRENT]: {
    name: 'Currently At',
    color: Colors.trafficLight.amber,
    time: '-',
    showMapIcon: true,
    showBookingIcon: false,
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
    <Box w="100%">
      <Text as="i" fontSize="sm" fontWeight="bold" color={METADATA[type].color}>
        {METADATA[type].name}
      </Text>
      <Text fontFamily={Fonts.noto}>
        <FontAwesomeIcon icon={iconType[accomodation.type] || faHotel} /> {accomodation.name}
      </Text>
      <Flex mt="8px" justifyContent="flex-end" gap="8px">
        {METADATA[type].showBookingIcon && accomodation.url && (
          <IconButton
            w="40px"
            h="40px"
            colorScheme="gray"
            aria-label="Google Maps"
            icon={<FontAwesomeIcon icon={faFileLines} onClick={() => handleLinkOpen(accomodation.url)} />}
          />
        )}
        {METADATA[type].showMapIcon && (
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
  );
};

export default AccomodationInfo;
