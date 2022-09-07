import { Box, Flex, IconButton, Text } from '@chakra-ui/react';
import { faLink } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Fonts } from '../../../styles';
import { Activity } from '../../../types';
import { handleLinkOpen } from '../../../utils';
import GoogleMapsButton from './GoogleMapsButton';

type Props = {
  activity: Activity;
};

const ActivityInfo = ({ activity }: Props) => {
  return (
    <Box>
      <NameAndLink name={activity.name} url={activity.activityUrl} />
      <DateAndMap date={activity.date} url={activity.googleMapsUrl} />
      <Time time={activity.time} />
      {activity.notes && activity.notes.length !== 0 && <Notes notes={activity.notes} />}
    </Box>
  );
};

const NameAndLink = (props: { name: string; url: string }) => (
  <Flex justifyContent="space-between" alignItems="center">
    <Box>
      <Text as="i" fontSize="sm" fontWeight="bold">
        Name
      </Text>
      <Text fontFamily={Fonts.noto}>{props.name}</Text>
    </Box>
    <IconButton
      w="40px"
      h="40px"
      colorScheme="gray"
      aria-label="website link"
      icon={<FontAwesomeIcon icon={faLink} onClick={() => handleLinkOpen(props.url)} />}
    />
  </Flex>
);

const DateAndMap = (props: { date: string; url: string }) => (
  <Flex justifyContent="space-between" alignItems="center">
    <Box>
      <Text as="i" fontSize="sm" fontWeight="bold">
        Date
      </Text>
      <Text fontFamily={Fonts.noto}>{props.date}</Text>
    </Box>
    <GoogleMapsButton url={props.url} />
  </Flex>
);

const Time = (props: { time: string }) => (
  <Flex justifyContent="space-between" alignItems="center">
    <Box>
      <Text as="i" fontSize="sm" fontWeight="bold">
        Time
      </Text>
      <Text fontFamily={Fonts.noto}>{props.time}</Text>
    </Box>
  </Flex>
);

const Notes = (props: { notes: string }) => (
  <Flex justifyContent="space-between" alignItems="center">
    <Box>
      <Box>
        <Text as="i" fontSize="sm" fontWeight="bold">
          Notes
        </Text>
      </Box>
      <Box>
        <Text as="i" fontSize="sm" fontFamily={Fonts.noto}>
          {props.notes}
        </Text>
      </Box>
    </Box>
  </Flex>
);

export default ActivityInfo;
