import { Dimension } from "../../../typings";

interface GetTopOffsetOptions {
  keyOrder: (string | number)[];
  key: string | number;
  gutter: number;
  getItemDimension: (key: string | number) => Dimension;
}

export const getTopOffset = ({
  keyOrder,
  key,
  gutter,
  getItemDimension
}: GetTopOffsetOptions) => {
  return keyOrder
    .slice(0, keyOrder.indexOf(key))
    .map(key => getItemDimension(key))
    .reduce((prev, dimension) => prev + dimension.height + gutter, 0);
};
