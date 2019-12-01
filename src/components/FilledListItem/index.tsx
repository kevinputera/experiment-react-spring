import styled from "styled-components";

export interface FilledListItemProps {
  fillColor: string;
}

export const FilledListItem = styled.div<FilledListItemProps>`
  height: 80px;
  width: 240px;
  border-radius: 4px;
  background-color: ${({ fillColor }) => fillColor};
`;
