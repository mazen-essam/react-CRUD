import React, { useContext, useState } from "react";
import Button from "../form/Button";
import { TasksContext } from "../../store/TaskContext";
import ViewModal from "./ViewModal";

function TaskList({ setIsEdit }) {
  const { tasks, deleteTask } = useContext(TasksContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const handleViewClick = (task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  return (
    <div className="mt-10 ">
      <div className="mb-10 flex justify-between">
        <h2 className="text-xl font-semibold">Your Tasks</h2>
      </div>
      <div>
        <div className="my-4 flex justify-between border-b-2 border-slate-400 py-2">
          <div className="flex justify-between w-full font-semibold me-28 2xl:me-0 2xl:w-auto 2xl:gap-28">
            <h2>Task Name</h2>
            <p>Status</p>
            <p>Date</p>
          </div>
          <div className="flex 2xl:gap-10 gap-2">
            <h2 className="px-4 font-semibold">Edit</h2>
            <h2 className="px-4 font-semibold">Delete</h2>
            <h2 className="px-4 font-semibold">View</h2>
          </div>
        </div>
        {tasks.map((task) => (
          <div
            key={task.id}
            className="my-4 flex justify-between border-b-2 border-slate-400 py-2"
          >
            <div className="flex gap-10">
              <h2>{task.name}</h2>
              <p>
                Status:{" "}
                <span
                  className={
                    task.status
                      ? "text-green-600 font-semibold"
                      : "text-red-600 font-semibold"
                  }
                >
                  {task.status ? "Completed" : "Incomplete"}
                </span>
              </p>
              <p>{task.date.toDateString()}</p>
            </div>
            <div className="flex gap-2 2xl:gap-10">
              <Button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => setIsEdit(task)}
              >
                Edit
              </Button>
              <Button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => deleteTask(task.id)}
              >
                Delete
              </Button>
              <Button
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => handleViewClick(task)}
              >
                View
              </Button>
            </div>
          </div>
        ))}
      </div>
      <ViewModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        task={selectedTask}
      />
    </div>
  );
}

export default TaskList;
