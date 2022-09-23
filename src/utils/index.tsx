import { Text, TextProps } from '@chakra-ui/react';
import React from 'react';
import { GoogleSheetTripResponse } from '../types';

const KEY_ACCESSCODE = 'ACCESSCODE';
const KEY_TRIPDATA = 'TRIPDATA';

export const BASE_NETLIFY_PATH = '/.netlify/functions';

export const DATES = [
  '30-Nov-2022',
  '1-Dec-2022',
  '2-Dec-2022',
  '3-Dec-2022',
  '4-Dec-2022',
  '5-Dec-2022',
  '6-Dec-2022',
  '7-Dec-2022',
  '8-Dec-2022',
  '9-Dec-2022',
  '10-Dec-2022',
  '11-Dec-2022',
  '12-Dec-2022',
  '13-Dec-2022',
  '14-Dec-2022',
  '15-Dec-2022',
  '16-Dec-2022',
  '17-Dec-2022',
  '18-Dec-2022',
  '19-Dec-2022',
  '20-Dec-2022',
  '21-Dec-2022',
  '22-Dec-2022',
  '23-Dec-2022',
  '24-Dec-2022',
  '25-Dec-2022',
  '26-Dec-2022',
];

export const HEADERHEIGHT = 150;
export const FOOTERHEIGHT = 50;

export const getAccessCode = (): string => {
  return localStorage.getItem(KEY_ACCESSCODE) || '';
};

export const setAccessCode = (value: string) => {
  localStorage.setItem(KEY_ACCESSCODE, value);
};

export const storeData = (tripData: GoogleSheetTripResponse) => {
  localStorage.setItem(KEY_TRIPDATA, JSON.stringify(tripData));
  dispatchEvent(new Event('TripDataDhange'));
};

export const getData = (): GoogleSheetTripResponse | null => {
  const tripData = localStorage.getItem(KEY_TRIPDATA);
  if (!tripData) {
    return null;
  }

  return JSON.parse(tripData);
};

export const headerTitle = (title: string, color: string, props: TextProps = {}) => (
  <Text as="i" fontSize="sm" fontWeight="bold" color={color} {...props}>
    {title}
  </Text>
);

export const headerValue = (value: string) => <Text fontSize="sm">{value}</Text>;

export const handleLinkOpen = (url: string) => {
  window.open(url, '_blank')!.focus();
};
