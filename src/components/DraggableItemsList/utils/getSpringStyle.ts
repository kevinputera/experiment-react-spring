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
        left: 0,
        top: getTopOffset({
          keyOrder,
          index: getItemIndexFromSpringIndex(springIndex),
          getItemDimension
        }),
        cursor: "zoom-in",
        zIndex: 0,
        opacity: 1,
        boxShadow: "rgba(0, 0, 0, 0.15) 0px 1px 2px 0px",
        immediate: () => false,
        config: SPRING_CONFIG
      };
    }
    return {
      left: xOffset,
      top:
        getTopOffset({
          keyOrder,
          index: getItemIndexFromSpringIndex(springIndex),
          getItemDimension
        }) + yOffset,
      cursor: "grabbing",
      zIndex: 1,
      opacity: 0.9,
      boxShadow: "rgba(0, 0, 0, 0.15) 0px 4px 8px 0px",
      immediate: (key: string) => key === "left" || key === "top",
      config: SPRING_CONFIG
    };
  };
};
