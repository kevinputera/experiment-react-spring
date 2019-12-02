import React, { useState, useCallback } from "react";
import styled from "styled-components";

import { DraggableItemsList, FilledListItem } from "./components";

const AppContainer = styled.div`
  height: 100%;
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
`;

interface CustomItem {
  key: string | number;
  width: number;
  height: number;
  fillColor: string;
}

const App: React.FC = () => {
  const [items, setItems] = useState<CustomItem[]>([
    { key: 1, width: 240, height: 80, fillColor: "#293742" },
    { key: 2, width: 240, height: 80, fillColor: "#5C7080" },
    { key: 3, width: 240, height: 80, fillColor: "#BFCCD6" },
    { key: 4, width: 240, height: 80, fillColor: "#D8E1E8" }
  ]);

  const getItemDimension = useCallback(
    (key: string | number) => {
      const item = items.find(item => item.key.toString() === key.toString());
      if (!item) {
        throw new Error("Key is invalid");
      }
      return {
        width: item.width,
        height: item.height
      };
    },
    [items]
  );

  const moveItem = useCallback(
    (key: string | number, position: number) => {
      const currentIndex = items.findIndex(item => item.key === key);
      if (position <= currentIndex) {
        setItems([
          ...items.slice(0, position),
          items[currentIndex],
          ...items.slice(position, currentIndex),
          ...items.slice(currentIndex + 1)
        ]);
      } else {
        setItems([
          ...items.slice(0, currentIndex),
          ...items.slice(currentIndex + 1, position + 1),
          items[currentIndex],
          ...items.slice(position + 1)
        ]);
      }
    },
    [items, setItems]
  );

  return (
    <AppContainer>
      <DraggableItemsList
        moveItem={moveItem}
        getChildDimension={getItemDimension}
      >
        {items.map(({ key, width, height, fillColor }) => (
          <FilledListItem
            key={key}
            width={width}
            height={height}
            fillColor={fillColor}
          />
        ))}
      </DraggableItemsList>
    </AppContainer>
  );
};

export default App;
