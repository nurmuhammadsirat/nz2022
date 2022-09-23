import { Flex } from '@chakra-ui/react';
import React from 'react';
import { Colors } from '../../styles';
import { Accomodation, Activity, Flights, FlightType, Vehicle } from '../../types';
import { DATES } from '../../utils';
import { DailyContent } from './DailyContent';

type Props = {
  accomodations: Accomodation[];
  vehicles: Vehicle[];
  flights: Flights;
  activities: Activity[];
};

const ComponentView = ({ accomodations, vehicles, flights, activities }: Props) => {
  return (
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
  );
};

export default ComponentView;
