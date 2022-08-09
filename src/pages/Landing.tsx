/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, Button, Center, Flex, Spinner, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import styled from 'styled-components';
import { useGoogleSheetTrip } from '../hooks';
import { Colors } from '../styles';
import { Accomodation, GoogleSheetTripData, Vehicle } from '../types/GoogleSheetTrip.type';

const Landing = () => {
  const [accomodations, setAccomodations] = useState<Accomodation[]>([]);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);

  const headerHeight = '200px';

  const { isFetching, error } = useGoogleSheetTrip({
    enabled: true,
    onSuccess: (data: GoogleSheetTripData) => {
      setAccomodations(data.accomodations);
      setVehicles(data.vehicles);
    },
  });

  const renderContent = () => {
    if (isFetching) {
      return (
        <Center h={`calc(100vh - ${headerHeight})`}>
          <Spinner />
        </Center>
      );
    }

    if (error) {
      return <Center h={`calc(100vh - ${headerHeight})`}>An error occurred when loading data.</Center>;
    }

    return (
      <Flex>
        <Box>accomodations: {String(accomodations)}</Box>
        <Box>vehicles: {String(vehicles)}</Box>
      </Flex>
    );
  };

  return (
    <ViewContainer>
      <Flex w="100%" h={headerHeight} flexDirection="column" justifyContent="center" backgroundColor={Colors.teal4}>
        <Text m="0 auto" fontSize="40px" color={Colors.teal1}>
          New Zealand 2022
        </Text>
        <Text m="0 auto" fontSize="20px" color={Colors.teal1}>
          Nov 30 - Dec 26
        </Text>
      </Flex>
      {renderContent()}
    </ViewContainer>
  );
};

const ViewContainer = styled(Box)`
  width: 100vw;
  height: 100vh;
  overflow-y: scroll;
`;

export default Landing;
