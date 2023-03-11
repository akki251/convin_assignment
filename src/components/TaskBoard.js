import React, { useCallback, useState } from "react";
import { columnsFromBackend } from "../TasksData";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import TaskCard from "./TaskCard";
import CreateTask from "./CreateTask";
import { useDispatch, useSelector } from "react-redux";
import ColumnTitle from "./ColumnTitle";
import History from "./History";
import { AiFillDelete } from "react-icons/ai";
import { toast } from "react-hot-toast";
import { executeDelete } from "../utils/executeDelete";

const TaskBoard = () => {
  const dispatch = useDispatch();
  const toBeDeleted = useSelector((state) => state.taskReducer.toBeDeleted);
  const [columns, setColumns] = useState(columnsFromBackend);

  // ADD OR UPDATE TASK
  const addTaskHandler = useCallback(
    (taskData, columnId, isEditing) => {
      if (isEditing) {
        setColumns((prevColumns) => {
          const newCopy = { ...prevColumns };
          const destColumn = newCopy[columnId];
          const oldItems = destColumn.items;
          const existingItemIndex = oldItems.findIndex(
            (item) => item.id === taskData.id
          );
          oldItems[existingItemIndex] = taskData;
          return newCopy;
        });
      } else {
        setColumns((prevColumns) => {
          const newCopy = { ...prevColumns };
          const destColumn = newCopy[columnId];
          destColumn.items.push(taskData);
          return newCopy;
        });
      }
      dispatch({ type: "STOP_EDIT" });
    },
    [dispatch]
  );

  const completeDelete = useCallback(() => {
    dispatch({ type: "COMPLETE_DELETE" });
  }, [dispatch]);

  const handleDelete = useCallback(() => {
    setColumns((prevColumns) => {
      const newCopy = { ...prevColumns };
      const columnId = toBeDeleted[0].columnId;
      const sourceColumn = newCopy[columnId];
      const sourceItems = sourceColumn.items;
      let filtered = sourceItems;
      for (let i = 0; i < toBeDeleted.length; i++) {
        filtered = executeDelete(toBeDeleted[i].id, filtered);
      }

      sourceColumn.items = filtered;
      return newCopy;
    });
    toast.success(`${toBeDeleted.length} Tasks Deleted`);
    completeDelete();
  }, [toBeDeleted, completeDelete]);

  const handleUpdateColumnTitle = (columnId, title) => {
    setColumns((prevColumns) => {
      return {
        ...prevColumns,
        [columnId]: {
          ...prevColumns[columnId],
          title: title,
        },
      };
    });
  };

  // HELPER FUNCTION FOR IDENTIFYING THE DELETABLE ITEMS FOR UI REFERENCE
  const checkTobeDeleted = useCallback(
    (id) => {
      if (toBeDeleted.length > 0) {
        for (let i = 0; i < toBeDeleted.length; i++) {
          if (toBeDeleted[i].id === id) return true;
        }
      }
      return false;
    },
    [toBeDeleted]
  );

  // DRAG AND DROP
  const onDragEnd = (result, columns, setColumns) => {
    if (!result.destination) return;
    const { source, destination } = result;
    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems,
        },
      });
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems,
        },
      });
    }
  };

  return (
    <>
      {toBeDeleted.length > 0 && (
        <div className="text-center space-x-4 z-30 flex  cursor-pointer absolute w-full justify-center p-4   ">
          <button
            onClick={handleDelete}
            className="  p-4 bg-red-400   rounded-md shadow-xl flex space-x-3 items-center text-white"
          >
            <p>Delete {toBeDeleted.length} Tasks </p>
            <div>
              <AiFillDelete color="white" />
            </div>
          </button>
          <button
            onClick={completeDelete}
            className="p-4 bg-red-200   rounded-md shadow-xl"
          >
            Cancel
          </button>
        </div>
      )}
      <div className="flex ">
        <DragDropContext
          onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
        >
          <div className="flex-1 relative">
            <div className=" flex flex-1  gap-4">
              {Object.entries(columns).map(([columnId, column], index) => {
                return (
                  <Droppable key={columnId} droppableId={columnId}>
                    {(provided, snapshot) => (
                      <div
                        className="flex flex-col bg-[#dcdcdc] border-2 border-red-200 rounded-md shadow-2xl p-4 m-4 min-w-[350px]"
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                      >
                        <ColumnTitle
                          onupdateColumn={handleUpdateColumnTitle}
                          title={column.title}
                          columnId={columnId}
                        />
                        {column.items.map((item, index) => (
                          <TaskCard
                            key={item.id}
                            item={item}
                            index={index}
                            handleDelete={handleDelete}
                            columnId={columnId}
                            deleteEnabled={checkTobeDeleted(item.id)}
                          />
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                );
              })}
            </div>
          </div>
        </DragDropContext>
        <div className=" flex-1  fixed right-0 w-[350px] p-3   ">
          <div className="flex flex-col space-y-2 ">
            <div className=" flex-1">
              <CreateTask onAddTask={addTaskHandler} />
            </div>
            <div className="   overflow-auto basis-[430px]   ">
              <h5 className="fixed z-50 bg-white w-full py-3"> Timeline</h5>
              <History />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TaskBoard;
