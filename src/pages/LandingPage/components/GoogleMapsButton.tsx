import { IconButton } from '@chakra-ui/react';
import { faMapLocationDot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { handleLinkOpen } from '../../../utils';

type Props = {
  url: string;
};

const GoogleMapsButton = ({ url }: Props) => (
  <IconButton
    w="40px"
    h="40px"
    colorScheme="blue"
    aria-label="Google Maps"
    icon={<FontAwesomeIcon icon={faMapLocationDot} onClick={() => handleLinkOpen(url)} />}
  />
);

export default GoogleMapsButton;
