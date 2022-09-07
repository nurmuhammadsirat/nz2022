import { Box, Flex, Center } from '@chakra-ui/react';
import React, { ReactNode, useMemo } from 'react';
import { BoxShadow, Colors } from '../../../styles';

type Props = {
  date: string;
};

const CALENDAR_ICON_RADIUS = '8px';
const CALENDAR_ICON_SIDES = '80px';

// Date.prototype.getDay() returns an integer 0-6 corresponding to Sun-Sat.
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getDay
const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

// Date.prototype.getDay() returns an integer where 0 is January.
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getMonth
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'NOV', 'DEC'];

const Month = ({ children }: { children: ReactNode }) => (
  <Center
    color={Colors.calendar.month.text}
    backgroundColor={Colors.calendar.month.background}
    fontSize="16px"
    fontWeight="700"
  >
    {children}
  </Center>
);

const DateOfMonth = ({ children }: { children: ReactNode }) => (
  <Center
    color={Colors.calendar.date.text}
    backgroundColor={Colors.calendar.date.background}
    fontSize="24px"
    fontWeight="800"
  >
    {children}
  </Center>
);

const Day = ({ children }: { children: ReactNode }) => (
  <Center
    color={Colors.calendar.day.text}
    backgroundColor={Colors.calendar.day.background}
    fontSize="11px"
    fontWeight="700"
  >
    {children}
  </Center>
);

const Calendar = ({ date }: Props) => {
  const parsedDate = useMemo(() => new Date(date), [date]);

  return (
    <Flex
      h={CALENDAR_ICON_SIDES}
      w={CALENDAR_ICON_SIDES}
      borderRadius={CALENDAR_ICON_RADIUS}
      overflow="hidden"
      flexDirection="column"
      justifyContent="space-between"
      boxShadow={BoxShadow.light}
    >
      <Month>{MONTHS[parsedDate.getMonth()]}</Month>
      <Box borderBottomLeftRadius={CALENDAR_ICON_RADIUS} borderBottomRightRadius={CALENDAR_ICON_RADIUS}>
        <DateOfMonth>{parsedDate.getDate()}</DateOfMonth>
        <Day>{DAYS[parsedDate.getDay()]}</Day>
      </Box>
    </Flex>
  );
};

export default Calendar;
