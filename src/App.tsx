import React, { useState, useCallback } from "react";
import styled from "styled-components";

import { DraggableItemsList, FilledListItem } from "./components";
import { shift } from "./utils";

const AppContainer = styled.div`
  height: 100%;
  width: 100%;
  overflow-y: auto;

  display: flex;

  & > * {
    margin: auto;
  }
`;

interface CustomItem {
  key: string | number;
  width: number;
  height: number;
  fillColor: string;
}

const App: React.FC = () => {
  const [items, setItems] = useState<CustomItem[]>([
    { key: 1, width: 240, height: 80, fillColor: "#182026" },
    { key: 2, width: 240, height: 80, fillColor: "#202B33" },
    { key: 3, width: 240, height: 80, fillColor: "#293742" },
    { key: 4, width: 240, height: 80, fillColor: "#30404D" },
    { key: 5, width: 240, height: 80, fillColor: "#394B59" },
    { key: 6, width: 240, height: 80, fillColor: "#5C7080" },
    { key: 7, width: 240, height: 80, fillColor: "#738694" },
    { key: 8, width: 240, height: 80, fillColor: "#8A9BA8" },
    { key: 9, width: 240, height: 80, fillColor: "#A7B6C2" },
    { key: 10, width: 240, height: 80, fillColor: "#BFCCD6" },
    { key: 11, width: 240, height: 80, fillColor: "#CED9E0" },
    { key: 12, width: 240, height: 80, fillColor: "#D8E1E8" },
    { key: 13, width: 240, height: 80, fillColor: "#E1E8ED" },
    { key: 14, width: 240, height: 80, fillColor: "#EBF1F5" },
    { key: 15, width: 240, height: 80, fillColor: "#F5F8FA" }
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
    (key: string | number, to: number) => {
      const from = items.findIndex(
        item => item.key.toString() === key.toString()
      );
      setItems(shift({ items, from, to }));
    },
    [items, setItems]
  );

  return (
    <AppContainer>
      <DraggableItemsList
        gutter={8}
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
