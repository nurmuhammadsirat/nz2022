import { Box, Flex } from '@chakra-ui/react';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Flight, Vehicle, VehicleType } from '../../../types';
import VecicleDivider from './VecicleDivider';
import VehicleInfo from './VehicleInfo';

type Props = {
  departingFlight?: Flight;
  arrivalFlight?: Flight;
  pickupVehicle?: Vehicle;
  dropoffVehicle?: Vehicle;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const VeciclesAndFlight = ({ departingFlight, arrivalFlight, pickupVehicle, dropoffVehicle }: Props) => {
  const isVehicleTransfer = typeof pickupVehicle !== 'undefined' && typeof dropoffVehicle !== 'undefined';

  return (
    <Flex flexDirection="column" justifyContent="space-between" alignItems="center">
      {isVehicleTransfer && (
        <Box mt="8px">
          <FontAwesomeIcon size="2x" icon={faTriangleExclamation} color="red" />
        </Box>
      )}
      {dropoffVehicle && <VehicleInfo vehicle={dropoffVehicle} type={VehicleType.DROPOFF} />}
      {dropoffVehicle && <VecicleDivider />}
      {pickupVehicle && <VehicleInfo vehicle={pickupVehicle} type={VehicleType.PICKUP} />}
    </Flex>
  );
};

export default VeciclesAndFlight;
