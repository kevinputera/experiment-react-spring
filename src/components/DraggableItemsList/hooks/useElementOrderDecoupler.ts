import React, { useState, useEffect, useCallback } from "react";

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

  const getKeyFromUnorderedIndex = useCallback(
    (unorderedIndex: number) => elements[unorderedIndex].key!,
    [elements]
  );

  return {
    unorderedElements: elements,
    keyOrder,
    getKeyFromUnorderedIndex
  };
};
