import { Box, Flex, IconButton, Text } from '@chakra-ui/react';
import { faLink, faMapLocationDot } from '@fortawesome/free-solid-svg-icons';
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
      <Flex justifyContent="space-between" alignItems="center">
        <Box>
          <Text as="i" fontSize="sm" fontWeight="bold">
            Date
          </Text>
          <Text fontFamily={Fonts.noto}>{activity.date}</Text>
        </Box>
        <IconButton
          w="40px"
          h="40px"
          colorScheme="blue"
          aria-label="Google Maps"
          icon={<FontAwesomeIcon icon={faMapLocationDot} onClick={() => handleLinkOpen(activity.googleMapsUrl)} />}
        />
      </Flex>
      <Flex justifyContent="space-between" alignItems="center">
        <Box>
          <Text as="i" fontSize="sm" fontWeight="bold">
            Time
          </Text>
          <Text fontFamily={Fonts.noto}>{activity.time}</Text>
        </Box>
      </Flex>
      {activity.notes && activity.notes.length !== 0 && (
        <Flex justifyContent="space-between" alignItems="center">
          <Box>
            <Text as="i" fontSize="sm" fontWeight="bold">
              Notes
            </Text>
            <Text as="i" fontSize="sm" fontFamily={Fonts.noto}>
              {activity.notes}
            </Text>
          </Box>
        </Flex>
      )}
    </Box>
  );
};

export default ActivityInfo;
