import React, { useCallback, useState, useEffect } from "react";

import { shift } from "../../../utils";

const sortElements = (elements: React.ReactElement[]) => {
  return [...elements].sort((a, b) => {
    if (a.key! < b.key!) {
      return -1;
    }
    if (a.key! > b.key!) {
      return 1;
    }
    return 0;
  });
};

const extractKeyOrder = (elements: React.ReactElement[]) => {
  return elements.map(element => element.key!);
};

export const useElementOrderDecoupler = (
  orderedElements: React.ReactElement[]
) => {
  const [elements, setElements] = useState(sortElements(orderedElements));
  const [keyOrder, setKeyOrder] = useState(extractKeyOrder(orderedElements));

  useEffect(() => {
    setElements(sortElements(orderedElements));
    setKeyOrder(extractKeyOrder(orderedElements));
  }, [orderedElements]);

  const moveKey = useCallback(
    (key: string | number, to: number) => {
      setKeyOrder(shift({ items: keyOrder, from: keyOrder.indexOf(key), to }));
    },
    [keyOrder, setKeyOrder]
  );

  return {
    unorderedElements: elements,
    keyOrder,
    moveKey
  };
};
