import { Box, Flex, Text } from '@chakra-ui/react';
import React, { useCallback, useMemo } from 'react';
import { Colors } from '../../../styles';
import { AccomodationType, Activity, Flight } from '../../../types';
import { Accomodation } from '../../../types';
import AccomodationDivider from './AccomodationDivider';
import AccomodationInfo from './AccomodationInfo';
import ActivityInfo from './ActivityInfo';
import FlightInfo from './FlightInfo';

type Props = {
  date: string;
  checkInAccomodation?: Accomodation;
  checkOutAccomodation?: Accomodation;
  activities: Activity[];
  goingFlights: Flight[];
  returningFlights: Flight[];
};

const CardContent = ({
  date,
  checkInAccomodation,
  checkOutAccomodation,
  activities,
  goingFlights,
  returningFlights,
}: Props) => {
  const isCheckingIn = useMemo(() => date === checkInAccomodation?.checkIn, [checkInAccomodation, date]);

  const renderFlights = useCallback(
    (flights: Flight[]) =>
      flights.length > 0 ? (
        <Box>
          <SectionTitle title="FLIGHT" />
          {flights.map((flight, index) => (
            <FlightInfo
              key={flight.departureDate + flight.departureLocation}
              flight={flight}
              date={date}
              hasBottomBorder={index + 1 < flights.length}
            />
          ))}
        </Box>
      ) : null,
    [date],
  );

  const hasAccomodation = useMemo(
    () => checkInAccomodation || checkOutAccomodation,
    [checkInAccomodation, checkOutAccomodation],
  );

  const renderAccomodations = useCallback(
    () =>
      hasAccomodation ? (
        <Box>
          <SectionTitle title="ACCOMODATION" />
          {checkOutAccomodation && (
            <AccomodationInfo accomodation={checkOutAccomodation} type={AccomodationType.CHECKOUT} />
          )}
          {checkOutAccomodation && checkInAccomodation && (
            <AccomodationDivider
              checkInLocation={checkInAccomodation.location}
              checkOutLocation={checkOutAccomodation.location}
            />
          )}
          {checkInAccomodation && isCheckingIn && (
            <AccomodationInfo accomodation={checkInAccomodation} type={AccomodationType.CHECKIN} />
          )}
          {checkInAccomodation && !isCheckingIn && (
            <AccomodationInfo accomodation={checkInAccomodation} type={AccomodationType.CURRENT} />
          )}
        </Box>
      ) : null,
    [checkInAccomodation, checkOutAccomodation, hasAccomodation, isCheckingIn],
  );

  const renderActivities = useCallback(() => {
    if (activities.length === 0) {
      return null;
    } else {
      return (
        <Box>
          <SectionTitle title="ACTIVITIES" />
          {activities.map((activity: Activity) => (
            <ActivityInfo key={activity.name} activity={activity} />
          ))}
        </Box>
      );
    }
  }, [activities]);

  return (
    <Flex flexDirection="column" justifyContent="space-between" gap="30px" pl="15px" w="calc(100% - 90px)" h="100%">
      {renderFlights(
        goingFlights.filter(flight =>
          [Date.parse(flight.departureDate), Date.parse(flight.arrivalDate)].includes(Date.parse(date)),
        ),
      )}
      {renderAccomodations()}
      {renderActivities()}
      {renderFlights(returningFlights)}
    </Flex>
  );
};

const SectionTitle = (props: { title: string }) => (
  <Box backgroundColor={Colors.dateBackground} color="#FFF" textAlign="center" p="4px">
    <Text fontSize="22px" fontWeight="800">
      {props.title}
    </Text>
  </Box>
);

export default CardContent;
