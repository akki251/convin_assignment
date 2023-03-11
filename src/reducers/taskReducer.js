import { toast } from "react-hot-toast";

const taskReducer = (
  state = { isEditing: false, history: [], editingData: {}, toBeDeleted: [] },
  action
) => {
  switch (action.type) {
    case "ADD_TO_HISTORY":
      return {
        ...state,
        history: [
          ...state.history,
          {
            ...action.payload,
            lastClickedAt:
              new Date().toLocaleDateString() +
              " " +
              new Date().toLocaleTimeString(),
          },
        ],
      };
    case "START_EDIT":
      return { ...state, isEditing: true, editingData: action.payload };
    case "STOP_EDIT":
      return { ...state, isEditing: false };
    case "ADD_TO_DELETE":
      const toBeDeletedItems = state.toBeDeleted;

      if (toBeDeletedItems.length > 0) {
        const lastElement = toBeDeletedItems.at(-1);
        if (lastElement.columnId !== action.payload.columnId) {
          toast.error("Please select tasks from same Column");
          return state;
        }
      }
      return {
        ...state,
        toBeDeleted: [...toBeDeletedItems, action.payload],
      };
    case "COMPLETE_DELETE":
      return {
        ...state,
        toBeDeleted: [],
      };
    default:
      return state;
  }
};

export default taskReducer;
