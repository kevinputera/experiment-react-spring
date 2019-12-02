import styled from "styled-components";

import { Dimension } from "../../typings";

interface FilledListItemProps extends Dimension {
  fillColor: string;
}

export const FilledListItem = styled.div<FilledListItemProps>`
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  background-color: ${({ fillColor }) => fillColor};
  border-radius: 4px;
`;
