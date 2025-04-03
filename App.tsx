import React from "react";
import PageSelector from "./PageSelector";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
`;

function App() {
  const handleDone = (selectedPages: number[]) => {
    console.log("Selected pages:", selectedPages);
  };

  return (
    <Container>
      <PageSelector totalPages={4} onDone={handleDone} />
    </Container>
  );
}

export default App;
