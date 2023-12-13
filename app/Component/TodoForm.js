
const TodoForm = ({ onSubmit, todoInput, setTodoInput, editingTodoId }) => {
  return (
    <div className="flex flex-wrap items-center justify-center">
      <input
        type="text"
        onChange={(e) => setTodoInput(e.target.value)}
        value={todoInput}
        placeholder="Enter your Todo Here"
        className="w-full md:w-3/4 bg-gray-300 border border-gray-300 text-gray-800 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block p-2.5 mb-4 md:mb-0"
        required
      />
      <button
        onClick={onSubmit}
        className="w-full md:w-1/4 bg-blue-700 text-white py-2 px-4 rounded-md text-sm md:ml-2.5 md:mt-6 mt-4 hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-600"
      >
        {editingTodoId ? "Update" : "Submit"}
      </button>
    </div>
  );
};

export default TodoForm;
