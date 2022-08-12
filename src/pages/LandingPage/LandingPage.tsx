import { Box, Center, Flex, Spinner } from '@chakra-ui/react';
import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import { useGoogleSheetTrip } from '../../hooks';
import { Colors } from '../../styles';
import { Accomodation, GoogleSheetTripData, Vehicle } from '../../types/GoogleSheetTrip.type';
import DateBubble from './DateBubble';
import Header from './Header';
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
  // TODO this var to be used...
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);

  const headerHeight = '150px';

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

    return DATES.map((date, index) => {
      const checkInAccomodation = accomodations.find(acc => {
        const currentDate = Date.parse(date);
        const checkInDate = Date.parse(acc.checkIn);
        const checkOutDate = Date.parse(acc.checkOut);

        return currentDate >= checkInDate && currentDate < checkOutDate;
      });

      const checkOutAccomodation = accomodations.find(acc => {
        return date === acc.checkOut;
      });

      const bgColor = index % 2 === 0 ? Colors.cardBackground : Colors.altCardBackground;

      return (
        <Flex key={date} p="30px 20px" onClick={() => handleClick(date)} backgroundColor={bgColor}>
          <Flex flexDirection="column" justifyContent="space-between" h="100%" w="90px">
            <DateBubble date={date} />
          </Flex>
          <QuickInfoCard
            date={date}
            checkInAccomodation={checkInAccomodation}
            checkOutAccomodation={checkOutAccomodation}
          />
        </Flex>
      );
    });
  }, [accomodations, error, isFetching]);

  return (
    <ViewContainer>
      <Header height={headerHeight} />
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
