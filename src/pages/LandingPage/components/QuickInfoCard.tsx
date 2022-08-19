import { Flex } from '@chakra-ui/react';
import React, { useMemo } from 'react';
import { BoxShadow, Colors } from '../../../styles';
import { Accomodation, Flight, Vehicle } from '../../../types';
import Accomodations from './Accomodations';
import Sidebar from './Sidebar';

type Props = {
  date: string;
  vehicles: Vehicle[];
  accomodations: Accomodation[];
  flights: Flight[];
};

const QuickInfoCard = ({ date, vehicles, accomodations, flights }: Props) => {
  const checkInAccomodation = useMemo(() => {
    return accomodations.find(acc => {
      const currentDate = Date.parse(date);
      const checkInDate = Date.parse(acc.checkIn);
      const checkOutDate = Date.parse(acc.checkOut);

      return currentDate >= checkInDate && currentDate < checkOutDate;
    });
  }, [accomodations, date]);

  const checkOutAccomodation = useMemo(() => {
    return accomodations.find(acc => {
      const currentDate = Date.parse(date);
      const checkOutDate = Date.parse(acc.checkOut);

      return currentDate === checkOutDate;
    });
  }, [accomodations, date]);

  return (
    <Flex
      key={date}
      p="16px 8px"
      backgroundColor={Colors.cardBackground}
      borderRadius="8px"
      boxShadow={BoxShadow.light}
    >
      <Sidebar date={date} vehicles={vehicles} flights={flights} />
      <Accomodations
        date={date}
        checkInAccomodation={checkInAccomodation}
        checkOutAccomodation={checkOutAccomodation}
      />
    </Flex>
  );
};

export default QuickInfoCard;
