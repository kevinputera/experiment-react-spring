import styled from "styled-components";

export interface DraggableItemsListContainerProps {
  height: string;
  width: string;
}

// prettier-ignore
// eslint-disable-next-line no-unexpected-multiline
export const DraggableItemsListContainer = styled.div<DraggableItemsListContainerProps>`
  display: relative;
  height: ${({ height }) => height};
  width: ${({ width }) => width};
`;
