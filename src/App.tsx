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

const ITEMS: React.ReactNode[] = [
  <FilledListItem key="1" fillColor="#293742" />,
  <FilledListItem key="2" fillColor="#5C7080" />,
  <FilledListItem key="3" fillColor="#BFCCD6" />,
  <FilledListItem key="4" fillColor="#D8E1E8" />
];

const App: React.FC = () => {
  const [items, setItems] = useState(ITEMS);

  const moveItem = useCallback(
    (item: React.ReactNode, position: number) => {
      const currentIndex = items.indexOf(item);
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
      <DraggableItemsList moveItem={moveItem}>
        {items.map(item => (
          <DraggableItem />
        ))}
      </DraggableItemsList>
    </AppContainer>
  );
};

export default App;
