import React from "react";
import { useSprings } from "react-spring";
import { useDrag } from "react-use-gesture";

import { DraggableItemsListContainer } from "./DraggableItemsListContainer";

export interface DraggableItemsListProps {
  moveItem: (item: React.ReactNode, position: number) => void;
  children: React.ReactNode[];
}

export const DraggableItemsList: React.FC<DraggableItemsListProps> = ({
  moveItem,
  children
}) => {
  const [springs, updateSprings] = useSprings(children.length, index => ({}));

  return (
    <DraggableItemsListContainer width="" height="">
      {children.map(child => child)}
    </DraggableItemsListContainer>
  );
};
