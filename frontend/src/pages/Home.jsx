import React, { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";
import axios from "axios";
import TaskCard from "../components/TaskCard";

const Home = () => {
  const [task, setTask] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    setLoading(true);
    axios.get("http://localhost:5555/tasks").then((response) => {
      // We are using response.data.data because data in an object from get all
      // tasks in router and we need the data in the data object.
      setTask(response.data.data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl my-8">Tasks Manager</h1>
        <Link to="/tasks/create">
          <MdOutlineAddBox className="text-sky-800 hover:text-sky-600 text-4xl" />
        </Link>
      </div>
      {loading ? <Spinner /> : <TaskCard tasks={task} />}
    </div>
  );
};

export default Home;
