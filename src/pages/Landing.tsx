import React, { useState } from 'react';
import styled from 'styled-components';
import Box from '../components/Box';
import Flex from '../components/Flex';
import { useGoogleSheetTrip } from '../hooks';
import { Accomodation, GoogleSheetTripData, Vehicle } from '../types/GoogleSheetTrip.type';

const Landing = () => {
  const [accomodations, setAccomodations] = useState<Accomodation[]>([]);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);

  const { refetch } = useGoogleSheetTrip({
    enabled: false,
    onSuccess: (data: GoogleSheetTripData) => {
      setAccomodations(data.accomodations);
      setVehicles(data.vehicles);
    },
  });

  return (
    <ViewContainer>
      <Box>Accomodations {JSON.stringify(accomodations)}</Box>
      <Box>Vehicles {JSON.stringify(vehicles)}</Box>
      <Flex justifyContent="center" alignItems="center">
        <button onClick={() => refetch()}>Load trip</button>
      </Flex>
    </ViewContainer>
  );
};

const ViewContainer = styled.div`
  width: 100vw;
  height: 100vh;
`;

export default Landing;
