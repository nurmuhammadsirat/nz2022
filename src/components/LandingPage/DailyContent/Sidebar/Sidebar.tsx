import { Flex } from '@chakra-ui/react';
import React, { useMemo } from 'react';
import { Vehicle } from '../../../../types';
import Calendar from './Calendar';
import VeciclesAndFlight from './VeciclesAndFlight';

type Props = {
  date: string;
  vehicles: Vehicle[];
  hasFlight: boolean;
};

const Sidebar = ({ date, vehicles, hasFlight }: Props) => {
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

  return (
    <Flex flexDirection="column" justifyContent="flex-start" h="100%" w="80px" gap="20px">
      <Calendar date={date} />
      <VeciclesAndFlight
        date={date}
        hasFlight={hasFlight}
        pickupVehicle={pickupVehicle}
        dropoffVehicle={dropoffVehicle}
      />
    </Flex>
  );
};

export default Sidebar;
