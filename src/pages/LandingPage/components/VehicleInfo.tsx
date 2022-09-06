import {
  Box,
  Flex,
  IconButton,
  Image,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Text,
} from '@chakra-ui/react';
import { faMapLocationDot, faFileLines } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import suvAce from '../../../assets/ace-intermediate-suv.jpg';
import suvHertz from '../../../assets/hertz-intermediate-suv.jpg';
import campervan from '../../../assets/maui-4-berth-beach.jpg';
import { Colors } from '../../../styles';
import { Vehicle, VehicleType } from '../../../types';
import { headerTitle, headerValue } from '../../../utils';
import { handleLinkOpen } from '../../../utils/index';

type Props = {
  vehicle: Vehicle;
  type: VehicleType;
  isPickingUpOrDroppingOffVehicleToday: boolean;
};

const vehicleImage: { [key: string]: { [key: string]: string } } = {
  'Intermediate SUV AWD': {
    src: suvAce,
    margin: '',
  },
  'Beach 4-Berth': {
    src: campervan,
    margin: '12px 0',
  },
  'Intermediate SUV 2WD Group I IFAR': {
    src: suvHertz,
    margin: '',
  },
};

const vehicleTypes: {
  [key in VehicleType]: {
    locationTitle: string;
    locationAddress: (v: Vehicle) => string;
    locationGMapsUrl: (v: Vehicle) => string;
    timeTitle: string;
    time: (v: Vehicle) => string;
  };
} = {
  [VehicleType.DROPOFF]: {
    locationTitle: 'Drop Off Location',
    locationAddress: (v: Vehicle) => v.dropOffLocation,
    locationGMapsUrl: (v: Vehicle) => v.dropOffGoogleMapsUrl,
    timeTitle: 'Drop Off Time',
    time: (v: Vehicle) => v.dropOffTime,
  },
  [VehicleType.PICKUP]: {
    locationTitle: 'Pick Up Location',
    locationAddress: (v: Vehicle) => v.pickUpLocation,
    locationGMapsUrl: (v: Vehicle) => v.pickUpGoogleMapsUrl,
    timeTitle: 'Pick Up Time',
    time: (v: Vehicle) => v.pickUpTime,
  },
};

const VehicleInfo = ({ vehicle, type, isPickingUpOrDroppingOffVehicleToday }: Props) => {
  const img = vehicleImage[vehicle.type];

  return (
    <Box m={img.margin}>
      <Popover placement="right">
        <PopoverTrigger>
          <Image borderRadius="full" boxSize="60px" src={img.src} fit="cover" />
        </PopoverTrigger>
        {isPickingUpOrDroppingOffVehicleToday && (
          <PopoverContent w="270px" backgroundColor={'#2B4865'} color={'#ffffff'}>
            <PopoverArrow backgroundColor={'#2B4865'} />
            <PopoverHeader>
              {headerTitle('Vehicle Type', Colors.trafficLight.green)}
              {headerValue(vehicle.type)}
            </PopoverHeader>
            <PopoverBody>
              <CompanyName companyName={vehicle.companyName} />
              <PickUpLocation
                type={type}
                vehicle={vehicle}
                onClick={() => handleLinkOpen(vehicleTypes[type].locationGMapsUrl(vehicle))}
              />
              <PickUpTime type={type} vehicle={vehicle} />
              <ConfirmationId confirmationId={vehicle.confirmationID} onClick={() => handleLinkOpen(vehicle.url)} />
            </PopoverBody>
          </PopoverContent>
        )}
      </Popover>
    </Box>
  );
};

const CompanyName = (props: { companyName: string }) => (
  <Box mb="8px">
    {headerTitle('Company Name', Colors.trafficLight.green)}
    <Text fontSize="sm">{props.companyName}</Text>
  </Box>
);

const PickUpLocation = (props: { type: VehicleType; vehicle: Vehicle; onClick: () => void }) => (
  <Flex justifyContent="space-between" alignItems="center">
    <Box>
      {headerTitle(vehicleTypes[props.type].locationTitle, Colors.trafficLight.green)}
      {headerValue(vehicleTypes[props.type].locationAddress(props.vehicle))}
    </Box>
    <IconButton
      w="40px"
      h="40px"
      colorScheme="blue"
      aria-label="Google Maps"
      icon={<FontAwesomeIcon icon={faMapLocationDot} onClick={props.onClick} />}
    />
  </Flex>
);

const PickUpTime = (props: { type: VehicleType; vehicle: Vehicle }) => (
  <Box>
    {headerTitle(vehicleTypes[props.type].timeTitle, Colors.trafficLight.green)}
    {headerValue(vehicleTypes[props.type].time(props.vehicle))}
  </Box>
);

const ConfirmationId = (props: { confirmationId: string; onClick: () => void }) => (
  <Flex justifyContent="space-between" alignItems="center">
    <Box>
      {headerTitle('Confirmation ID', Colors.trafficLight.green)}
      {headerValue(props.confirmationId)}
    </Box>
    <IconButton
      w="40px"
      h="40px"
      colorScheme="whiteAlpha"
      aria-label="PDF"
      icon={<FontAwesomeIcon icon={faFileLines} onClick={props.onClick} />}
    />
  </Flex>
);

export default VehicleInfo;
