// I will import the constants for actions here
import {
    ADD_COLUMN,
    CLEAR_COLUMN,
    DELETE_COLUMN,
    RENAME_COLUMN,
    ADD_CARD,
    MOVE_CARD,
  } from "../components/AllActions";

  // export const RENAME_COLUMN = "RENAME_COLUMN";

//bring a helper function here
const generateUniqueId = () => {
  return '_' + Math.random().toString(36).substr(2, 9);
};
  
//set up initial state of column  as an empty array
const initialState = {
  columns: [],
};
  
//use redux reducer to set up and define state
  const kanbanReducer = (state = initialState, action) => {
    if (process.env.NODE_ENV !== 'production') {
      console.log(action.type);
    }
    
    switch (action.type) {
      // I will handle all the action cases here
      case ADD_COLUMN:
        return {
          ...state,
          columns: [...state.columns,
          {
            id: generateUniqueId(),
            title: action.payload.title,
            cards: [],
          }
          // action.payload 
        ],
        };

        case CLEAR_COLUMN:
          // Handle clearing a column (removing all cards)
          return {
            ...state,
            columns: state.columns.map((column) =>
              column.id === action.payload.ColumnId ? { ...column, cards: [] } : column
            ),
          };
    
          case DELETE_COLUMN:
            // Handle deleting a column
            return {
              ...state,
              columns: state.columns.filter((column) => column.id !== action.payload.myColumnId),
          };
    

          case RENAME_COLUMN:
            // Handle renaming a column
            return {
              ...state,
              columns: state.columns.map((column) =>
                column.id === action.payload.ColumnId
                  ? { ...column, title: action.payload.newTitle }
                  : column
              ),
          };

          case ADD_CARD:
            console.log("Adding card to column:", action.payload.columnId);
            console.log("Current state:", state);
            return {
              ...state,
              columns: state.columns.map((column) =>
                column.id === action.payload.columnId
                  ? {
                      ...column,
                      cards: Array.isArray(column.cards)
                        ? [...column.cards, { id: generateUniqueId(), task: action.payload.task }]
                        : [{ id: generateUniqueId(), task: action.payload.task }],
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