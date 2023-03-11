import { Divider } from "@nextui-org/react";
import React from "react";
import { useSelector } from "react-redux";
import { HiOutlineExternalLink } from "react-icons/hi";
const History = () => {
  const history = useSelector((state) => state.taskReducer.history);
  if (history.length === 0) {
    return (
      <div className="py-2 mt-10">
        <p className="opacity-50">No Activity yet!</p>
      </div>
    );
  }
  return (
    <div className="py-2 mt-5">
      {history.map((item) => (
        <>
          <p className="p-2 my-3 bg-gray-100 shadow-2xl drop-shadow-md  rounded-md">
            You Opened {item.task} on
            <span className="bg-orange-200 rounded-full px-2 py-1  font-semibold text-sm">
              {item.lastClickedAt}
            </span>
            <a href={item.video_url}>
              <HiOutlineExternalLink color="blue" className="mt-2" size={20} />
            </a>
          </p>
        </>
      ))}
    </div>
  );
};

export default History;
