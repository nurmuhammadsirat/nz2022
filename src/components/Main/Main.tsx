import { Center, Flex, Button, Box, Slide } from '@chakra-ui/react';
import React, { ReactNode, useEffect, useMemo, useState } from 'react';
import { useScrollDirection } from 'react-use-scroll-direction';
import { useGoogleSheetTrip } from '../../hooks';
import useIsMobile from '../../hooks/useIsMobile';
import { Accomodation, Activity, Flights, FlightType, GoogleSheetTripResponse, Vehicle } from '../../types';
import { FOOTERHEIGHT, FOOTERMOBILEHEIGHT, getData, HEADERHEIGHT, storeData } from '../../utils';
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

  const isMobile = useIsMobile();

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

  const footerHeight = useMemo(() => (isMobile ? FOOTERMOBILEHEIGHT : FOOTERHEIGHT), [isMobile]);

  const handleReloadClick = () => {
    refetch();
  };

  const handleSwitchChange = () => {
    setIsTimelineView(!isTimelineView);
  };

  if (!flights) {
    return (
      <WrappedContent footerHeight={footerHeight} isFooterSwitchDisabled>
        <Center h={`calc(100vh - ${HEADERHEIGHT + footerHeight}px)`}>
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
      <WrappedContent footerHeight={footerHeight} isFooterSwitchDisabled>
        <Spinner height={`calc(100vh - ${HEADERHEIGHT + footerHeight}px)`} />
      </WrappedContent>
    );
  }

  if (error) {
    return (
      <WrappedContent footerHeight={footerHeight} isFooterSwitchDisabled>
        <Center h={`calc(100vh - ${HEADERHEIGHT + footerHeight}px)`}>An error occurred when loading data.</Center>
      </WrappedContent>
    );
  }

  return (
    <WrappedContent footerHeight={footerHeight} onReloadClick={handleReloadClick} onSwitchChange={handleSwitchChange}>
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
  footerHeight: number;
  onReloadClick?: () => void;
  onSwitchChange?: () => void;
  isFooterSwitchDisabled?: boolean;
};

const emptyFunction = () => {};

const WrappedContent = ({
  children,
  footerHeight,
  onReloadClick = emptyFunction,
  onSwitchChange = emptyFunction,
  isFooterSwitchDisabled = false,
}: WrappedContentProps) => {
  const [isFooterShown, setIsFooterShown] = useState(true);

  const { isScrollingDown } = useScrollDirection();

  useEffect(() => {
    const handleScroll = () => {
      if (isScrollingDown) {
        setIsFooterShown(false);
      } else {
        setIsFooterShown(true);
      }
    };

    document.addEventListener('scroll', handleScroll);

    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, [isScrollingDown]);

  return (
    <Box position="relative">
      <Header height={HEADERHEIGHT} />
      <Box maxW="400px" m="0 auto" paddingBottom="70px">
        {children}
      </Box>
      <Slide direction="bottom" in={isFooterShown}>
        <Footer
          height={footerHeight}
          onReloadClick={onReloadClick}
          onSwitchChange={onSwitchChange}
          isSwitchDisabled={isFooterSwitchDisabled}
        />
      </Slide>
    </Box>
  );
};

export default Main;
