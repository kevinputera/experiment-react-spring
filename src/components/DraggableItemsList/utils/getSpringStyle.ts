import { config } from "react-spring";

import { getTopOffset } from "./getTopOffset";
import { Dimension } from "../../../typings";

interface GetSpringStyleOptions {
  items: React.ReactElement[];
  getItemDimension: (key: string | number) => Dimension;

  dragged?: boolean;
  draggedIndex?: number;
  xOffset?: number;
  yOffset?: number;
}

const SPRING_CONFIG = {
  ...config.stiff,
  tension: 280,
  clamp: true
};

export const getSpringStyle = ({
  items,
  getItemDimension,
  dragged,
  draggedIndex,
  xOffset,
  yOffset
}: GetSpringStyleOptions) => {
  return (index: number) => {
    if (
      !dragged ||
      draggedIndex === undefined ||
      xOffset === undefined ||
      yOffset === undefined ||
      index !== draggedIndex
    ) {
      return {
        cursor: "zoom-in",
        zIndex: 0,
        left: 0,
        top: getTopOffset({ items, getItemDimension, index }),
        immediate: false,
        config: SPRING_CONFIG
      };
    }
    return {
      cursor: "grabbing",
      zIndex: 1,
      left: xOffset,
      top: getTopOffset({ items, getItemDimension, index }) + yOffset,
      immediate: true,
      config: SPRING_CONFIG
    };
  };
};
