
const TodoItem = ({ item, onEditHandler, onDeleteHandler, editingTodoId }) => {
  return (
    <div className="mt-4 flex items-center justify-between gap-2">
      <div className="flex items-center justify-between w-[100%]">
        <input
          type="text"
          value={item.content}
          readOnly
          className="w-full bg-gray-200 border border-gray-300 text-gray-800 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block p-2.5 mb-2"
        />
        {editingTodoId !== item.id && (
          <button
            onClick={() => onEditHandler(item.id)}
            className="ml-2 bg-blue-700 text-white py-2 px-4 rounded-md text-sm hover:bg-blue-600 focus:outline-none focus:ring-red-300"
          >
            Edit
          </button>
        )}
      </div>
      <div>
        {editingTodoId !== item.id && (
          <button
            onClick={() => onDeleteHandler(item.id)}
            className="bg-red-500 text-white py-2 px-4 rounded-md text-sm hover:bg-red-600 focus:outline-none focus:ring-red-300"
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
};

export default TodoItem;
