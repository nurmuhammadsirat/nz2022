import { Alert, AlertIcon } from '@chakra-ui/react';
import React, { useEffect, useMemo, useState } from 'react';

const HOURLY = 1000 * 60 * 60;

type Props = {
  firstDayDate: string;
};

const Countdown = ({ firstDayDate }: Props) => {
  const [months, setMonths] = useState(-1);
  const [days, setDays] = useState(-1);

  useEffect(() => {
    const timer = setInterval(() => {
      const tripDate = Date.parse(firstDayDate);
      const now = Date.now();
      const dateDiff = new Date(tripDate - now);
      setMonths(dateDiff.getUTCMonth());
      setDays(dateDiff.getUTCDate() - 1);
    }, HOURLY);

    return () => {
      clearInterval(timer);
    };
  }, [firstDayDate]);

  const text = useMemo(() => {
    const arr = [];
    if (months > 0) {
      arr.push(`${months} months`);
    }

    if (days > 0) {
      arr.push(`${days} days`);
    }
    return arr;
  }, [months, days]);

  if (months <= 0 && days <= 0) {
    return null;
  }

  return (
    <Alert status="info" alignItems="center" justifyContent="center" textAlign="center">
      <AlertIcon />
      {text.join(' and ')} to go!
    </Alert>
  );
};

export default Countdown;
