import { Box, Flex, Text } from '@chakra-ui/react';
import React, { useCallback, useMemo } from 'react';
import { Colors } from '../../../styles';
import { AccomodationType, Flight } from '../../../types';
import { Accomodation } from '../../../types';
import AccomodationDivider from './AccomodationDivider';
import AccomodationInfo from './AccomodationInfo';
import FlightInfo from './FlightInfo';

type Props = {
  date: string;
  checkInAccomodation?: Accomodation;
  checkOutAccomodation?: Accomodation;
  goingFlights: Flight[];
  returningFlights: Flight[];
};

const CardContent = ({ date, checkInAccomodation, checkOutAccomodation, goingFlights, returningFlights }: Props) => {
  const isCheckingIn = useMemo(() => date === checkInAccomodation?.checkIn, [checkInAccomodation, date]);

  const renderFlights = useCallback(
    (flights: Flight[]) => (
      <Box>
        {flights.length > 0 && <SectionTitle title="Flights" />}
        {flights.map((flight, index) => (
          <FlightInfo
            key={flight.departureDate + flight.departureLocation}
            flight={flight}
            date={date}
            hasBottomBorder={index + 1 < flights.length}
          />
        ))}
      </Box>
    ),
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
          <SectionTitle title="Accomodations" />
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

  return (
    <Flex flexDirection="column" justifyContent="space-between" gap="30px" pl="15px" w="calc(100% - 90px)" h="100%">
      {renderFlights(
        goingFlights.filter(flight =>
          [Date.parse(flight.departureDate), Date.parse(flight.arrivalDate)].includes(Date.parse(date)),
        ),
      )}
      {renderAccomodations()}
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
