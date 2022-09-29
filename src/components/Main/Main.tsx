import { Center, Flex, Button, Box } from '@chakra-ui/react';
import React, { ReactNode, useEffect, useState } from 'react';
import { useGoogleSheetTrip } from '../../hooks';
import { Accomodation, Activity, Flights, FlightType, GoogleSheetTripResponse, Vehicle } from '../../types';
import { FOOTERHEIGHT, getData, HEADERHEIGHT, storeData } from '../../utils';
import { Spinner } from '../common';
import ComponentView from './ComponentView';
import Footer from './Footer';
import Header from './Header';
import TimelineView from './TimelineView';

const Main = () => {
  const [accomodations, setAccomodations] = useState<Accomodation[]>([]);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [flights, setFlights] = useState<Flights | undefined>(undefined);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [isTimelineView, setIsTimelineView] = useState(false);

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

  const handleReloadClick = () => {
    refetch();
  };

  const handleSwitchChange = () => {
    setIsTimelineView(!isTimelineView);
  };

  if (!flights) {
    return (
      <WrappedContent isFooterSwitchDisabled>
        <Center h={`calc(100vh - ${HEADERHEIGHT + FOOTERHEIGHT}px)`}>
          <Flex flexDirection="column" gap="12px">
            <Box>No data loaded.</Box>
            <Button onClick={() => refetch()}>Load Data</Button>
          </Flex>
        </Center>
      </WrappedContent>
    );
  }

  if (isFetchingGoogleData) {
    return (
      <WrappedContent isFooterSwitchDisabled>
        <Spinner height={`calc(100vh - ${HEADERHEIGHT + FOOTERHEIGHT}px)`} />
      </WrappedContent>
    );
  }

  if (error) {
    return (
      <WrappedContent isFooterSwitchDisabled>
        <Center h={`calc(100vh - ${HEADERHEIGHT + FOOTERHEIGHT}px)`}>An error occurred when loading data.</Center>
      </WrappedContent>
    );
  }

  return (
    <WrappedContent onReloadClick={handleReloadClick} onSwitchChange={handleSwitchChange}>
      {isTimelineView ? (
        <TimelineView />
      ) : (
        <ComponentView accomodations={accomodations} vehicles={vehicles} flights={flights} activities={activities} />
      )}
    </WrappedContent>
  );
};

type WrappedContentProps = {
  children: ReactNode;
  onReloadClick?: () => void;
  onSwitchChange?: () => void;
  isFooterSwitchDisabled?: boolean;
};

const emptyFunction = () => {};

const WrappedContent = ({
  children,
  onReloadClick = emptyFunction,
  onSwitchChange = emptyFunction,
  isFooterSwitchDisabled = false,
}: WrappedContentProps) => {
  return (
    <Box position="relative">
      <Header height={HEADERHEIGHT} />
      <Box maxW="400px" m="0 auto">
        {children}
      </Box>
      <Footer
        height={FOOTERHEIGHT}
        onReloadClick={onReloadClick}
        onSwitchChange={onSwitchChange}
        isSwitchDisabled={isFooterSwitchDisabled}
      />
    </Box>
  );
};

export default Main;
