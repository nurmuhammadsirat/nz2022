import { Text, TextProps } from '@chakra-ui/react';
import React from 'react';
import { GoogleSheetTripResponse } from '../types';

const KEY_ACCESSCODE = 'ACCESSCODE';
const KEY_TRIPDATA = 'TRIPDATA';

export const BASE_NETLIFY_PATH = '/.netlify/functions';

export const DATES = [
  'November 30, 2022',
  'December 1, 2022',
  'December 2, 2022',
  'December 3, 2022',
  'December 4, 2022',
  'December 5, 2022',
  'December 6, 2022',
  'December 7, 2022',
  'December 8, 2022',
  'December 9, 2022',
  'December 10, 2022',
  'December 11, 2022',
  'December 12, 2022',
  'December 13, 2022',
  'December 14, 2022',
  'December 15, 2022',
  'December 16, 2022',
  'December 17, 2022',
  'December 18, 2022',
  'December 19, 2022',
  'December 20, 2022',
  'December 21, 2022',
  'December 22, 2022',
  'December 23, 2022',
  'December 24, 2022',
  'December 25, 2022',
  'December 26, 2022',
];

export const HEADERHEIGHT = 150;
export const FOOTERHEIGHT = 50;
export const FOOTERMOBILEHEIGHT = 80;

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
