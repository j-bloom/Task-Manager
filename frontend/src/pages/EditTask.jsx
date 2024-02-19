import React, { useState, useEffect } from "react";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useSnackbar } from "notistack";

const EditTask = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [plannedDateToComplete, setPlannedDateToComplete] = useState(null);
  const [completed, setCompleted] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  // const [endDate, setEndDate] = useState(new Date());
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/tasks/${id}`)
      .then((response) => {
        setTitle(response.data.title);
        setDescription(response.data.description);
        setPlannedDateToComplete(response.data.plannedDateToComplete);
        setCompleted(response.data.completed);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        alert("An error has occurred. Please check console.");
        console.log(error);
      });
  }, []);

  const handleEditTask = async (e) => {
    const data = {
      title,
      description,
      plannedDateToComplete,
      completed,
    };
    setLoading(true);
    axios
      .put(`http://localhost:5555/tasks/${id}`, data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Task edited successfully", { variant: "success" });
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar("Error", { variant: "error" });
        console.log(error);
      });
  };

  const handleCompletedChange = (e) => {
    setCompleted(e.target.value === "true");
  };

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Edit Task</h1>
      {loading ? <Spinner /> : ""}
      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
        <div className="my-4">
          <label className="text-xl mr-4 text-grey-500">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border-2 border-grey-500 w-full px-4 py-2"
            placeholder="Enter task title"
          />
          <label className="text-xl mr-4 text-grey-500">Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border-2 border-grey-500 w-full px-4 py-2"
            placeholder="Enter task description"
          />
          <label className="text-xl mr-4 text-grey-500">
            Estimated Completion Date
          </label>
          <DatePicker
            selected={plannedDateToComplete}
            onChange={(date) => setPlannedDateToComplete(date)}
            className="border-2 border-grey-500 w-full px-4 py-2 mt-6"
          />
          <br />
          <div>
            <label className="text-xl mr-4 text-grey-500">Is Completed</label>
            <div>
              <label>
                <input
                  type="radio"
                  value="true"
                  checked={completed === true}
                  onChange={handleCompletedChange}
                  className="mr-2"
                />
                Yes
              </label>
              <label className="ml-4">
                <input
                  type="radio"
                  value="false"
                  checked={completed === false}
                  onChange={handleCompletedChange}
                  className="mr-2"
                />
                No
              </label>
            </div>
          </div>
          {/* <label className="text-xl mr-4 text-grey-500">Is Completed</label>
          <input
            type="text"
            value={completed}
            onChange={(e) => setCompleted(e.target.value)}
            className="border-2 border-grey-500 w-full px-4 py-2"
          /> */}
        </div>
        <button className="p-2 bg-sky-300 m-8" onClick={handleEditTask}>
          Save
        </button>
      </div>
    </div>
  );
};

export default EditTask;
