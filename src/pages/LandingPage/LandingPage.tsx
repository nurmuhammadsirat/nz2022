import { Box, Center, Flex, Spinner } from '@chakra-ui/react';
import React, { useMemo, useState } from 'react';
import { useGoogleSheetTrip } from '../../hooks';
import { Colors } from '../../styles';
import { Accomodation, GoogleSheetTripData, Vehicle } from '../../types/GoogleSheetTrip.type';
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
      const checkInAccomodation = accomodations.find(acc => {
        const currentDate = Date.parse(date);
        const checkInDate = Date.parse(acc.checkIn);
        const checkOutDate = Date.parse(acc.checkOut);

        return currentDate >= checkInDate && currentDate < checkOutDate;
      });

      const checkOutAccomodation = accomodations.find(acc => {
        return date === acc.checkOut;
      });

      return (
        <QuickInfoCard
          key={date}
          date={date}
          checkInAccomodation={checkInAccomodation}
          checkOutAccomodation={checkOutAccomodation}
        />
      );
    });
  }, [accomodations, error, isFetching]);

  return (
    <>
      <Header height={headerHeight} />
      <Box p="16px" backgroundColor={Colors.altCardBackground}>
        <Flex flexDirection="column" gap="16px">
          {renderedContent}
        </Flex>
      </Box>
    </>
  );
};

export default LandingPage;
