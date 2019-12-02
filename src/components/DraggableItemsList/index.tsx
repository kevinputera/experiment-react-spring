import React, { useMemo, useEffect } from "react";
import { useSprings, animated } from "react-spring";
import { useDrag } from "react-use-gesture";

import { Dimension } from "../../typings";
import { DraggableItemsListContainer } from "./DraggableItemsListContainer";
import { clamp } from "../../utils";
import { getTopOffset, getSpringStyle } from "./utils";
import { useElementOrderDecoupler } from "./hooks";

interface DraggableItemsListProps {
  children: React.ReactElement[];
  getChildDimension: (key: string | number) => Dimension;
  moveItem: (key: string | number, to: number) => void;
}

export const DraggableItemsList: React.FC<DraggableItemsListProps> = ({
  children,
  getChildDimension,
  moveItem
}) => {
  const {
    unorderedElements: unorderedItems,
    keyOrder,
    moveKey
  } = useElementOrderDecoupler(children);

  const [springs, setSprings] = useSprings(
    children.length,
    getSpringStyle({
      unorderedItems,
      keyOrder,
      getItemDimension: getChildDimension
    })
  );
  useEffect(() => {
    setSprings(
      getSpringStyle({
        unorderedItems,
        keyOrder,
        getItemDimension: getChildDimension
      })
    );
  }, [unorderedItems, keyOrder, getChildDimension, setSprings]);

  const bindDrag = useDrag(
    ({ args: [draggedSpringIndex], down, movement: [x, y] }) => {
      const draggedKey = unorderedItems[draggedSpringIndex].key!;

      const oldIndex = keyOrder.indexOf(draggedKey);
      const newIndex = clamp({
        data: Math.round((oldIndex * 88 + y) / 88),
        lower: 0,
        upper: unorderedItems.length - 1
      });

      if (newIndex !== oldIndex) {
        moveKey(draggedKey, newIndex);
      }

      setSprings(
        getSpringStyle({
          unorderedItems,
          keyOrder,
          getItemDimension: getChildDimension,
          dragged: down,
          draggedSpringIndex,
          xOffset: x,
          yOffset: y
        })
      );

      if (!down) {
        moveItem(draggedKey, newIndex);
      }
    }
  );

  const containerWidth = useMemo(
    () => Math.max(...keyOrder.map(key => getChildDimension(key).width)),
    [keyOrder, getChildDimension]
  );
  const containerHeight = useMemo(
    () =>
      getTopOffset({
        keyOrder,
        index: children.length,
        getItemDimension: getChildDimension
      }),
    [keyOrder, children.length, getChildDimension]
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
