import { Box, Flex, IconButton, Text } from '@chakra-ui/react';
import { faAirbnb, IconDefinition } from '@fortawesome/free-brands-svg-icons';
import { faCampground, faFileLines, faHotel, faMapLocationDot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Colors, Fonts } from '../../../styles';
import { AccomodationType } from '../../../types';
import { Accomodation } from '../../../types';

type METADATATYPE = {
  [key in AccomodationType]: {
    name: string;
    color: string;
    time: string;
    showMapIcon: boolean;
    showConfirmationId: boolean;
  };
};

const METADATA: METADATATYPE = {
  [AccomodationType.CHECKOUT]: {
    name: 'Checking Out @ 10:00 am',
    color: Colors.trafficLight.red,
    time: '10:00 AM',
    showMapIcon: false,
    showConfirmationId: false,
  },
  [AccomodationType.CHECKIN]: {
    name: 'Checking In @ 3:00 pm',
    color: Colors.trafficLight.green,
    time: '3:00 PM',
    showMapIcon: true,
    showConfirmationId: true,
  },
  [AccomodationType.CURRENT]: {
    name: 'Currently At',
    color: Colors.trafficLight.amber,
    time: '-',
    showMapIcon: true,
    showConfirmationId: false,
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
      <Box>
        <Text as="i" fontSize="sm" fontWeight="bold" color={METADATA[type].color}>
          {METADATA[type].name}
        </Text>

        <Text fontFamily={Fonts.noto}>
          <FontAwesomeIcon icon={iconType[accomodation.type] || faHotel} /> {accomodation.name}
        </Text>
      </Box>
      <Flex
        justifyContent={METADATA[type].showConfirmationId ? 'space-between' : 'flex-end'}
        alignItems="center"
        mt="8px"
      >
        {METADATA[type].showConfirmationId && (
          <Flex alignItems="center" gap="8px">
            <Box>
              <Text as="i" fontSize="sm" fontWeight="bold" color={METADATA[type].color}>
                Confirmation ID
              </Text>
              <Text fontSize="sm">{accomodation.confirmationID}</Text>
            </Box>
            <IconButton
              w="40px"
              h="40px"
              colorScheme="gray"
              aria-label="PDF"
              icon={<FontAwesomeIcon icon={faFileLines} onClick={() => handleLinkOpen(accomodation.url)} />}
            />
          </Flex>
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
