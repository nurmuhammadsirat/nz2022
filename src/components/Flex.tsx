import styled from 'styled-components';
import Box from './Box';

type SpacingAttribute = string | number;

type Props = {
  justifyContent?: string;
  alignItems?: string;
  flexDirection?: string;
  flex?: string;
  gap?: SpacingAttribute;
  flexWrap?: string;
};

const Flex = styled(Box)<Props>`
  display: flex;
  ${({ justifyContent, alignItems, flexDirection, gap, flex, flexWrap }) => `
        ${justifyContent ? `justify-content: ${justifyContent};` : ''}
        ${alignItems ? `align-items: ${alignItems};` : ''}
        ${flexDirection ? `flex-direction: ${flexDirection};` : ''}
        ${gap ? `gap: ${gap};` : ''}
        ${flex ? `flex: ${flex};` : ''}
        ${flexWrap ? `flex-wrap: ${flexWrap};` : ''}
    `}
`;

export default Flex;
