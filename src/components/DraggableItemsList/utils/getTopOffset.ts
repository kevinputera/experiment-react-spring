import { Dimension } from "../../../typings";

interface GetTopOffsetOptions {
  keyOrder: (string | number)[];
  index: number;
  getItemDimension: (key: string | number) => Dimension;
}

const INTER_ITEM_PADDING = 8;

export const getTopOffset = ({
  keyOrder,
  index,
  getItemDimension
}: GetTopOffsetOptions) => {
  return keyOrder
    .slice(0, index)
    .map(key => getItemDimension(key))
    .reduce(
      (prev, dimension) => prev + dimension.height + INTER_ITEM_PADDING,
      0
    );
};
