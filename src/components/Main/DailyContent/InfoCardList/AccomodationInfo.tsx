import { Box, Flex, Text } from '@chakra-ui/react';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faAirbnb, IconDefinition } from '@fortawesome/free-brands-svg-icons';
import { faCampground, faHotel } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Colors, Fonts } from '../../../../styles';
import { AccomodationType } from '../../../../types';
import { Accomodation } from '../../../../types';
import { GoogleMapsButton, PdfButton } from '../../../common';

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
        <Name
          header={AccomodationMetadata[type].header}
          headerColor={AccomodationMetadata[type].color}
          name={accomodation.name}
          icon={iconType[accomodation.type]}
        />
        {isCurrentlyAt && <GoogleMapsButton url={accomodation.googleMapsUrl} />}
      </Flex>
      <Flex
        justifyContent={AccomodationMetadata[type].showConfirmationId ? 'space-between' : 'flex-end'}
        alignItems="center"
        mt="8px"
      >
        {AccomodationMetadata[type].showConfirmationId && (
          <ConfirmationID
            confirmationId={accomodation.confirmationID}
            url={accomodation.url}
            color={AccomodationMetadata[type].color}
          />
        )}
        {isCheckingIn && <GoogleMapsButton url={accomodation.googleMapsUrl} />}
      </Flex>
    </Box>
  );
};

const Name = (props: { header: string; headerColor: string; name: string; icon?: IconProp }) => (
  <Box>
    <Text as="i" fontSize="sm" fontWeight="bold" color={props.headerColor}>
      {props.header}
    </Text>
    <Text fontFamily={Fonts.noto}>
      <FontAwesomeIcon icon={props.icon || faHotel} /> {props.name}
    </Text>
  </Box>
);

const ConfirmationID = (props: { confirmationId: string; url: string; color: string }) => (
  <Flex alignItems="center" gap="8px">
    <Box>
      <Text as="i" fontSize="sm" fontWeight="bold" color={props.color}>
        Confirmation ID
      </Text>
      <Text fontSize="sm">{props.confirmationId}</Text>
    </Box>
    <PdfButton url={props.url} />
  </Flex>
);

export default AccomodationInfo;
