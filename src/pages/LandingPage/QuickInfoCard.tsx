import { Box, Flex, Text } from '@chakra-ui/react';
import { faCarSide, faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useCallback, useMemo } from 'react';
import { BoxShadow, Colors } from '../../styles';
import { Accomodation } from '../../types/GoogleSheetTrip.type';
import { AccomodationType } from '../../types/types';
import AccomodationInfo from './AccomodationInfo';
import DateBubble from './DateBubble';

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

  const isCheckingIn = useMemo(() => date === checkInAccomodation?.checkIn, [checkInAccomodation, date]);

  const drivingInfo = useCallback(() => {
    return (
      <Flex h="40px" w="100%" justifyContent="space-between" alignItems="center" color={Colors.driving}>
        <Box>
          <Text as="i" fontWeight="bold">
            {checkOutAccomodation!.location}
          </Text>
        </Box>
        <Box>
          <FontAwesomeIcon icon={faEllipsis} />
        </Box>
        <Box>
          <FontAwesomeIcon icon={faCarSide} />
        </Box>
        <Box>
          <FontAwesomeIcon icon={faEllipsis} />
        </Box>
        <Box>
          <Text as="i" fontWeight="bold">
            {checkInAccomodation!.location}
          </Text>
        </Box>
      </Flex>
    );
  }, [checkOutAccomodation, checkInAccomodation]);

  return (
    <Flex
      key={date}
      p="8px"
      onClick={() => handleClick(date)}
      backgroundColor={Colors.cardBackground}
      borderRadius="8px"
      boxShadow={BoxShadow.light}
    >
      <Flex flexDirection="column" justifyContent="space-between" h="100%" w="90px">
        <DateBubble date={date} />
      </Flex>
      <Flex
        flexDirection="column"
        justifyContent="space-between"
        gap="10px"
        pl="15px"
        minH="250px"
        w="calc(100% - 90px)"
      >
        {checkOutAccomodation && (
          <AccomodationInfo accomodation={checkOutAccomodation} type={AccomodationType.CHECKOUT} />
        )}
        {checkOutAccomodation && checkInAccomodation && drivingInfo()}
        {checkInAccomodation && isCheckingIn && (
          <AccomodationInfo accomodation={checkInAccomodation} type={AccomodationType.CHECKIN} />
        )}
        {checkInAccomodation && !isCheckingIn && (
          <AccomodationInfo accomodation={checkInAccomodation} type={AccomodationType.CURRENT} />
        )}
      </Flex>
    </Flex>
  );
};

export default QuickInfoCard;
