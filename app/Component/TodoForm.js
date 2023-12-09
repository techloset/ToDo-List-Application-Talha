// TodoForm.js
import React from "react";

const TodoForm = ({ onSubmit, todoInput, setTodoInput, editMode }) => {
  return (
    <div className="flex flex-wrap items-center">
      <input
        type="text"
        onChange={(e) => setTodoInput(e.target.value)}
        value={todoInput}
        placeholder="Enter your Todo Here"
        className="w-full md:w-3/4 bg-gray-100 border border-gray-300 text-gray-800 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block p-2.5 mb-4 md:mb-0"
        required
      />
      {/* <p>{todoInput}</p> */}
      <button
        onClick={onSubmit}
        className="w-full md:w-1/4 bg-blue-500 text-white py-2 px-4 rounded-md text-sm md:ml-2.5 mt-4 md:mt-5 hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-600"
      >
        {editMode !== null ? "Update" : "Submit"}
      </button>
    </div>
  );
};

export default TodoForm;
