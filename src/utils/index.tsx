import { Text, TextProps } from '@chakra-ui/react';
import React from 'react';
import { GoogleSheetTripResponse } from '../types';

const KEY_ACCESSCODE = 'ACCESSCODE';
const KEY_TRIPDATA = 'TRIPDATA';

export const BASE_NETLIFY_PATH = '/.netlify/functions';

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
