import React from "react";
import PageSelector from "./components/PageSelector";
import styled from "styled-components";
import { ToastContainer } from "react-toastify";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: white;
`;

function App() {
  const handleDone = (selectedPages: number[]) => {
    console.log("Selected pages:", selectedPages);
  };

  return (
    <Container>
      <PageSelector totalPages={4} onDone={handleDone} />
      <ToastContainer />
    </Container>
  );
}

export default App;
