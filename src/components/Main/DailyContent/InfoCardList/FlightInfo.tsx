import { Box, Text, Flex } from '@chakra-ui/react';
import { faPlaneDeparture, faPlaneArrival } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useMemo } from 'react';
import { Colors } from '../../../../styles';
import { Flight } from '../../../../types';
import { headerTitle } from '../../../../utils';

type Props = {
  flight: Flight;
  date: string;
  hasBottomBorder?: boolean;
};

const FlightInfo = ({ flight, date, hasBottomBorder = false }: Props) => {
  const isDepartingToday = useMemo(() => Date.parse(date) === Date.parse(flight.departureDate), [date, flight]);
  const isArrivingToday = useMemo(() => Date.parse(date) === Date.parse(flight.arrivalDate), [date, flight]);

  const borderBottomProps = hasBottomBorder ? { borderBottom: '1px dotted #000' } : {};

  return isDepartingToday || isArrivingToday ? (
    <Flex justifyContent="space-between" {...borderBottomProps}>
      <Box>
        <Number flightNo={flight.flightNo} />
        <Type flightType={flight.flightType} />
      </Box>
      <Box>
        <Departure departureTime={flight.departureTime} isDepartingToday={isDepartingToday} />
        <Arrival arrivalTime={flight.arrivalTime} isArrivingToday={isArrivingToday} />
      </Box>
    </Flex>
  ) : null;
};

const Number = (props: { flightNo: string }) => (
  <Box>
    {headerTitle('Flight Number', '#000')}
    <Text fontSize="sm">{props.flightNo}</Text>
  </Box>
);

const Type = (props: { flightType: string }) => (
  <Box>
    {headerTitle('Flight Type', '#000')}
    <Text fontSize="sm">{props.flightType}</Text>
  </Box>
);

const Departure = (props: { departureTime: string; isDepartingToday: boolean }) => (
  <Box textAlign="right">
    {headerTitle('Departure Time', Colors.departingFlight)}
    <Flex justifyContent="flex-end" gap="8px">
      <Text fontSize="sm" fontStyle={props.isDepartingToday ? 'normal' : 'italic'}>
        {props.isDepartingToday ? props.departureTime : 'Yesterday'}
      </Text>
      <FontAwesomeIcon icon={faPlaneDeparture} />
    </Flex>
  </Box>
);

const Arrival = (props: { arrivalTime: string; isArrivingToday: boolean }) => (
  <Box textAlign="right">
    {headerTitle('Arrival Time', Colors.arrivalFlight)}
    <Flex justifyContent="flex-end" gap="8px">
      <Text fontSize="sm" fontStyle={props.isArrivingToday ? 'normal' : 'italic'}>
        {props.isArrivingToday ? props.arrivalTime : 'Tomorrow'}
      </Text>
      <FontAwesomeIcon icon={faPlaneArrival} />
    </Flex>
  </Box>
);

export default FlightInfo;
