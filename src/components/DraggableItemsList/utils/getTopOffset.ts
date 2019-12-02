import { Dimension } from "../../../typings";

interface GetTopOffsetOptions {
  items: React.ReactElement[];
  getItemDimension: (key: string | number) => Dimension;
  index: number;
}

export const getTopOffset = ({
  items,
  getItemDimension,
  index
}: GetTopOffsetOptions) => {
  return items
    .slice(0, index)
    .map(item => {
      if (!item.key) {
        throw new Error("Children must have valid keys");
      }
      return getItemDimension(item.key);
    })
    .reduce((prev, dimension) => prev + dimension.height, 0);
};
