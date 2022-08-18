import { Flex } from '@chakra-ui/react';
import React, { useCallback } from 'react';
import { BoxShadow, Colors } from '../../../styles';
import { Accomodation, Vehicle } from '../../../types/GoogleSheetTrip.type';
import Accomodations from './Accomodations';
import Sidebar from './Sidebar';

type Props = {
  date: string;
  vehicles: Vehicle[];
  accomodations: Accomodation[];
};

const QuickInfoCard = ({ date, vehicles, accomodations }: Props) => {
  const getCheckInAccomodation = useCallback(
    (date: string) => {
      return accomodations.find(acc => {
        const currentDate = Date.parse(date);
        const checkInDate = Date.parse(acc.checkIn);
        const checkOutDate = Date.parse(acc.checkOut);

        return currentDate >= checkInDate && currentDate < checkOutDate;
      });
    },
    [accomodations],
  );

  const getCheckOutAccomodation = useCallback(
    (date: string) => {
      return accomodations.find(acc => {
        const currentDate = Date.parse(date);
        const checkOutDate = Date.parse(acc.checkOut);

        return currentDate === checkOutDate;
      });
    },
    [accomodations],
  );

  return (
    <Flex
      key={date}
      p="16px 8px"
      backgroundColor={Colors.cardBackground}
      borderRadius="8px"
      boxShadow={BoxShadow.light}
    >
      <Sidebar date={date} vehicles={vehicles} />
      <Accomodations
        date={date}
        checkInAccomodation={getCheckInAccomodation(date)}
        checkOutAccomodation={getCheckOutAccomodation(date)}
      />
    </Flex>
  );
};

export default QuickInfoCard;
