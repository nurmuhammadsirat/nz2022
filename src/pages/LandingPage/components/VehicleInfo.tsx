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
import React, { useCallback } from 'react';
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

  const handleLinkOpen = (url: string) => {
    window.open(url, '_blank')!.focus();
  };

  const headerTitle = useCallback(
    (title: string) => (
      <Text as="i" fontSize="sm" fontWeight="bold" color={Colors.trafficLight.green}>
        {title}
      </Text>
    ),
    [],
  );

  const headerValue = useCallback((title: string) => <Text fontSize="sm">{title}</Text>, []);

  const CompanyName = (
    <Box mb="8px">
      {headerTitle('Company Name')}
      <Text fontSize="sm">{vehicle.companyName}</Text>
    </Box>
  );

  const PickUpLocation = (
    <Flex justifyContent="space-between" alignItems="center">
      <Box>
        {headerTitle(vehicleTypes[type].locationTitle)}
        {headerValue(vehicleTypes[type].locationAddress(vehicle))}
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
      {headerTitle(vehicleTypes[type].timeTitle)}
      {headerValue(vehicleTypes[type].time(vehicle))}
    </Box>
  );

  const ConfirmationId = (
    <Flex justifyContent="space-between" alignItems="center">
      <Box>
        {headerTitle('Confirmation ID')}
        {headerValue(vehicle.confirmationID)}
      </Box>
      <IconButton
        w="40px"
        h="40px"
        colorScheme="whiteAlpha"
        aria-label="PDF"
        icon={<FontAwesomeIcon icon={faFileLines} onClick={() => handleLinkOpen(vehicle.url)} />}
      />
    </Flex>
  );

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
              {headerTitle('Vehicle Type')}
              {headerValue(vehicle.type)}
            </PopoverHeader>
            <PopoverBody>
              {CompanyName}
              {PickUpLocation}
              {PickUpTime}
              {ConfirmationId}
            </PopoverBody>
          </PopoverContent>
        )}
      </Popover>
    </Box>
  );
};

export default VehicleInfo;
