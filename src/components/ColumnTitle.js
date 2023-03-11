import { Button, Input } from "@nextui-org/react";
import React, { useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import { IoMdDoneAll } from "react-icons/io";
const ColumnTitle = ({ title: oldTitle, onupdateColumn, columnId }) => {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [title, setTitle] = useState(oldTitle);

  
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const finishEditingHandler = () => {
    onupdateColumn(columnId, title);
    setIsEditingTitle((prev) => !prev);
  };

  return (
    <div className="bg-yellow-600 p-2 px-4 text-white items-center  rounded-md flex justify-between font-bold text-left">
      {isEditingTitle ? (
        <Input
          value={title}
          aria-label="Column title"
          onChange={handleTitleChange}
        />
      ) : (
        <p className="font-bold">{oldTitle}</p>
      )}
      <div>
        {isEditingTitle ? (
          <IoMdDoneAll color="white" onClick={finishEditingHandler} />
        ) : (
          <AiFillEdit
            color="white"
            onClick={() => setIsEditingTitle((prev) => !prev)}
          />
        )}
      </div>
    </div>
  );
};

export default ColumnTitle;
