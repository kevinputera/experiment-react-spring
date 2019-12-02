import React, { useMemo, useEffect } from "react";
import { useSprings, animated } from "react-spring";
import { useDrag } from "react-use-gesture";

import { Dimension } from "../../typings";
import { DraggableItemsListContainer } from "./DraggableItemsListContainer";
import { getTopOffset, getSpringStyle } from "./utils";
import { useElementOrderDecoupler } from "./hooks";

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
  const {
    unorderedElements: unorderedItems,
    keyOrder
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
    ({ args: [draggedSpringIndex], down, xy: [x, y] }) => {
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
