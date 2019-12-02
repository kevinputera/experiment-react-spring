import styled from "styled-components";

import { Dimension } from "../../typings";

interface DraggableItemsListContainerProps extends Dimension {}

// prettier-ignore
// eslint-disable-next-line no-unexpected-multiline
export const DraggableItemsListContainer = styled.div<DraggableItemsListContainerProps>`
  height: ${({ height }) => height}px;
  width: ${({ width }) => width}px;

  position: relative;

  & > * {
    position: absolute;
  }
`;
