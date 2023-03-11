import { columnsFromBackend } from "../TasksData";

export const fetchCategories = (selectedColumnId) => {
  if (!selectedColumnId) {
    return Object.entries(columnsFromBackend).map(([columnId, details]) => {
      return {
        columnId,
        title: details.title,
      };
    });
  } else {
    const backendArray = Object.entries(columnsFromBackend);
    for (let i = 0; i < backendArray.length; i++) {
      if (backendArray[i][0] === selectedColumnId) {
        return i;
      }
    }
  }
};
