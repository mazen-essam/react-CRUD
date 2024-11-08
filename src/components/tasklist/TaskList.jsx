import React, { useContext, useState } from "react";
import Button from "../form/Button";
import { TasksContext } from "../../store/TaskContext";
import ViewModal from "./ViewModal";
import { useNavigate } from "react-router-dom";
import DeleteModal from "./DeleteModal";
import { toast } from "react-toastify";

function TaskList({ setIsEdit }) {
  const { tasks, deleteTask } = useContext(TasksContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // Control DeleteModal visibility
  const [selectedTask, setSelectedTask] = useState(null);
  const navigate = useNavigate();

  const handleViewClick = (task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (task) => {
    setSelectedTask(task);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedTask) {
      deleteTask(selectedTask.id);
      setIsDeleteModalOpen(false);
      toast.error("Task deleted successfully!");
    }
  };

  const handleEdit = (task) => {
    setIsEdit(task);
    navigate("/form");
  };

  return (
    <div className="mt-8 md:mt-10 lg:mt-12 xl:mt-14">
      <div className="mb-6 md:mb-8 lg:mb-10 flex justify-between">
        <h2 className="text-lg md:text-xl lg:text-2xl font-semibold">
          Your Tasks
        </h2>
      </div>
      <div>
        <div className="my-4 flex justify-between border-b border-slate-400 py-2">
          <div className="md:flex hidden justify-between w-full font-semibold md:gap-4 lg:gap-8 xl:gap-16  md:justify-between md:w-full md:me-32">
            <h2 className="text-sm md:text-base lg:text-lg">Task Name</h2>
            <p className="text-sm md:text-base lg:text-lg">Status</p>
            <p className="text-sm md:text-base lg:text-lg">Date</p>
          </div>
          <div className="md:hidden">
            <h2 className="text-sm md:text-base lg:text-lg px-2 md:px-3 lg:px-4 font-semibold">
              Task Details
            </h2>
          </div>
          <div className="flex gap-2 md:gap-4 lg:gap-6 xl:gap-10 ">
            <h2 className="text-sm md:text-base lg:text-lg px-2 md:px-3 lg:px-4 font-semibold">
              Edit
            </h2>
            <h2 className="text-sm md:text-base lg:text-lg px-2 md:px-3 lg:px-4 font-semibold">
              Delete
            </h2>
            <h2 className="text-sm md:text-base lg:text-lg px-2 md:px-3 lg:px-4 font-semibold">
              View
            </h2>
          </div>
        </div>
        {tasks.map((task) => (
          <div
            key={task.id}
            className="my-2 flex justify-between border-b border-slate-400 py-2"
          >
            <div className="flex flex-col md:flex-row gap-4 md:gap-8 lg:gap-10 md:justify-between md:w-full md:me-16">
              <h2 className="text-sm md:text-base lg:text-lg">{task.name}</h2>
              <p className="text-sm md:text-base lg:text-lg">
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
              <p className="text-sm md:text-base lg:text-lg">
                {new Date(task.date).toDateString()}
              </p>
            </div>
            <div className="flex gap-2 md:gap-4 lg:gap-6 xl:gap-8 items-center md:items-start">
              <Button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 md:py-2 md:px-4 rounded text-xs md:text-sm lg:text-base"
                onClick={() => handleEdit(task)}
              >
                Edit
              </Button>
              <Button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-2 md:py-2 md:px-4 rounded text-xs md:text-sm lg:text-base"
                onClick={() => handleDeleteClick(task)}
              >
                Delete
              </Button>
              <Button
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-2 md:py-2 md:px-4 rounded text-xs md:text-sm lg:text-base"
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
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        deleteTask={handleConfirmDelete}
      />
    </div>
  );
}

export default TaskList;
