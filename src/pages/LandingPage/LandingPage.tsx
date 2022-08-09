/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, Button, Center, Flex, Spinner, Text } from '@chakra-ui/react';
import { check } from 'prettier';
import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import { useGoogleSheetTrip } from '../../hooks';
import { BoxShadow, Colors } from '../../styles';
import { Accomodation, GoogleSheetTripData, Vehicle } from '../../types/GoogleSheetTrip.type';
import DateBubble from './DateBubble';
import QuickInfoCard from './QuickInfoCard';

const DATES = [
  '30-Nov-2022',
  '1-Dec-2022',
  '2-Dec-2022',
  '3-Dec-2022',
  '4-Dec-2022',
  '5-Dec-2022',
  '6-Dec-2022',
  '7-Dec-2022',
  '8-Dec-2022',
  '9-Dec-2022',
  '10-Dec-2022',
  '11-Dec-2022',
  '12-Dec-2022',
  '13-Dec-2022',
  '14-Dec-2022',
  '15-Dec-2022',
  '16-Dec-2022',
  '17-Dec-2022',
  '18-Dec-2022',
  '19-Dec-2022',
  '20-Dec-2022',
  '21-Dec-2022',
  '22-Dec-2022',
  '23-Dec-2022',
  '24-Dec-2022',
  '25-Dec-2022',
  '26-Dec-2022',
];

const LandingPage = () => {
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

  const handleClick = (date: string) => {
    // eslint-disable-next-line no-console
    console.log('clicked', date);
  };

  const renderedContent = useMemo(() => {
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

    return DATES.map(date => {
      const accomodation = accomodations.find(acc => {
        const currentDate = Date.parse(date);
        const checkInDate = Date.parse(acc.checkIn);
        const checkOutDate = Date.parse(acc.checkOut);

        // eslint-disable-next-line no-console
        console.log('date currentDate', date, currentDate);
        // eslint-disable-next-line no-console
        console.log('acc.checkIn checkInDate', acc.checkIn, checkInDate);
        // eslint-disable-next-line no-console
        console.log('acc.checkOut checkOutDate', acc.checkOut, checkOutDate);

        return currentDate >= checkInDate && currentDate < checkOutDate;
      });

      return (
        <Flex key={date} m="10px 20px" onClick={() => handleClick(date)}>
          <Flex h="100%" w="90px">
            <DateBubble date={date} />
          </Flex>
          <QuickInfoCard accomodation={accomodation} />
        </Flex>
      );
    });
  }, [accomodations, error, isFetching]);

  return (
    <ViewContainer>
      <Flex h={headerHeight} flexDirection="column" justifyContent="center" backgroundColor={Colors.teal4}>
        <Text m="0 auto" fontSize="40px" color={Colors.teal1}>
          New Zealand 2022
        </Text>
        <Text m="0 auto" fontSize="20px" color={Colors.teal1}>
          Nov 30 - Dec 26
        </Text>
      </Flex>
      {renderedContent}
    </ViewContainer>
  );
};

const ViewContainer = styled(Box)`
  width: 100vw;
  height: 100vh;
  overflow-y: scroll;
`;

export default LandingPage;
