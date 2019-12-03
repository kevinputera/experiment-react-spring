import { config } from "react-spring";

import { getTopOffset } from "./getTopOffset";
import { Dimension } from "../../../typings";

interface GetSpringStyleOptions {
  keyOrder: (string | number)[];
  gutter: number;
  getItemDimension: (key: string | number) => Dimension;
  getKeyFromSpringIndex: (springIndex: number) => string | number;

  optimisticKeyOrder?: (string | number)[];
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
  keyOrder,
  gutter,
  getItemDimension,
  getKeyFromSpringIndex,
  optimisticKeyOrder,
  dragged,
  draggedSpringIndex,
  xOffset,
  yOffset
}: GetSpringStyleOptions) => {
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
          keyOrder: optimisticKeyOrder ? optimisticKeyOrder : keyOrder,
          key: getKeyFromSpringIndex(springIndex),
          gutter,
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
          key: getKeyFromSpringIndex(springIndex),
          gutter,
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
