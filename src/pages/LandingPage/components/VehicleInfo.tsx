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

type Props = {
  vehicle: Vehicle;
  type: VehicleType;
  isPickingUpOrDroppingOffVehicleToday: boolean;
};

const vehicleMetadata: { [key: string]: { [key: string]: string } } = {
  'Intermediate SUV AWD': {
    src: suvAce,
    m: '',
  },
  'Beach 4-Berth': {
    src: campervan,
    m: '12px 0',
  },
  'Intermediate SUV 2WD Group I IFAR': {
    src: suvHertz,
    m: '',
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
  const img = vehicleMetadata[vehicle.type];

  const handleLinkOpen = (url: string) => {
    window.open(url, '_blank')!.focus();
  };

  const CompanyName = (
    <Box mb="8px">
      <Text as="i" fontSize="sm" fontWeight="bold" color={Colors.trafficLight.green}>
        Company Name
      </Text>
      <Text fontSize="sm">{vehicle.companyName}</Text>
    </Box>
  );

  const PickUpLocation = (
    <Flex justifyContent="space-between" alignItems="center">
      <Box>
        <Text as="i" fontSize="sm" fontWeight="bold" color={Colors.trafficLight.green}>
          {vehicleTypes[type].locationTitle}
        </Text>
        <Text fontSize="sm">{vehicleTypes[type].locationAddress(vehicle)}</Text>
      </Box>
      <IconButton
        w="40px"
        h="40px"
        colorScheme="blue"
        aria-label="Google Maps"
        icon={
          <FontAwesomeIcon
            icon={faMapLocationDot}
            onClick={() => handleLinkOpen(vehicleTypes[type].locationGMapsUrl(vehicle))}
          />
        }
      />
    </Flex>
  );

  const PickUpTime = (
    <Box>
      <Text as="i" fontSize="sm" fontWeight="bold" color={Colors.trafficLight.green}>
        {vehicleTypes[type].timeTitle}
      </Text>
      <Text fontSize="sm">{vehicleTypes[type].time(vehicle)}</Text>
    </Box>
  );

  const ConfirmationId = (
    <Flex justifyContent="space-between" alignItems="center">
      <Text>Confirmation ID: {vehicle.confirmationID}</Text>
      <IconButton
        w="40px"
        h="40px"
        colorScheme="whiteAlpha"
        aria-label="PDF"
        icon={<FontAwesomeIcon icon={faFileLines} onClick={() => handleLinkOpen(vehicle.url)} />}
      />
    </Flex>
  );

  const VehicleType = <Box>{vehicle.type}</Box>;

  return (
    <Box m={img.m}>
      <Popover placement="right">
        <PopoverTrigger>
          <Image borderRadius="full" boxSize="60px" src={img.src} fit="cover" />
        </PopoverTrigger>
        <PopoverContent w="270px" backgroundColor={'#2B4865'} color={'#ffffff'}>
          <PopoverArrow backgroundColor={'#2B4865'} />
          <PopoverHeader>{VehicleType}</PopoverHeader>
          {isPickingUpOrDroppingOffVehicleToday && (
            <PopoverBody>
              {CompanyName}
              {PickUpLocation}
              {PickUpTime}
              {ConfirmationId}
            </PopoverBody>
          )}
        </PopoverContent>
      </Popover>
    </Box>
  );
};

export default VehicleInfo;
