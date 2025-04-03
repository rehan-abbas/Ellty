import React, { useState } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface PageSelectorProps {
  onDone: (selectedPages: number[]) => void;
  totalPages: number;
}

const Modal = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06);
  width: 370px;
  padding: 24px 20px;
`;

const Title = styled.div`
  font-size: 16px;
  font-weight: 400;
  color: #111827;
  margin-bottom: 16px;
`;

const Divider = styled.div`
  height: 1px;
  background: #e5e7eb;
  margin: 16px 0;
`;

const PageList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const PageItem = styled.label`
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  font-size: 16px;
  color: #111827;
  font-weight: 400;
`;

const CheckboxContainer = styled.div`
  position: relative;
  width: 20px;
  height: 20px;
`;

const HiddenCheckbox = styled.input.attrs({ type: "checkbox" })`
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
`;

const StyledCheckbox = styled.div<{ checked: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  height: 20px;
  width: 20px;
  background-color: ${(props) => (props.checked ? "#3B82F6" : "white")};
  border: 1px solid ${(props) => (props.checked ? "#3B82F6" : "#D1D5DB")};
  border-radius: 4px;
  transition: all 0.1s ease-in-out;

  &:after {
    content: "";
    position: absolute;
    display: ${(props) => (props.checked ? "block" : "none")};
    left: 6px;
    top: 2px;
    width: 5px;
    height: 10px;
    border: solid white;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
  }
`;

const DoneButton = styled.button`
  width: 100%;
  height: 44px;
  background: #ffce22;
  border-radius: 6px;
  border: none;
  color: #111827;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  margin-top: 24px;
  transition: background-color 0ms;

  &:hover {
    background: #ffd54f;
  }
`;

const PageSelector: React.FC<PageSelectorProps> = ({ onDone, totalPages }) => {
  const [selectedPages, setSelectedPages] = useState<number[]>([]);
  const [selectAll, setSelectAll] = useState(false);

  const handleSelectAll = (checked: boolean) => {
    setSelectAll(checked);
    if (checked) {
      setSelectedPages(Array.from({ length: totalPages }, (_, i) => i + 1));
    } else {
      setSelectedPages([]);
    }
  };

  const handlePageSelect = (pageNum: number, checked: boolean) => {
    if (checked) {
      setSelectedPages([...selectedPages, pageNum].sort((a, b) => a - b));
    } else {
      setSelectedPages(selectedPages.filter((num) => num !== pageNum));
      setSelectAll(false);
    }
  };

  const handleDone = () => {
    onDone(selectedPages);
    toast.success(`Selected ${selectedPages.length} pages!`, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  const CustomCheckbox = ({
    checked,
    onChange,
  }: {
    checked: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  }) => (
    <CheckboxContainer>
      <HiddenCheckbox checked={checked} onChange={onChange} />
      <StyledCheckbox checked={checked} />
    </CheckboxContainer>
  );

  return (
    <Modal>
      <PageList>
        <PageItem>
          <Title>All pages</Title>
          <CustomCheckbox
            checked={selectAll}
            onChange={(e) => handleSelectAll(e.target.checked)}
          />
        </PageItem>
        <Divider />
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
          <PageItem key={pageNum}>
            <span>Page {pageNum}</span>
            <CustomCheckbox
              checked={selectedPages.includes(pageNum)}
              onChange={(e) => handlePageSelect(pageNum, e.target.checked)}
            />
          </PageItem>
        ))}
      </PageList>
      <DoneButton onClick={handleDone}>Done</DoneButton>
    </Modal>
  );
};

export default PageSelector;
