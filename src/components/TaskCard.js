import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { Modal, Input, Row, Checkbox, Button, Text } from "@nextui-org/react";
import YouTube from "react-youtube";
import { useDispatch } from "react-redux";
import { AiFillDelete } from "react-icons/ai";
import { AiFillEdit } from "react-icons/ai";
const TaskCard = ({ item, index, handleDelete, columnId, deleteEnabled }) => {
  const dispatch = useDispatch();

  const [visible, setVisible] = React.useState(false);
  const openModalHandler = () => {
    setVisible(true);
    dispatch({ type: "ADD_TO_HISTORY", payload: item });
  };
  const closeHandler = () => {
    setVisible(false);
  };

  if (visible) {
    const opts = {
      width: "1280",
      height: "600",
      playerVars: {
        autoplay: 1,
      },
    };
    return (
      <div className="w-screen h-screen flex justify-center gap-3  z-50 pt-28  top-0 left-0 backdrop-blur-md fixed">
        <YouTube videoId={item.video_url.split("=")[1]} opts={opts} />
        <p
          className="
        text-black flex justify-center items-center w-10 h-10 cursor-pointer shadow-2xl rounded-full bg-white p-2"
          onClick={closeHandler}
        >
          X
        </p>
      </div>
    );
  }

  return (
    <div
      className={`p-2 task-card  ${
        deleteEnabled ? "border-2 border-red-600" : ""
      }`}
    >
      <Draggable draggableId={item.id} index={index}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className="bg-[#efdcb4]  p-3 my-3 max-w-[300px] z-50 rounded-md  drop-shadow-md"
          >
            <div className="flex flex-col space-y-2">
              <img
                src={item.image_url}
                alt={item.task}
                className="max-w-full"
              />
              <h6 className="font-light">{item.task}</h6>
            </div>
          </div>
        )}
      </Draggable>
      <div className="flex justify-end space-x-3">
        <button
          onClick={openModalHandler}
          className="cursor-pointer bg-[#cf961d] p-1 text-white rounded-md"
        >
          Open Video
        </button>
        <button
          disabled={deleteEnabled}
          className="cursor-pointer bg-red-400 p-1 text-white rounded-md"
          onClick={() =>
            dispatch({
              type: "ADD_TO_DELETE",
              payload: { id: item.id, columnId },
            })
          }
        >
          <AiFillDelete />
        </button>
        <button
          disabled={deleteEnabled}
          className="cursor-pointer bg-red-400 p-1 text-white rounded-md"
          onClick={() => {
            dispatch({ type: "START_EDIT", payload: { item, columnId } });
          }}
        >
          <AiFillEdit />
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
