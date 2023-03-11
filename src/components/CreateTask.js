import { Button, Input } from "@nextui-org/react";
import React, { useCallback, useEffect, useState } from "react";
import { Dropdown } from "@nextui-org/react";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../utils/categoriesFinder";
import { toast } from "react-hot-toast";

const CreateTask = ({ onAddTask }) => {
  const categories = fetchCategories();
  const isEditing = useSelector((state) => state.taskReducer.isEditing);
  const editingData = useSelector((state) => state.taskReducer.editingData);
  const dispatch = useDispatch();

  const [task, setTask] = useState("");
  const [video_url, setVideoUrl] = useState("");
  const [category, setCategory] = useState(0);

  useEffect(() => {
    if (isEditing) {
      setTask(editingData.item.task);
      setVideoUrl(editingData.item.video_url);
      setCategory(fetchCategories(editingData.columnId));
    } else {
      setTask("");
      setVideoUrl("");
      setCategory(0);
    }
  }, [isEditing]);

  const cancelEditingHandler = useCallback(() => {
    dispatch({
      type: "STOP_EDIT",
    });
  }, [dispatch]);

  const submitHandler = () => {
    if (task.trim().length && video_url.trim().length) {
      const newTask = {
        task,
        video_url: video_url,
        image_url: "https://picsum.photos/500/400",
        id: isEditing ? editingData.item.id : uuidv4().toString(),
      };

      onAddTask(newTask, categories[category].columnId, isEditing);
    } else {
      toast.error("No empty Inputs allowed");
    }
    setTask("");
    setVideoUrl("");
    setCategory(0);
  };

  return (
    <div className="flex flex-col space-y-5 shadow-2xl py-3 drop-shadow-lg px-2">
      <h5>{isEditing ? "Update" : "Create"} Task</h5>

      <Input
        placeholder="Task Name"
        type="text"
        bordered
        value={task}
        label="Name"
        onChange={(e) => setTask(e.target.value)}
      />
      <Input
        placeholder="Youtube Video URL"
        type="url"
        bordered
        label="Video URL"
        value={video_url}
        onChange={(e) => setVideoUrl(e.target.value)}
      />
      {!isEditing && (
        <Dropdown>
          <Dropdown.Button flat>{categories[category]?.title}</Dropdown.Button>
          <Dropdown.Menu
            aria-label="Static Actions"
            onAction={(key) => setCategory(key)}
          >
            {categories.map(({ columnId, title }, index) => (
              <Dropdown.Item key={index}>{title}</Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      )}
      <Button onPress={submitHandler}>{isEditing ? "Update" : "Create"}</Button>
      {isEditing && (
        <Button bordered onPress={cancelEditingHandler}>
          Cancel
        </Button>
      )}
    </div>
  );
};

export default CreateTask;
