// I will import the constants for actions here
import {
    ADD_COLUMN,
    ADD_CARD,
    DELETE_COLUMN,
    DELETE_CARD,
    EDIT_COLUMN,
    EDIT_CARD,
  } from "../components/actions";

//set up initial state of column  as an empty array
  const initialState = {
    columns: [],
  };

//use redux reducer to set up and define state
  const kanbanReducer = (state = initialState, action) => {
    switch (action.type) {
      // I will handle all the action cases here
      case ADD_COLUMN:
      // default:
        return {
          ...state,
          columns: [...state.columns, action.payload],
        };

        case EDIT_COLUMN:
          // handle editing a column
          return {
            ...state,
            columns: state.columns.map((column) =>
              column.id === action.payload.myColumnId
                ? { ...column, name: action.payload.newColumn }
                : column
            ),
          };
    
        case DELETE_COLUMN:
          // handle deleting a column
          return {
            ...state,
            columns: state.columns.filter(
              (column) => column.id !== action.payload.myColumnId
            ),
          };
    
        case ADD_CARD:
          // handle adding a new card to a column
          return {
            ...state,
            columns: state.columns.map((column) =>
              column.id === action.payload.mycolumnId
                ? {
                    ...column,
                    cards: [...column.cards, { id: generateUniqueId(), task: action.payload.task }],
                  }
                : column
            ),
          };
    
        case EDIT_CARD:
          // handle editing a card in a column
          return {
            ...state,
            columns: state.columns.map((column) =>
              column.id === action.payload.columnId
                ? {
                    ...column,
                    cards: column.cards.map((card) =>
                      card.id === action.payload.taskId
                        ? { ...card, task: action.payload.newTask }
                        : card
                    ),
                  }
                : column
            ),
          };
    
        case DELETE_CARD:
          // handle deleting a card from a column
          return {
            ...state,
            columns: state.columns.map((column) =>
              column.id === action.payload.columnId
                ? {
                    ...column,
                    cards: column.cards.filter(
                      (card) => card.id !== action.payload.taskID
                    ),
                  }
                : column
            ),
          };
    
        case MOVE_CARD:
          // handle moving a card between columns
          const { sourceColumnId, destinationColumnId, draggableId, sourceIndex, destinationIndex } = action.payload;
          const updatedColumns = [...state.columns];
          const sourceColumn = updatedColumns.find((column) => column.id === sourceColumnId);
          const destinationColumn = updatedColumns.find((column) => column.id === destinationColumnId);
          const [movedCard] = sourceColumn.cards.splice(sourceIndex, 1);
          destinationColumn.cards.splice(destinationIndex, 0, movedCard);
    
          return {
            ...state,
            columns: updatedColumns,
          };
    
        default:
          return state;
      }
    };
    
    export default kanbanReducer;