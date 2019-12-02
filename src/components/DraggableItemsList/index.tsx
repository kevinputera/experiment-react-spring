import React, { useMemo } from "react";
import { useSprings, animated } from "react-spring";
import { useDrag } from "react-use-gesture";

import { Dimension } from "../../typings";
import { DraggableItemsListContainer } from "./DraggableItemsListContainer";
import { clamp } from "../../utils";
import { getSpringStyle } from "./utils";

interface DraggableItemsListProps {
  children: React.ReactElement[];
  gutter: number;
  getChildDimension: (key: string | number) => Dimension;
  moveItem: (key: string | number, to: number) => void;
}

export const DraggableItemsList: React.FC<DraggableItemsListProps> = ({
  children,
  gutter,
  getChildDimension,
  moveItem
}) => {
  const keyOrder = useMemo(() => children.map(child => child.key!), [children]);

  const [springs, setSprings] = useSprings(
    children.length,
    getSpringStyle({
      keyOrder,
      gutter,
      getItemDimension: getChildDimension
    })
  );

  const bindDrag = useDrag(({ args: [draggedKey], down, movement: [x, y] }) => {
    const draggedIndex = keyOrder.indexOf(draggedKey);
    const newDraggedIndex = clamp({
      data: Math.round((draggedIndex * 88 + y) / 88),
      lower: 0,
      upper: keyOrder.length - 1
    });

    setSprings(
      getSpringStyle({
        keyOrder,
        gutter,
        getItemDimension: getChildDimension,
        dragged: down,
        draggedIndex,
        newDraggedIndex,
        xOffset: x,
        yOffset: y
      })
    );

    if (!down && draggedIndex !== newDraggedIndex) {
      moveItem(draggedKey, newDraggedIndex);
    }
  });

  const containerWidth = useMemo(
    () => Math.max(...keyOrder.map(key => getChildDimension(key).width)),
    [keyOrder, getChildDimension]
  );
  const containerHeight = useMemo(
    () =>
      keyOrder
        .map(key => getChildDimension(key))
        .reduce((prev, dimension) => prev + dimension.height + gutter, 0),
    [keyOrder, gutter, getChildDimension]
  );

  return (
    <DraggableItemsListContainer
      width={containerWidth}
      height={containerHeight}
    >
      {children.map((child, index) => (
        <animated.div
          {...bindDrag(child.key!)}
          key={index}
          style={springs[index]}
        >
          {child}
        </animated.div>
      ))}
    </DraggableItemsListContainer>
  );
};
