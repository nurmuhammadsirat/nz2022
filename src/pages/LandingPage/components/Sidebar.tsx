import { Flex } from '@chakra-ui/react';
import React, { useMemo } from 'react';
import { Flight, Vehicle } from '../../../types';
import DateBubble from './DateBubble';
import VeciclesAndFlight from './VeciclesAndFlight';

type Props = {
  date: string;
  vehicles: Vehicle[];
  flights: Flight[];
};

const Sidebar = ({ date, vehicles, flights }: Props) => {
  const pickupVehicle = useMemo(
    () =>
      vehicles.find(veh => {
        const currentDate = Date.parse(date);
        const pickUpDate = Date.parse(veh.pickUpDate);
        const dropOffDate = Date.parse(veh.dropOffDate);

        return currentDate >= pickUpDate && currentDate < dropOffDate;
      }),
    [vehicles, date],
  );

  const dropoffVehicle = useMemo(
    () =>
      vehicles.find(veh => {
        const currentDate = Date.parse(date);
        const dropOffDate = Date.parse(veh.dropOffDate);

        return currentDate === dropOffDate;
      }),
    [vehicles, date],
  );

  const departingFlight = useMemo(
    () =>
      flights.find(flight => {
        const currentDate = Date.parse(date);
        const departureDate = Date.parse(flight.departureDate);

        return currentDate === departureDate;
      }),
    [flights, date],
  );

  const arrivalFlight = useMemo(
    () =>
      flights.find(flight => {
        const currentDate = Date.parse(date);
        const arrivalDate = Date.parse(flight.arrivalDate);

        return currentDate === arrivalDate;
      }),
    [flights, date],
  );

  return (
    <Flex flexDirection="column" justifyContent="flex-start" h="100%" w="90px">
      <DateBubble date={date} />
      <VeciclesAndFlight
        date={date}
        departingFlight={departingFlight}
        arrivalFlight={arrivalFlight}
        pickupVehicle={pickupVehicle}
        dropoffVehicle={dropoffVehicle}
      />
    </Flex>
  );
};

export default Sidebar;
