import { config } from "react-spring";

import { getTopOffset } from "./getTopOffset";
import { Dimension } from "../../../typings";
import { shift } from "../../../utils";

interface GetSpringStyleOptions {
  keyOrder: (string | number)[];
  gutter: number;
  getItemDimension: (key: string | number) => Dimension;

  dragged?: boolean;
  draggedIndex?: number;
  newDraggedIndex?: number;
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
  dragged,
  draggedIndex,
  newDraggedIndex,
  xOffset,
  yOffset
}: GetSpringStyleOptions) => {
  return (index: number) => {
    if (
      !dragged ||
      draggedIndex === undefined ||
      newDraggedIndex === undefined ||
      xOffset === undefined ||
      yOffset === undefined ||
      index !== draggedIndex
    ) {
      return {
        left: 0,
        top: getTopOffset({
          keyOrder:
            draggedIndex !== undefined &&
            newDraggedIndex !== undefined &&
            newDraggedIndex !== draggedIndex
              ? shift({
                  items: keyOrder,
                  from: draggedIndex,
                  to: newDraggedIndex
                })
              : keyOrder,
          key: keyOrder[index],
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
          key: keyOrder[draggedIndex],
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
