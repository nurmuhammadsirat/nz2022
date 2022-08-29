import { Text, TextProps } from '@chakra-ui/react';
import React from 'react';

export const headerTitle = (title: string, color: string, props: TextProps = {}) => (
  <Text as="i" fontSize="sm" fontWeight="bold" color={color} {...props}>
    {title}
  </Text>
);

export const headerValue = (value: string) => <Text fontSize="sm">{value}</Text>;
