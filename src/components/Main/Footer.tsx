// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Box, Center, Flex, FormControl, FormLabel, Switch } from '@chakra-ui/react';
import { faRotateRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import useIsMobile from '../../hooks/useIsMobile';
import { Colors } from '../../styles';

type Props = {
  height: number;
  onReloadClick: () => void;
  onSwitchChange: () => void;
  isSwitchDisabled?: boolean;
};

const Footer = ({ height, onReloadClick, onSwitchChange, isSwitchDisabled = false }: Props) => {
  const isMobile = useIsMobile();

  return (
    <Flex
      justifyContent="space-between"
      alignItems="center"
      h={`${height}px`}
      position="sticky"
      bottom="0"
      backgroundColor={Colors.footerBackground}
      color={Colors.footerText}
      p={isMobile ? '0 20px 30px' : '0 20px '}
    >
      <FormControl display="flex" alignItems="center" w="50%">
        <FormLabel htmlFor="switch-view" mb="3px" fontSize="sm">
          Timeline View
        </FormLabel>
        <Switch onChange={onSwitchChange} isDisabled={isSwitchDisabled} id="switch-view" />
      </FormControl>
      <Flex justifyContent="flex-end" alignItems="center" gap="8px">
        <Box fontSize="sm" onClick={onReloadClick} mb="3px">
          Reload Data
        </Box>
        <FontAwesomeIcon icon={faRotateRight} onClick={onReloadClick} />
      </Flex>
    </Flex>
  );
};

export default Footer;
