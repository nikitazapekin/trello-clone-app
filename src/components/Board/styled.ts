import styled from "styled-components";

export const BoardContainer = styled.div`
  padding: 20px;
  width: 100%;
  background-color: #f0f2f5;
  min-height: 100vh;
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

export const BoardManagerContainer = styled.div`
  margin-bottom: 20px;
  padding: 16px;
  background-color: #f5f5f5;
  border-radius: 8px;
  border: 1px solid #d9d9d9;
`;

export const BoardManagerHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  flex-wrap: wrap;
  gap: 12px;
`;

export const CurrentBoardInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;

  span:first-child {
    font-size: 16px;
    font-weight: 500;
    color: #333;
  }

  .board-name {
    font-size: 16px;
    font-weight: 600;
    color: #1890ff;
    background-color: #e6f7ff;
    padding: 4px 8px;
    border-radius: 4px;
    border: 1px solid #91d5ff;
  }
`;

export const BoardSelectContainer = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  align-items: center;
`;

export const BoardSelect = styled.select`
  padding: 6px 12px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  font-size: 16px;
  min-width: 150px;
  background-color: white;
`;

export const CreateBoardContainer = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

export const BoardInput = styled.input`
  padding: 6px 12px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  font-size: 16px;
  min-width: 150px;

  &:focus {
    outline: none;
    border-color: #1890ff;
  }
`;

interface BoardButtonProps {
  $variant?: 'primary' | 'danger';
}

export const BoardButton = styled.button<BoardButtonProps>`
  padding: 6px 12px;
  background-color: ${props => props.$variant === 'danger' ? '#ff4d4f' : '#52c41a'};
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${props => props.$variant === 'danger' ? '#ff7875' : '#73d13d'};
  }
`;

export const CancelButton = styled.button`
  padding: 6px 12px;
  background-color: #f5222d;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #ff7875;
  }
`;

export const DeleteBoardButton = styled.button`
  padding: 6px 12px;
  background-color: #ff4d4f;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #ff7875;
  }
`;

export const BoardInfoText = styled.div`
  font-size: 16px;
  color: #666;
`;

export const MultiSelectToolbar = styled.div`
  margin-bottom: 20px;
  padding: 16px;
  background-color: #f5f5f5;
  border-radius: 8px;
  display: flex;
  gap: 12px;
  align-items: center;
  flex-wrap: wrap;
`;

interface MultiSelectButtonProps {
  $isActive: boolean;
}

export const MultiSelectButton = styled.button<MultiSelectButtonProps>`
  padding: 8px 16px;
  background-color: ${props => props.$isActive ? '#1890ff' : '#fff'};
  color: ${props => props.$isActive ? '#fff' : '#333'};
  border: 1px solid #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
  transition: all 0.2s;

  &:hover {
    background-color: ${props => props.$isActive ? '#40a9ff' : '#f5f5f5'};
  }
`;

export const SelectedCount = styled.span`
  font-size: 16px;
  color: #666;
`;

export const DeleteSelectedButton = styled.button`
  padding: 8px 16px;
  background-color: #ff4d4f;
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #ff7875;
  }
`;

export const MoveToContainer = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;

  span {
    font-size: 16px;
    color: #666;
  }
`;

export const MoveToButton = styled.button`
  padding: 6px 12px;
  background-color: #52c41a;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #73d13d;
  }
`;

export const AddColumnButton = styled.button`
  width: 100%;
  padding: 16px;
  background-color: #f0f0f0;
  border: 2px dashed #d9d9d9;
  border-radius: 8px;
  color: #666;
  cursor: pointer;
  font-size: 16px;
  transition: all 0.2s;

  &:hover {
    border-color: #1890ff;
    color: #1890ff;
    background-color: #f0f8ff;
  }
`;

export const DragOverlayCard = styled.div`
  opacity: 0.8;
  transform: rotate(5deg);
  background-color: white;
  border: 2px solid #1890ff;
  border-radius: 8px;
  padding: 12px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
  cursor: grabbing;
  max-width: 280px;
`;

export const DragOverlayTitle = styled.strong`
  display: block;
  font-size: 16px;
  margin-bottom: 4px;
`;

export const DragOverlayDescription = styled.p`
  margin: 8px 0 0 0;
  font-size: 16px;
  color: #666;
  line-height: 1.4;
`;
