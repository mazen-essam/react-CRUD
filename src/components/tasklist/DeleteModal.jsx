import React from "react";

function DeleteModal({ isOpen, onClose, deleteTask }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-1/2">
        <h2 className="text-2xl font-semibold mb-4">
          Are you sure you want to delete this task?
        </h2>
        <div className="flex justify-between">
          <button
            onClick={deleteTask}
            className="mt-6 bg-blue-500 text-white py-2 px-4 rounded"
          >
            Yes
          </button>
          <button
            onClick={onClose}
            className="mt-6 bg-red-500 text-white py-2 px-4 rounded"
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
