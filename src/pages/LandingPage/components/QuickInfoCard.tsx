import { Flex } from '@chakra-ui/react';
import React from 'react';
import { BoxShadow, Colors } from '../../../styles';
import { Accomodation } from '../../../types/GoogleSheetTrip.type';
import Accomodations from './Accomodations';
import Sidebar from './Sidebar';

type Props = {
  date: string;
  checkInAccomodation?: Accomodation;
  checkOutAccomodation?: Accomodation;
};

const QuickInfoCard = ({ date, checkInAccomodation, checkOutAccomodation }: Props) => {
  const handleClick = (date: string) => {
    // eslint-disable-next-line no-console
    console.log('clicked', date);
  };

  return (
    <Flex
      key={date}
      p="16px 8px"
      onClick={() => handleClick(date)}
      backgroundColor={Colors.cardBackground}
      borderRadius="8px"
      boxShadow={BoxShadow.light}
    >
      <Sidebar date={date} />
      <Accomodations
        date={date}
        checkInAccomodation={checkInAccomodation}
        checkOutAccomodation={checkOutAccomodation}
      />
    </Flex>
  );
};

export default QuickInfoCard;
