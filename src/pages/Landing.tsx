import axios, { AxiosResponse } from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Box from '../components/Box';
import Flex from '../components/Flex';
import { Accomodation, GoogleSheetTrip, Vehicle } from '../types/GoogleSheetTrip.type';

const Landing = () => {
  const [accomodations, setAccomodations] = useState<Accomodation[]>([]);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);

  useEffect(() => {
    axios.get('/.netlify/functions/google-sheet-trip').then((resp: AxiosResponse<GoogleSheetTrip>) => {
      setAccomodations(resp.data.accomodations);
      setVehicles(resp.data.vehicles);
    });
  }, []);

  return (
    <ViewContainer justifyContent="center" alignItems="center">
      <Content>Accomodations {JSON.stringify(accomodations)}!</Content>
      <Content>Vehicles {JSON.stringify(vehicles)}!</Content>
    </ViewContainer>
  );
};

const ViewContainer = styled(Flex)`
  width: 100vw;
  height: 100vh;
`;

const Content = styled(Box)`
  height: 100%;
  width: 60%;
`;

export default Landing;
