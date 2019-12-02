import { config } from "react-spring";

import { getTopOffset } from "./getTopOffset";
import { Dimension } from "../../../typings";

interface GetSpringStyleOptions {
  unorderedItems: React.ReactElement[];
  keyOrder: (string | number)[];
  getItemDimension: (key: string | number) => Dimension;

  dragged?: boolean;
  draggedSpringIndex?: number;
  xOffset?: number;
  yOffset?: number;
}

const SPRING_CONFIG = {
  ...config.stiff,
  tension: 280,
  clamp: true
};

export const getSpringStyle = ({
  unorderedItems,
  keyOrder,
  getItemDimension,
  dragged,
  draggedSpringIndex,
  xOffset,
  yOffset
}: GetSpringStyleOptions) => {
  const getItemIndexFromSpringIndex = (springIndex: number) => {
    return keyOrder.indexOf(unorderedItems[springIndex].key!);
  };

  return (springIndex: number) => {
    if (
      !dragged ||
      draggedSpringIndex === undefined ||
      xOffset === undefined ||
      yOffset === undefined ||
      springIndex !== draggedSpringIndex
    ) {
      return {
        cursor: "zoom-in",
        zIndex: 0,
        left: 0,
        top: getTopOffset({
          keyOrder,
          index: getItemIndexFromSpringIndex(springIndex),
          getItemDimension
        }),
        opacity: 1,
        immediate: () => false,
        config: SPRING_CONFIG
      };
    }
    return {
      cursor: "grabbing",
      zIndex: 1,
      left: xOffset,
      top:
        getTopOffset({
          keyOrder,
          index: getItemIndexFromSpringIndex(springIndex),
          getItemDimension
        }) + yOffset,
      opacity: 0.8,
      immediate: (key: string) => key === "left" || key === "top",
      config: SPRING_CONFIG
    };
  };
};
