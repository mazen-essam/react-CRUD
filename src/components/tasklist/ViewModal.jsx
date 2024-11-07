import React from "react";

function ViewModal({ isOpen, onClose, task }) {
  if (!isOpen || !task) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-1/2">
        <h2 className="text-2xl font-semibold mb-4">{task.name}</h2>
        <p><strong>Description:</strong> {task.description}</p>
        <p><strong>Date:</strong> {task.date.toDateString()}</p>
        <p><strong>Status:</strong> {task.status ? "Completed" : "Incomplete"}</p>
        <button
          onClick={onClose}
          className="mt-6 bg-red-500 text-white py-2 px-4 rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default ViewModal;
