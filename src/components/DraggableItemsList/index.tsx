import React, { useMemo } from "react";
import { useSprings, animated } from "react-spring";
import { useDrag } from "react-use-gesture";

import { Dimension } from "../../typings";
import { DraggableItemsListContainer } from "./DraggableItemsListContainer";
import { clamp, shift } from "../../utils";
import { getSpringStyle } from "./utils";
import { useElementOrderDecoupler } from "./hooks";

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
  const {
    unorderedElements: unorderedItems,
    keyOrder,
    getKeyFromUnorderedIndex
  } = useElementOrderDecoupler(children);

  const [springs, setSprings] = useSprings(
    unorderedItems.length,
    getSpringStyle({
      keyOrder,
      gutter,
      getItemDimension: getChildDimension,
      getKeyFromSpringIndex: getKeyFromUnorderedIndex
    })
  );

  const bindDrag = useDrag(
    ({ args: [draggedSpringIndex], down, movement: [x, y] }) => {
      const draggedKey = unorderedItems[draggedSpringIndex].key!;

      const draggedIndex = keyOrder.indexOf(draggedKey);
      const newDraggedIndex = clamp({
        data: Math.round((draggedIndex * 88 + y) / 88),
        lower: 0,
        upper: keyOrder.length - 1
      });

      let optimisticKeyOrder = keyOrder;
      if (newDraggedIndex !== draggedIndex) {
        optimisticKeyOrder = shift({
          items: keyOrder,
          from: draggedIndex,
          to: newDraggedIndex
        });
      }

      setSprings(
        getSpringStyle({
          keyOrder,
          gutter,
          getItemDimension: getChildDimension,
          getKeyFromSpringIndex: getKeyFromUnorderedIndex,
          optimisticKeyOrder,
          dragged: down,
          draggedSpringIndex,
          xOffset: x,
          yOffset: y
        })
      );

      if (!down && draggedIndex !== newDraggedIndex) {
        moveItem(draggedKey, newDraggedIndex);
      }
    }
  );

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
      {unorderedItems.map((item, index) => (
        <animated.div {...bindDrag(index)} key={index} style={springs[index]}>
          {item}
        </animated.div>
      ))}
    </DraggableItemsListContainer>
  );
};
