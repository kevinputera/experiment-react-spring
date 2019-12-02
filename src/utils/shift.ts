interface ShiftOptions {
  items: any[];
  from: number;
  to: number;
}

export const shift = ({ items, from, to }: ShiftOptions) => {
  if (to <= from) {
    return [
      ...items.slice(0, to),
      items[from],
      ...items.slice(to, from),
      ...items.slice(from + 1)
    ];
  } else {
    return [
      ...items.slice(0, from),
      ...items.slice(from + 1, to + 1),
      items[from],
      ...items.slice(to + 1)
    ];
  }
};
