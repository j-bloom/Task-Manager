import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";

const ShowTask = () => {
  const [task, setTask] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/tasks/${id}`)
      .then((response) => {
        setTask(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  function formattedDate(date) {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(date).toLocaleDateString("en-US", options);
  }

  return (
    <div className="p-4">
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4">
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Task:</span>
            <span>{task.title}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Description:</span>
            <span>{task.description}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">
              Estimated completion date:
            </span>
            <span>{formattedDate(task.plannedDateToComplete)}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Is Complete:</span>
            <span>{task.completed ? "Completed" : "Not Completed"}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Created On:</span>
            <span>{formattedDate(task.createdAt)}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowTask;
