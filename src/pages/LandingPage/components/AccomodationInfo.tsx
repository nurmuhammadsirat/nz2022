import { Box, Flex, IconButton, Text } from '@chakra-ui/react';
import { faAirbnb, IconDefinition } from '@fortawesome/free-brands-svg-icons';
import { faCampground, faFileLines, faHotel, faMapLocationDot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Colors, Fonts } from '../../../styles';
import { AccomodationType } from '../../../types';
import { Accomodation } from '../../../types';
import { handleLinkOpen } from '../../../utils';

type AccomodationMetadataType = {
  [key in AccomodationType]: {
    header: string;
    color: string;
    time: string;
    showConfirmationId: boolean;
  };
};

const AccomodationMetadata: AccomodationMetadataType = {
  [AccomodationType.CHECKOUT]: {
    header: 'Checking Out @ 10:00 am',
    color: Colors.trafficLight.red,
    time: '10:00 AM',
    showConfirmationId: false,
  },
  [AccomodationType.CHECKIN]: {
    header: 'Checking In @ 3:00 pm',
    color: Colors.trafficLight.green,
    time: '3:00 PM',
    showConfirmationId: true,
  },
  [AccomodationType.CURRENT]: {
    header: 'Currently At',
    color: Colors.trafficLight.amber,
    time: '-',
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
  const isCurrentlyAt = type === AccomodationType.CURRENT;
  const isCheckingIn = type === AccomodationType.CHECKIN;

  return (
    <Box w="100%">
      <Flex justifyContent="space-between" alignItems="center">
        <Box>
          <Text as="i" fontSize="sm" fontWeight="bold" color={AccomodationMetadata[type].color}>
            {AccomodationMetadata[type].header}
          </Text>

          <Text fontFamily={Fonts.noto}>
            <FontAwesomeIcon icon={iconType[accomodation.type] || faHotel} /> {accomodation.name}
          </Text>
        </Box>
        {isCurrentlyAt && (
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
      <Flex
        justifyContent={AccomodationMetadata[type].showConfirmationId ? 'space-between' : 'flex-end'}
        alignItems="center"
        mt="8px"
      >
        {AccomodationMetadata[type].showConfirmationId && (
          <Flex alignItems="center" gap="8px">
            <Box>
              <Text as="i" fontSize="sm" fontWeight="bold" color={AccomodationMetadata[type].color}>
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
        {isCheckingIn && (
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
