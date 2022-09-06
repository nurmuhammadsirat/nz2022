import { Flex } from '@chakra-ui/react';
import React, { useMemo } from 'react';
import { BoxShadow, Colors } from '../../../styles';
import { Accomodation, Activity, Flight, Vehicle } from '../../../types';
import CardContent from './CardContent';
import Sidebar from './Sidebar';

type Props = {
  date: string;
  vehicles: Vehicle[];
  accomodations: Accomodation[];
  activities: Activity[];
  goingFlights: Flight[];
  returningFlights: Flight[];
};

const QuickInfoCard = ({ date, vehicles, accomodations, activities, goingFlights, returningFlights }: Props) => {
  const checkInAccomodation = useMemo(
    () =>
      accomodations.find(acc => {
        const currentDate = Date.parse(date);
        const checkInDate = Date.parse(acc.checkIn);
        const checkOutDate = Date.parse(acc.checkOut);

        return currentDate >= checkInDate && currentDate < checkOutDate;
      }),
    [accomodations, date],
  );

  const checkOutAccomodation = useMemo(
    () =>
      accomodations.find(acc => {
        const currentDate = Date.parse(date);
        const checkOutDate = Date.parse(acc.checkOut);

        return currentDate === checkOutDate;
      }),
    [accomodations, date],
  );

  const hasFlight = useMemo(
    () => goingFlights.length > 0 || returningFlights.length > 0,
    [goingFlights, returningFlights],
  );

  const activitiesForToday = useMemo(
    () =>
      activities.filter(activity => {
        const currentDate = Date.parse(date);
        const currentActivityDate = Date.parse(activity.date);
        return currentDate === currentActivityDate;
      }),
    [activities, date],
  );

  return (
    <Flex
      key={date}
      p="16px 8px"
      backgroundColor={Colors.cardBackground}
      borderRadius="8px"
      boxShadow={BoxShadow.light}
    >
      <Sidebar date={date} vehicles={vehicles} hasFlight={hasFlight} />
      <CardContent
        date={date}
        checkInAccomodation={checkInAccomodation}
        checkOutAccomodation={checkOutAccomodation}
        activities={activitiesForToday}
        goingFlights={goingFlights}
        returningFlights={returningFlights}
      />
    </Flex>
  );
};

export default QuickInfoCard;
