import React, { useState, useCallback, useEffect } from 'react';
import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { Column } from '../Column';
import { CardModal } from '@components/Modal';
import type { Card as CardType, Column as ColumnType, BoardData, CardHistory } from '../../types';
import { defaultColumns } from './constants';
import { createDragHandlers } from '../../helpers/DragUtils';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { 
  CardsWrapper,
  BoardContainer,
  BoardManagerContainer,
  BoardManagerHeader,
  CurrentBoardInfo,
  BoardSelectContainer,
  BoardSelect,
  CreateBoardContainer,
  BoardInput,
  BoardButton,
  CancelButton,
  DeleteBoardButton,
  BoardInfoText,
  MultiSelectToolbar,
  MultiSelectButton,
  SelectedCount,
  DeleteSelectedButton,
  MoveToContainer,
  MoveToButton,
  AddColumnButton,
  DragOverlayCard,
  DragOverlayTitle,
  DragOverlayDescription
} from './styled';

interface BoardType {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

const BoardManager: React.FC<{
  boards: BoardType[];
  currentBoardId: string;
  onBoardSelect: (boardId: string) => void;
  onBoardCreate: (boardName: string) => void;
  onBoardDelete: (boardId: string) => void;
}> = ({ boards, currentBoardId, onBoardSelect, onBoardCreate, onBoardDelete }) => {
  const [isCreating, setIsCreating] = useState(false);
  const [newBoardName, setNewBoardName] = useState('');

  const handleCreateBoard = () => {
    if (newBoardName.trim()) {
      onBoardCreate(newBoardName.trim());
      setNewBoardName('');
      setIsCreating(false);
    }
  };

  const currentBoard = boards.find(board => board.id === currentBoardId);

  return (
    <BoardManagerContainer>
      <BoardManagerHeader>
        <CurrentBoardInfo>
          <span>Текущий борд:</span>
          {currentBoard && (
            <span className="board-name">
              {currentBoard.name}
            </span>
          )}
        </CurrentBoardInfo>

        <BoardSelectContainer>
          <BoardSelect
            value={currentBoardId}
            onChange={(e) => onBoardSelect(e.target.value)}
          >
            {boards.map(board => (
              <option key={board.id} value={board.id}>
                {board.name}
              </option>
            ))}
          </BoardSelect>

          {!isCreating ? (
            <BoardButton
              onClick={() => setIsCreating(true)}
              $variant="primary"
            >
              + Новый борд
            </BoardButton>
          ) : (
            <CreateBoardContainer>
              <BoardInput
                type="text"
                value={newBoardName}
                onChange={(e) => setNewBoardName(e.target.value)}
                placeholder="Название борда"
                onKeyPress={(e) => e.key === 'Enter' && handleCreateBoard()}
              />
              <BoardButton
                onClick={handleCreateBoard}
                $variant="primary"
              >
                Создать
              </BoardButton>
              <CancelButton
                onClick={() => {
                  setIsCreating(false);
                  setNewBoardName('');
                }}
              >
                Отмена
              </CancelButton>
            </CreateBoardContainer>
          )}

          {boards.length > 1 && (
            <DeleteBoardButton
              onClick={() => onBoardDelete(currentBoardId)}
              title="Удалить текущий борд"
            >
              Удалить борд
            </DeleteBoardButton>
          )}
        </BoardSelectContainer>
      </BoardManagerHeader>

   
    </BoardManagerContainer>
  );
};

export const Board: React.FC = () => {
  const [savedBoards, setSavedBoards] = useLocalStorage<BoardType[]>('boards', [
    {
      id: 'default-board',
      name: 'Мой первый борд',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ]);

  const [currentBoardId, setCurrentBoardId] = useState<string>(savedBoards[0]?.id || 'default-board');
  
  const [savedBoardData, setSavedBoardData] = useLocalStorage<Record<string, BoardData>>('board-data', {
    'default-board': {
      columns: defaultColumns,
      cards: [],
      history: []
    }
  });

  const [columns, setColumns] = useState<ColumnType[]>(defaultColumns);
  const [cards, setCards] = useState<CardType[]>([]);
  const [activeCard, setActiveCard] = useState<CardType | null>(null);
  const [isMultiSelectMode, setIsMultiSelectMode] = useState<boolean>(false);
  const [selectedCards, setSelectedCards] = useState<Set<string>>(new Set());
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    card: CardType | null;
    mode: 'create' | 'edit' | 'view';
    columnId?: string;
  }>({
    isOpen: false,
    card: null,
    mode: 'view'
  });
  
  useEffect(() => {
    const currentBoardData = savedBoardData[currentBoardId];
    if (currentBoardData) {
      setColumns(currentBoardData.columns || defaultColumns);
      setCards(currentBoardData.cards || []);
    } else {
      setColumns(defaultColumns);
      setCards([]);
    }
    setSelectedCards(new Set());
    setIsMultiSelectMode(false);
  }, [currentBoardId]); 

  useEffect(() => {
    if (!currentBoardId) return;

    const currentData = savedBoardData[currentBoardId];
    const hasChanges = 
      JSON.stringify(columns) !== JSON.stringify(currentData?.columns) ||
      JSON.stringify(cards) !== JSON.stringify(currentData?.cards);

    if (hasChanges) {
      setSavedBoardData(prev => ({
        ...prev,
        [currentBoardId]: {
          columns,
          cards,
          history: currentData?.history || []
        }
      }));

      setSavedBoards(prev => prev.map(board => 
        board.id === currentBoardId 
          ? { ...board, updatedAt: new Date().toISOString() }
          : board
      ));
    }
  }, [columns, cards, currentBoardId, setSavedBoardData, setSavedBoards]); 
  
  const handleBoardSelect = useCallback((boardId: string) => {
    setCurrentBoardId(boardId);
  }, []);

  const handleBoardCreate = useCallback((boardName: string) => {
    const newBoard: BoardType = {
      id: `board-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      name: boardName,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    setSavedBoards(prev => [...prev, newBoard]);
      
    setSavedBoardData(prev => ({
      ...prev,
      [newBoard.id]: {
        columns: defaultColumns,
        cards: [],
        history: []
      }
    }));

    setCurrentBoardId(newBoard.id);
  }, [setSavedBoards, setSavedBoardData]);

  const handleBoardDelete = useCallback((boardId: string) => {
    if (savedBoards.length <= 1) {
      return;
    }

    
      const updatedBoards = savedBoards.filter(board => board.id !== boardId);
      setSavedBoards(updatedBoards);
        
      setSavedBoardData(prev => {
        const newData = { ...prev };
        delete newData[boardId];
        return newData;
      });

      if (updatedBoards.length > 0) {
        setCurrentBoardId(updatedBoards[0].id);
      }
   
  }, [savedBoards, setSavedBoards, setSavedBoardData]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const { handleDragStart, handleDragOver, handleDragEnd } = createDragHandlers(
    cards,
    columns,
    setActiveCard,
    setCards
  );

  const handleCardClick = useCallback((card: CardType) => {
    if (isMultiSelectMode) {
      setSelectedCards(prev => {
        const newSelected = new Set(prev);
        if (newSelected.has(card.id)) {
          newSelected.delete(card.id);
        } else {
          newSelected.add(card.id);
        }
        return newSelected;
      });
    } else {
      setModalState({
        isOpen: true,
        card: card,
        mode: 'view'
      });
    }
  }, [isMultiSelectMode]);

  const handleEditCard = useCallback(() => {
    if (modalState.card) {
      setModalState(prev => ({
        ...prev,
        mode: 'edit'
      }));
    }
  }, [modalState.card]);

  const handleUpdateCard = useCallback((cardId: string, updates: Partial<CardType>) => {
    setCards(prev => prev.map(card => {
      if (card.id === cardId) {
        const oldCard = { ...card };
        const newCard = { 
          ...card, 
          ...updates, 
          updatedAt: new Date().toISOString() 
        };

        const changes: string[] = [];

        if (oldCard.title !== newCard.title) {
          changes.push(`Название: "${oldCard.title}" → "${newCard.title}"`);
        }

        if (oldCard.description !== newCard.description) {
          if (!oldCard.description && newCard.description) {
            changes.push('Добавлено описание');
          } else if (oldCard.description && !newCard.description) {
            changes.push('Удалено описание');
          } else {
            changes.push('Изменено описание');
          }
        }

        if (JSON.stringify(oldCard.labels) !== JSON.stringify(newCard.labels)) {
          const oldLabels = oldCard.labels.join(', ') || 'нет';
          const newLabels = newCard.labels.join(', ') || 'нет';
          changes.push(`Метки: ${oldLabels} → ${newLabels}`);
        }

        if (JSON.stringify(oldCard.checklists) !== JSON.stringify(newCard.checklists)) {
          const oldCount = oldCard.checklists.length;
          const newCount = newCard.checklists.length;
          if (newCount > oldCount) {
            changes.push(`Добавлен чек-лист: "${newCard.checklists[newCount - 1].title}"`);
          } else if (newCount < oldCount) {
            changes.push('Удален чек-лист');
          } else {
            changes.push('Изменены чек-листы');
          }
        }

        if (JSON.stringify(oldCard.images) !== JSON.stringify(newCard.images)) {
          const oldCount = oldCard.images.length;
          const newCount = newCard.images.length;
          if (newCount > oldCount) {
            changes.push(`Добавлено изображение: "${newCard.images[newCount - 1].name}"`);
          } else if (newCount < oldCount) {
            changes.push('Удалено изображение');
          } else {
            changes.push('Изменены изображения');
          }
        }

        if (changes.length > 0) {
          const historyEntry: CardHistory = {
            id: `history-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            action: 'Изменение карточки',
            details: changes.join('; '),
            timestamp: new Date().toISOString()
          };

          return {
            ...newCard,
            history: [...(oldCard.history || []), historyEntry]
          };
        }

        return newCard;
      }
      return card;
    }));
  }, []);

  const handleSaveCard = useCallback((cardData: Omit<CardType, 'id' | 'columnId' | 'createdAt' | 'updatedAt' | 'history'>) => {
    if (modalState.mode === 'create' && modalState.columnId) {
      const newCard: CardType = {
        ...cardData,
        id: `card-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        columnId: modalState.columnId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        history: [{
          id: `history-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          action: 'Создание карточки',
          details: `Карточка "${cardData.title}" создана`,
          timestamp: new Date().toISOString()
        }]
      };
      setCards(prev => [...prev, newCard]);
    } else if (modalState.card && modalState.mode === 'edit') {
      handleUpdateCard(modalState.card.id, {
        ...cardData,
        updatedAt: new Date().toISOString()
      });
    }
    setModalState({ isOpen: false, card: null, mode: 'view' });
  }, [modalState, handleUpdateCard]);

  const handleDeleteCard = useCallback((cardId: string) => {
    setCards(prev => prev.filter(card => card.id !== cardId));
    setModalState({ isOpen: false, card: null, mode: 'view' });
  }, []);

  const handleCloseModal = useCallback(() => {
    setModalState({ isOpen: false, card: null, mode: 'view' });
  }, []);

  const handleAddCard = useCallback((columnId: string) => {
    setModalState({
      isOpen: true,
      card: null,
      mode: 'create',
      columnId: columnId
    });
  }, []);

  const handleUpdateColumnTitle = useCallback((columnId: string, newTitle: string) => {
    setColumns(prev => prev.map(col => {
      if (col.id === columnId) {
        return { ...col, title: newTitle };
      }
      return col;
    }));
  }, []);

  const handleDeleteColumn = useCallback((columnId: string) => {
    setColumns(prev => prev.filter(col => col.id !== columnId));
    setCards(prev => prev.filter(card => card.columnId !== columnId));
  }, []);

  const handleToggleCardSelection = useCallback((cardId: string) => {
    setSelectedCards(prev => {
      const newSelected = new Set(prev);
      if (newSelected.has(cardId)) {
        newSelected.delete(cardId);
      } else {
        newSelected.add(cardId);
      }
      return newSelected;
    });
  }, []);

  const handleToggleMultiSelectMode = useCallback(() => {
    setIsMultiSelectMode(prev => {
      if (!prev) {
        setSelectedCards(new Set());
      } else {
        setSelectedCards(new Set());
      }
      return !prev;
    });
  }, []);

  const handleDeleteSelectedCards = useCallback(() => {
    setCards(prev => prev.filter(card => !selectedCards.has(card.id)));
    setSelectedCards(new Set());
  }, [selectedCards]);

  const handleMoveSelectedCards = useCallback((targetColumnId: string) => {
    const targetColumn = columns.find(col => col.id === targetColumnId);
    
    setCards(prev => prev.map(card => {
      if (selectedCards.has(card.id) && card.columnId !== targetColumnId) {
        const oldColumn = columns.find(col => col.id === card.columnId);
        
        const moveHistory: CardHistory = {
          id: `history-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          action: 'Перемещение карточки',
          details: `Перемещена из "${oldColumn?.title || 'Неизвестная колонка'}" в "${targetColumn?.title || 'Неизвестная колонка'}"`,
          timestamp: new Date().toISOString()
        };

        return { 
          ...card, 
          columnId: targetColumnId,
          updatedAt: new Date().toISOString(),
          history: [...(card.history || []), moveHistory]
        };
      }
      return card;
    }));
    setSelectedCards(new Set());
  }, [selectedCards, columns]);

  const getColumnTitle = (columnId: string) => {
    return columns.find(col => col.id === columnId)?.title || '';
  };

  const getCardHistory = useCallback((cardId?: string) => {
    if (!cardId) return [];
    const card = cards.find(c => c.id === cardId);
    return card?.history || [];
  }, [cards]);

  return (
    <BoardContainer>
      <BoardManager
        boards={savedBoards}
        currentBoardId={currentBoardId}
        onBoardSelect={handleBoardSelect}
        onBoardCreate={handleBoardCreate}
        onBoardDelete={handleBoardDelete}
      />
      
      <MultiSelectToolbar>
        <MultiSelectButton
          onClick={handleToggleMultiSelectMode}
          $isActive={isMultiSelectMode}
        >
          {isMultiSelectMode ? 'Отменить выбор' : 'Множественный выбор'}
        </MultiSelectButton>

        {isMultiSelectMode && selectedCards.size > 0 && (
          <>
            <SelectedCount>
              Выбрано: {selectedCards.size} карточек
            </SelectedCount>
            
            <DeleteSelectedButton
              onClick={handleDeleteSelectedCards}
            >
              Удалить выбранные
            </DeleteSelectedButton>

            <MoveToContainer>
              <span>Переместить в:</span>
              {columns.map(column => (
                <MoveToButton
                  key={column.id}
                  onClick={() => handleMoveSelectedCards(column.id)}
                >
                  {column.title}
                </MoveToButton>
              ))}
            </MoveToContainer>
          </>
        )}
      </MultiSelectToolbar>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <CardsWrapper>
          {columns.map(column => {
            const columnCards = cards.filter(card => card.columnId === column.id);
            return (
              <Column
                key={column.id}
                column={column}
                cards={columnCards}
                onAddCard={handleAddCard}
                onUpdateColumnTitle={handleUpdateColumnTitle}
                onDeleteColumn={handleDeleteColumn}
                onCardClick={handleCardClick}
                isMultiSelectMode={isMultiSelectMode}
                selectedCards={selectedCards}
                onToggleCardSelection={handleToggleCardSelection}
              />
            );
          })}
           
          <div style={{ minWidth: '280px' }}>
            <AddColumnButton
              onClick={() => {
                const newColumn: ColumnType = {
                  id: `col-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
                  title: 'Новая колонка',
                  cardIds: [],
                  order: columns.length + 1
                };
                setColumns(prev => [...prev, newColumn]);
              }}
            >
              + Добавить колонку
            </AddColumnButton>
          </div>
        </CardsWrapper>
        
        <DragOverlay>
          {activeCard ? (
            <DragOverlayCard>
              <DragOverlayTitle>{activeCard.title}</DragOverlayTitle>
              {activeCard.description && (
                <DragOverlayDescription>
                  {activeCard.description}
                </DragOverlayDescription>
              )}
            </DragOverlayCard>
          ) : null}
        </DragOverlay>
      </DndContext>

      <CardModal
        card={modalState.card}
        isOpen={modalState.isOpen}
        onSave={handleSaveCard}
        onUpdate={handleUpdateCard}
        onClose={handleCloseModal}
        onDelete={handleDeleteCard}
        mode={modalState.mode}
        columnTitle={modalState.card ? getColumnTitle(modalState.card.columnId) : 
                    modalState.columnId ? getColumnTitle(modalState.columnId) : undefined}
        history={getCardHistory(modalState.card?.id)}
        onEdit={handleEditCard}
      />
    </BoardContainer>
  );
};

export default Board;
