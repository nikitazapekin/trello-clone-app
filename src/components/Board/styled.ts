import styled from "styled-components";

export const BoardContainer = styled.div`
  display: flex;
  gap: 16px;
  padding: 20px;
  min-height: 100vh;
  background-color: #f0f2f5;
  overflow-x: auto;

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 10px;
  }
`;

export const AddColumnButton = styled.button`
  min-width: 250px;
  height: 40px;
  background-color: #ffffff;
  border: 2px dashed #ddd;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 16px;
  color: #666;
  transition: all 0.2s;

  &:hover {
    border-color: #1890ff;
    color: #1890ff;
  }
`;

export const MultiSelectButton = styled.button<{ $isActive: boolean }>`
  position: fixed;
  bottom: 20px;
  left: 20px;
  padding: 12px 20px;
  background-color: ${(props) => (props.$isActive ? "#1890ff" : "#ffffff")};
  color: ${(props) => (props.$isActive ? "#ffffff" : "#1890ff")};
  border: 2px solid #1890ff;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
  z-index: 100;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  transition: all 0.2s;

  &:hover {
    background-color: ${(props) => (props.$isActive ? "#40a9ff" : "#f0f8ff")};
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const CardsWrapper = styled.div`
  display: flex;
  gap: 16px;
  overflow-x: auto;

  @media screen and (max-width: 1240px) {
    flex-direction: column;
    width: 100%;
  }
`;

export const Button = styled.button`
  padding: 8px 16px;
  background-color: #ff4d4f;
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
`;

export const SelectedCount = styled.button`
  font-size: 16px;
  color: #666;
`;

export const MoveToButton = styled.button`
  padding: 6px 12px;
  background-color: #52c41a;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
`;

export const Info = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

export const MoveTo = styled.span`
  font-size: 4px;
  color: #666;
`;

export const ActiveCard = styled.div`
  opacity: 0.8;
  transform: rotate(5deg);
  background-color: white;
  border: 2px solid #1890ff;
  border-radius: 8px;
  padding: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  cursor: grabbing;
  max-width: 280px;
`;

export const Description = styled.div`
  margin: 8px 0 0 0;
  font-size: 16px;
  color: #666;
`;

export const AddButton = styled.button`
  width: 100%;
  padding: 16px;
  background-color: #f0f0f0;
  border: 2px dashed #d9d9d9;
  border-radius: 8px;
  color: #666;
  cursor: pointer;
  font-size: 16px;
`;

export const SelectButton = styled.button`
  padding: 8px 16px;
  background-color: #fff;
  color: #333;
  border: 1px solid #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
`;

export const Wrapper = styled.div`
  margin-bottom: 20px;
  padding: 16px;
  background-color: #f5f5f5;
  border-radius: 8px;
  display: flex;
  gap: 12px;
  align-items: center;
  flex-wrap: wrap;
`;

export const Content = styled.div`
  padding: 20px;
  width: 100%;
`;

export const BoardWrapper = styled.div`
  margin-bottom: 20px;
  padding: 16px;
  background-color: #f5f5f5;
  border-radius: 8px;
  border: 1px solid #d9d9d9;
`;

export const BoardContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  flex-wrap: wrap;
  gap: 12px;
`;

export const BoardPreview = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
`;

export const CurrentBoard = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: #333;
`;

export const SelectSection = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

export const Select = styled.select`
  adding: 6px 12px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  font-size: 16px;
  min-width: 150px;
`;

export const SelectOption = styled.option`
  font-size: 16px;
`;
export const CreateBoard = styled.button`
  padding: 6px 12px;
  background-color: #52c41a;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
`;

export const DeleteBoard = styled.button`
  padding: 6px 12px;
  background-color: #ff4d4f;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
`;

export const Cancel = styled.button`
  padding: 6px 12px;
  background-color: #f5222d;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
`;

export const Input = styled.input`
  padding: 6px 12px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  font-size: 16px;
  min-width: 150px;
`;

export const CreateWrapper = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

export const CreateButton = styled.button`
  padding: 6px 12px;
  background-color: #52c41a;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
`;


export const CurrentBoardText = styled.span`
font-size: 16px; font-weight: 500; 
color: #333

`
