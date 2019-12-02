interface ClampOptions {
  data: number;
  lower: number;
  upper: number;
}

export const clamp = ({ data, lower, upper }: ClampOptions) => {
  if (data < lower) {
    return lower;
  }
  if (data > upper) {
    return upper;
  }
  return data;
};
