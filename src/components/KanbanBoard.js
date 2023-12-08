import React, { useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import Column from "./Column";
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from "react-redux";
import { addColumn, moveCard } from "./AllActions"
import AddColumnModal from "./modals/AddColumnModal";
import "../styling/styles.scss"

export default function KanbanBoard(){
  
  const dispatch = useDispatch();
  const columns = useSelector((state) => state.columns);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDragEnd = (result) => {
    const { source, destination, draggableId } = result;

    if (!destination) {
      return;
    }

    dispatch(moveCard(
      source.droppableId,
      destination.droppableId,
      draggableId,
      source.index,
      destination.index
      ));
  };

  const handleAddColumn = (columnName) => {
    dispatch(addColumn(columnName));
    setIsModalOpen(false);
  };
  
  return (
    // Using react beautiful dnd for drag n drop
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="kanban-board">
        {/* Only render columns if there are more than zer0 */}
        {columns.length > 0 &&
          columns.map((column) => (
            <Column key={column.id} column={column} />
          ))}
       
        {/* My user should only see 5 columns then add button disappears */}
        {columns.length < 5 && (
          // Using bootstrap button here and onClick for what happens when mouse clicked by user
          <Button variant="outlined" onClick={() => setIsModalOpen(true)}>
            Add Column
          </Button>
        )}
        {/* Control opening and closing of modal when column is being added */}
        <AddColumnModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onAddColumn={handleAddColumn}
        />
      </div>
    </DragDropContext>
  );
};

