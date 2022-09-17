import { Center, Flex, Button, Box } from '@chakra-ui/react';
import React, { useEffect, useMemo, useState } from 'react';
import { useGoogleSheetTrip } from '../../hooks';
import { Colors } from '../../styles';
import { Accomodation, Activity, Flights, FlightType, GoogleSheetTripResponse, Vehicle } from '../../types';
import { getData, storeData } from '../../utils';
import { Spinner } from '../common';
import Countdown from './Countdown';
import { DailyContent } from './DailyContent';
import Footer from './Footer';
import Header from './Header';

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

const HEADERHEIGHT = 150;
const FOOTERHEIGHT = 50;

const LandingPage = () => {
  const [accomodations, setAccomodations] = useState<Accomodation[]>([]);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [flights, setFlights] = useState<Flights | undefined>(undefined);
  const [activities, setActivities] = useState<Activity[]>([]);

  const {
    // data: tripData,
    isFetching: isFetchingGoogleData,
    refetch,
    error,
  } = useGoogleSheetTrip({
    enabled: false,
    onSuccess: (data: GoogleSheetTripResponse) => {
      storeData(data);

      setAccomodations(data.accomodations);
      setVehicles(data.vehicles);
      setActivities(data.activities);

      // Caveat, this is hardcoded to the order in the google sheet.
      setFlights({
        [FlightType.GOING]: [data.flights[0], data.flights[1]],
        [FlightType.RETURN]: [data.flights[2], data.flights[3]],
      });
    },
  });

  useEffect(() => {
    const tripData = getData();

    if (tripData) {
      setAccomodations(tripData.accomodations);
      setVehicles(tripData.vehicles);
      setActivities(tripData.activities);
      // Caveat, this is hardcoded to the order in the google sheet.
      setFlights({
        [FlightType.GOING]: [tripData.flights[0], tripData.flights[1]],
        [FlightType.RETURN]: [tripData.flights[2], tripData.flights[3]],
      });
    }
  }, []);

  const renderedContent = useMemo(() => {
    if (!flights) {
      return (
        <Center h={`calc(100vh - ${HEADERHEIGHT + FOOTERHEIGHT}px)`}>
          <Flex flexDirection="column" gap="12px">
            <Box>No data loaded.</Box>
            <Button onClick={() => refetch()}>Load Data</Button>
          </Flex>
        </Center>
      );
    }

    if (isFetchingGoogleData) {
      return <Spinner height={`calc(100vh - ${HEADERHEIGHT + FOOTERHEIGHT}px)`} />;
    }

    if (error) {
      return <Center h={`calc(100vh - ${HEADERHEIGHT + FOOTERHEIGHT}px)`}>An error occurred when loading data.</Center>;
    }

    return (
      <>
        <Countdown firstDayDate={DATES[0]} />
        <Flex flexDirection="column" gap="8px" backgroundColor={Colors.contentBackground}>
          {DATES.map(date => {
            const goingFlights =
              flights && (date === '30-Nov-2022' || date === '1-Dec-2022') ? flights[FlightType.GOING] : [];
            const returningFlights = flights && date === '26-Dec-2022' ? flights[FlightType.RETURN] : [];

            return (
              <DailyContent
                key={date}
                date={date}
                vehicles={vehicles}
                accomodations={accomodations}
                activities={activities}
                goingFlights={goingFlights}
                returningFlights={returningFlights}
              />
            );
          })}
        </Flex>
      </>
    );
  }, [accomodations, activities, flights, vehicles, refetch, isFetchingGoogleData, error]);

  const handleReloadClick = () => {
    refetch();
  };

  return (
    <>
      <Header height={HEADERHEIGHT} />
      {renderedContent}
      <Footer height={FOOTERHEIGHT} onReloadClick={handleReloadClick} />
    </>
  );
};

export default LandingPage;
