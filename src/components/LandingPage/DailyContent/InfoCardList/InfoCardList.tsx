import { Flex } from '@chakra-ui/react';
import React, { useCallback, useMemo } from 'react';
import { AccomodationType, Activity, Flight, Section } from '../../../../types';
import { Accomodation } from '../../../../types';
import AccomodationDivider from './AccomodationDivider';
import AccomodationInfo from './AccomodationInfo';
import ActivityInfo from './ActivityInfo';
import FlightInfo from './FlightInfo';
import InfoCard from './InfoCard';

type Props = {
  date: string;
  checkInAccomodation?: Accomodation;
  checkOutAccomodation?: Accomodation;
  activities: Activity[];
  goingFlights: Flight[];
  returningFlights: Flight[];
};

const InfoCardList = ({
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
        <InfoCard title={Section.FLIGHT}>
          {flights.map((flight, index) => (
            <FlightInfo
              key={flight.departureDate + flight.departureLocation}
              flight={flight}
              date={date}
              hasBottomBorder={index + 1 < flights.length}
            />
          ))}
        </InfoCard>
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
        <InfoCard title={Section.ACCOMODATION}>
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
        </InfoCard>
      ) : null,
    [checkInAccomodation, checkOutAccomodation, hasAccomodation, isCheckingIn],
  );

  const renderActivities = useCallback(() => {
    if (activities.length === 0) {
      return null;
    } else {
      return (
        <InfoCard title={Section.ACTIVITIES}>
          {activities.map((activity: Activity) => (
            <ActivityInfo key={activity.name} activity={activity} />
          ))}
        </InfoCard>
      );
    }
  }, [activities]);

  return (
    <Flex flexDirection="column" justifyContent="space-between" gap="30px" w="calc(100% - 90px)" h="100%">
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

export default InfoCardList;
