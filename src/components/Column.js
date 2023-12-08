//This component will hold all components and the icon which adds a column
import { Droppable } from 'react-beautiful-dnd';
import Card from './Card';
import Button from '@mui/material/Button';
import AddCardModal from './modals/AddCardModal';
import { useState } from 'react';
import { addCard, clearColumn, deleteColumn, renameColumn } from './AllActions';
import { useDispatch } from 'react-redux';
import OptionsMenu from './OptionsMenu'; 
import RenameColumnModal from './modals/RenameColumnModal';

export default function Column({ column }) {
  const dispatch = useDispatch();  
  
  //set the state of the modal popup
  const [isAddCardModalOpen, setAddCardModalOpen] = useState(false);
  const [isRenameModalOpen, setRenameModalOpen] = useState(false);

  //handle card addition within the column
  const handleAddCard = (cardTitle) => {
    dispatch(addCard(column.id, cardTitle));
    setAddCardModalOpen(false);
  };

  const handleRename = () => {
    setRenameModalOpen(true);
  };

  const handleRenameColumn = (newTitle) => {
    dispatch(renameColumn(column.id, newTitle));
    setRenameModalOpen(false);
  };

  const handleClear = () => {
    dispatch(clearColumn(column.id));
  };

  const handleDelete = () => {
    dispatch(deleteColumn(column.id));
  };

  return (
    <div className="column">
       <div className="column-header">
        <h3>{column.title}</h3>
        <OptionsMenu 
          handleRename={handleRename} 
          handleClear={handleClear} 
          handleDelete={handleDelete}/>
      </div>

      <RenameColumnModal
        isOpen={isRenameModalOpen}
        onClose={() => setRenameModalOpen(false)}
        onRename={(newTitle) => {
          handleRenameColumn(newTitle);
        }}
      />

      <Droppable droppableId={column.id} key={column.id}>
        {(provided) => (
          <div 
          className='column-details'
          ref={provided.innerRef} {...provided.droppableProps}>
            {column.cards && column.cards.map((card, index) => (
                <Card key={card.id} card={card} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      {/* Button that will trigger the opening of the Add Card modal */}
      <div className='add-card-btn'>
        <Button 
          onClick={() => setAddCardModalOpen(true)}>
            Add Card
        </Button>
      </div>

      {/* Control opening and closing of modal when card is being added */}
      <AddCardModal
        isOpen={isAddCardModalOpen}
        onClose={() => setAddCardModalOpen(false)}
        onAddCard={handleAddCard}
      />
    </div>
  );
}
