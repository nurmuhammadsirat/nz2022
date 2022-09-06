import { Box, Flex, IconButton, Text } from '@chakra-ui/react';
import { faLink } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Fonts } from '../../../styles';
import { Activity } from '../../../types';
import { handleLinkOpen } from '../../../utils';

type Props = {
  activity: Activity;
};

const ActivityInfo = ({ activity }: Props) => {
  return (
    <Box>
      <Flex justifyContent="space-between" alignItems="center">
        <Box>
          <Text as="i" fontSize="sm" fontWeight="bold">
            Name
          </Text>

          <Text fontFamily={Fonts.noto}>{activity.name}</Text>
        </Box>
        <IconButton
          w="40px"
          h="40px"
          colorScheme="gray"
          aria-label="website link"
          icon={<FontAwesomeIcon icon={faLink} onClick={() => handleLinkOpen(activity.activityUrl)} />}
        />
      </Flex>
    </Box>
  );
};

export default ActivityInfo;
