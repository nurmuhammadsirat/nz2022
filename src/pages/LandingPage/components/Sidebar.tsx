/* eslint-disable @typescript-eslint/no-unused-vars */
import { Flex } from '@chakra-ui/react';
import React, { useMemo } from 'react';
import { Vehicle } from '../../../types';
import DateBubble from './DateBubble';
import VeciclesAndFlight from './VeciclesAndFlight';

type Props = {
  date: string;
  vehicles: Vehicle[];
};

const Sidebar = ({ date, vehicles }: Props) => {
  const pickupVehicle = useMemo(() => {
    return vehicles.find(veh => {
      veh.pickUpDate;
    });
  }, [vehicles]);

  const dropoffVehicle = useMemo(() => {}, []);

  return (
    <Flex flexDirection="column" justifyContent="flex-start" h="100%" w="90px">
      <DateBubble date={date} />
      {/* <VeciclesAndFlight pickupVehicle={pickupVehicle} dropoffVehicle={dropoffVehicle} /> */}
    </Flex>
  );
};

export default Sidebar;
