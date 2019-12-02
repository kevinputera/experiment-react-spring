import React, { useMemo } from "react";
import { useSprings, animated } from "react-spring";
import { useDrag } from "react-use-gesture";

import { Dimension } from "../../typings";
import { DraggableItemsListContainer } from "./DraggableItemsListContainer";
import { getTopOffset } from "./utils";
import { getSpringStyle } from "./utils/getSpringStyle";

interface DraggableItemsListProps {
  children: React.ReactElement[];
  getChildDimension: (key: string | number) => Dimension;
  moveItem: (key: string | number, position: number) => void;
}

export const DraggableItemsList: React.FC<DraggableItemsListProps> = ({
  children,
  getChildDimension,
  moveItem
}) => {
  const [springs, setSprings] = useSprings(
    children.length,
    getSpringStyle({ items: children, getItemDimension: getChildDimension })
  );

  const bindDrag = useDrag(
    ({ args: [draggedIndex], down, movement: [x, y] }) => {
      setSprings(
        getSpringStyle({
          items: children,
          getItemDimension: getChildDimension,
          dragged: down,
          draggedIndex,
          xOffset: x,
          yOffset: y
        })
      );
    }
  );

  const containerWidth = useMemo(
    () =>
      Math.max(...children.map(child => getChildDimension(child.key!).width)),
    [children, getChildDimension]
  );
  const containerHeight = useMemo(
    () =>
      getTopOffset({
        items: children,
        getItemDimension: getChildDimension,
        index: children.length
      }),
    [children, getChildDimension]
  );

  return (
    <DraggableItemsListContainer
      width={containerWidth}
      height={containerHeight}
    >
      {children.map((child, index) => (
        <animated.div {...bindDrag(index)} key={index} style={springs[index]}>
          {child}
        </animated.div>
      ))}
    </DraggableItemsListContainer>
  );
};
