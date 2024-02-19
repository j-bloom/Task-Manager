import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { MdOutlineDelete } from "react-icons/md";

const TaskCard = ({ tasks }) => {
  function formattedDate(date) {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(date).toLocaleDateString("en-US", options);
  }

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {tasks.map((task) => (
        <div
          key={task._id}
          className="border border-grey-500 rounded-lg px-4 py-2 m-4 relative hover:shadow-xl"
        >
          <h2
            className={`absolute top-1 right-2 px-4 py-1 rounded-lg ${
              task.completed ? "bg-green-300" : "bg-red-300"
            }`}
          >
            {task.completed ? "Completed" : "Not Completed"}
          </h2>
          <h4 className="my-2 text-grey-500">Task: {task.title}</h4>
          <div className="flex justify-start items-center gap-x-2  my-4">
            Description: {task.description}
          </div>
          <div className="flex justify-start items-center gap-x-2 my-4">
            Estimated Completion Date:{" "}
            {formattedDate(task.plannedDateToComplete)}
          </div>
          <div className="flex justify-start items-center gap-x-2  my-4">
            Date Created: {formattedDate(task.createdAt)}
          </div>
          <div className="flex justify-end gap-x-4 my-4">
            <Link to={`/tasks/edit/${task._id}`}>
              <AiOutlineEdit className="text-2xl text-yellow-600" />
            </Link>
            <Link to={`/tasks/delete/${task._id}`}>
              <MdOutlineDelete className="text-2xl text-red-600" />
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskCard;
