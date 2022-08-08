import { isNil } from 'ramda';
import styled from 'styled-components';

type SpacingAttribute = string | number;

type BorderProps = {
  border?: string;
  borderRight?: string;
  borderLeft?: string;
  borderTop?: string;
  borderBottom?: string;
  borderRadius?: SpacingAttribute;
};

type LayoutProps = {
  bg?: string;
  position?: string;
  cursor?: string;
  w?: SpacingAttribute;
  h?: SpacingAttribute;
  minH?: SpacingAttribute;
  maxH?: SpacingAttribute;
  flex?: string | number;
  flexGrow?: string | number;
  top?: SpacingAttribute;
  bottom?: SpacingAttribute;
  left?: SpacingAttribute;
  right?: SpacingAttribute;
  overflow?: string;
  zIndex?: string | number;
  textAlign?: string;
};

type MarginProps = {
  m?: SpacingAttribute;
  ml?: SpacingAttribute;
  mr?: SpacingAttribute;
  mt?: SpacingAttribute;
  mb?: SpacingAttribute;
  mx?: SpacingAttribute;
  my?: SpacingAttribute;
};

type PaddingProps = {
  p?: SpacingAttribute;
  pl?: SpacingAttribute;
  pr?: SpacingAttribute;
  pt?: SpacingAttribute;
  pb?: SpacingAttribute;
  py?: SpacingAttribute;
  px?: SpacingAttribute;
};

export type BoxProps = MarginProps & PaddingProps & LayoutProps & BorderProps;

const getAttribute = (attr: SpacingAttribute) => (typeof attr === 'string' ? attr : `${4 * attr}px`);

const Box = styled.div<BoxProps>`
  position: relative;
  ${({ m, ml, mr, mt, mb, mx, my }) => `
        ${!isNil(m) ? `margin: ${getAttribute(m)};` : ''}
        ${!isNil(ml) ? `margin-left: ${getAttribute(ml)};` : ''}
        ${!isNil(mr) ? `margin-right: ${getAttribute(mr)};` : ''}
        ${!isNil(mt) ? `margin-top: ${getAttribute(mt)};` : ''}
        ${!isNil(mb) ? `margin-bottom: ${getAttribute(mb)};` : ''}
        ${!isNil(mx) ? `margin-left: ${getAttribute(mx)};margin-right: ${getAttribute(mx)};` : ''}
        ${!isNil(my) ? `margin-top: ${getAttribute(my)};margin-bottom: ${getAttribute(my)};` : ''}
    `}
  ${({ p, pl, pr, pt, pb, px, py }) => `
          ${!isNil(p) ? `padding: ${getAttribute(p)};` : ''}
          ${!isNil(pl) ? `padding-left: ${getAttribute(pl)};` : ''}
          ${!isNil(pr) ? `padding-right: ${getAttribute(pr)};` : ''}
          ${!isNil(pt) ? `padding-top: ${getAttribute(pt)};` : ''}
          ${!isNil(pb) ? `padding-bottom: ${getAttribute(pb)};` : ''}
          ${!isNil(px) ? `padding-left: ${getAttribute(px)};padding-right: ${getAttribute(px)};` : ''}
          ${!isNil(py) ? `padding-top: ${getAttribute(py)};padding-bottom: ${getAttribute(py)};` : ''}
      `}
  ${({ bg, position, cursor, w, h }) => `
        ${bg ? `background: ${bg};` : ''}
        ${position ? `position: ${position};` : ''}
        ${cursor ? `cursor: ${cursor};` : ''}
        ${!isNil(w) ? `width: ${getAttribute(w)};` : ''}
        ${!isNil(h) ? `height: ${getAttribute(h)};` : ''}
      `}
    ${({
    bg,
    position,
    overflow,
    cursor,
    w,
    h,
    minH,
    maxH,
    flex,
    flexGrow,
    top,
    bottom,
    left,
    right,
    zIndex,
    textAlign,
  }) => `
          ${bg ? `background: ${bg};` : ''}
          ${position ? `position: ${position};` : ''}
          ${cursor ? `cursor: ${cursor};` : ''}
          ${overflow ? `overflow: ${overflow};` : ''}
          ${textAlign ? `text-align: ${textAlign};` : ''}
          ${!isNil(w) ? `width: ${getAttribute(w)};` : ''}
          ${!isNil(h) ? `height: ${getAttribute(h)};` : ''}
          ${!isNil(minH) ? `min-height: ${getAttribute(minH)};` : ''}
          ${!isNil(maxH) ? `max-height: ${getAttribute(maxH)};` : ''}
          ${!isNil(flex) ? `flex: ${flex};` : ''}
          ${!isNil(flexGrow) ? `flex-grow: ${flexGrow};` : ''}
          ${!isNil(top) ? `top: ${getAttribute(top)};` : ''}
          ${!isNil(bottom) ? `bottom: ${getAttribute(bottom)};` : ''}
          ${!isNil(left) ? `left: ${getAttribute(left)};` : ''}
          ${!isNil(right) ? `right: ${getAttribute(right)};` : ''}
          ${!isNil(zIndex) ? `z-index: ${zIndex};` : ''}

        `}
    ${({ border, borderRight, borderLeft, borderBottom, borderTop, borderRadius }) => `
          ${border ? `border: ${border};` : ''}
          ${borderRight ? `border-right: ${borderRight};` : ''}
          ${borderLeft ? `border-left: ${borderLeft};` : ''}
          ${borderBottom ? `border-bottom: ${borderBottom};` : ''}
          ${borderTop ? `border-top: ${borderTop};` : ''}
          ${!isNil(borderRadius) ? `border-radius: ${getAttribute(borderRadius)};` : ''}

        `}
`;

export default Box;
