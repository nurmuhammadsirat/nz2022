import { IconButton } from '@chakra-ui/react';
import { faFileLines } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { handleLinkOpen } from '../../utils';

type Props = {
  url: string;
};

const PdfButton = ({ url }: Props) => (
  <IconButton
    w="40px"
    h="40px"
    colorScheme="gray"
    aria-label="PDF"
    icon={<FontAwesomeIcon icon={faFileLines} onClick={() => handleLinkOpen(url)} />}
  />
);

export default PdfButton;
