import { Flex } from '@chakra-ui/react';
import React, { useMemo } from 'react';
import { AccomodationType } from '../../../types';
import { Accomodation } from '../../../types/GoogleSheetTrip.type';
import AccomodationInfo from './AccomodationInfo';
import DrivingInfo from './DrivingInfo';

type Props = {
  date: string;
  checkInAccomodation?: Accomodation;
  checkOutAccomodation?: Accomodation;
};

const Accomodations = ({ date, checkInAccomodation, checkOutAccomodation }: Props) => {
  const isCheckingIn = useMemo(() => date === checkInAccomodation?.checkIn, [checkInAccomodation, date]);

  return (
    <Flex flexDirection="column" justifyContent="space-between" gap="10px" pl="15px" w="calc(100% - 90px)">
      {checkOutAccomodation && (
        <AccomodationInfo accomodation={checkOutAccomodation} type={AccomodationType.CHECKOUT} />
      )}
      {checkOutAccomodation && checkInAccomodation && (
        <DrivingInfo checkInAccomodation={checkInAccomodation} checkOutAccomodation={checkOutAccomodation} />
      )}
      {checkInAccomodation && isCheckingIn && (
        <AccomodationInfo accomodation={checkInAccomodation} type={AccomodationType.CHECKIN} />
      )}
      {checkInAccomodation && !isCheckingIn && (
        <AccomodationInfo accomodation={checkInAccomodation} type={AccomodationType.CURRENT} />
      )}
    </Flex>
  );
};

export default Accomodations;
