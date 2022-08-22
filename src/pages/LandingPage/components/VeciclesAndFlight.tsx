import { Box, Flex } from '@chakra-ui/react';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useMemo } from 'react';
import { Flight, Vehicle, VehicleType } from '../../../types';
import VecicleDivider from './VecicleDivider';
import VehicleInfo from './VehicleInfo';

type Props = {
  date: string;
  departingFlight?: Flight;
  arrivalFlight?: Flight;
  pickupVehicle?: Vehicle;
  dropoffVehicle?: Vehicle;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const VeciclesAndFlight = ({ date, departingFlight, arrivalFlight, pickupVehicle, dropoffVehicle }: Props) => {
  const isPickingUpVehicleToday = useMemo(() => pickupVehicle?.pickUpDate === date, [pickupVehicle, date]);

  const isDroppingOffVehicleToday = useMemo(() => dropoffVehicle?.dropOffDate === date, [dropoffVehicle, date]);

  const isPickingUpOrDroppingOffVehicleToday = useMemo(
    () => isPickingUpVehicleToday || isDroppingOffVehicleToday,
    [isPickingUpVehicleToday, isDroppingOffVehicleToday],
  );

  return (
    <Flex flexDirection="column" justifyContent="space-between" alignItems="center">
      {isPickingUpOrDroppingOffVehicleToday && (
        <Box mt="8px">
          <FontAwesomeIcon size="2x" icon={faTriangleExclamation} color="red" />
        </Box>
      )}
      {dropoffVehicle && (
        <VehicleInfo
          vehicle={dropoffVehicle}
          type={VehicleType.DROPOFF}
          isPickingUpOrDroppingOffVehicleToday={isPickingUpOrDroppingOffVehicleToday}
        />
      )}
      {dropoffVehicle && <VecicleDivider />}
      {pickupVehicle && (
        <VehicleInfo
          vehicle={pickupVehicle}
          type={VehicleType.PICKUP}
          isPickingUpOrDroppingOffVehicleToday={isPickingUpOrDroppingOffVehicleToday}
        />
      )}
    </Flex>
  );
};

export default VeciclesAndFlight;
