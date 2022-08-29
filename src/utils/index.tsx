import { Text, TextProps } from '@chakra-ui/react';
import React from 'react';

const KEY = 'ACCESSCODE';

export const getAccessKey = (): string => {
  return localStorage.getItem(KEY) || '';
};

export const setAccessKey = (value: string) => {
  localStorage.setItem(KEY, value);
};

export const headerTitle = (title: string, color: string, props: TextProps = {}) => (
  <Text as="i" fontSize="sm" fontWeight="bold" color={color} {...props}>
    {title}
  </Text>
);

export const headerValue = (value: string) => <Text fontSize="sm">{value}</Text>;
