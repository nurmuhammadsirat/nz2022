import { Text } from '@chakra-ui/react';
import React from 'react';

export const headerTitle = (title: string, color: string) => (
  <Text as="i" fontSize="sm" fontWeight="bold" color={color}>
    {title}
  </Text>
);

export const headerValue = (value: string) => <Text fontSize="sm">{value}</Text>;
