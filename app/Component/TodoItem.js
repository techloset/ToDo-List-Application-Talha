// import React from "react";

// const TodoItem = ({ item, index, editMode,todoInput, onDeleteHandler, onEditHandler, setTodoInput, handleSubmit }) => {
//   return (
//     <div key={item.id} className="mt-4 flex items-center justify-between">
//       {editMode === index ? (
//         <input
//           type="text"
//           value={todoInput} 
//           onChange={(e) => setTodoInput(e.target.value)}
//           className="w-full bg-gray-200 border border-gray-300 text-gray-800 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block p-2.5 mb-2"
//         />
//       ) : (
//         <input
//           type="text"
//           value={item.content}
//           readOnly
//           className="w-full bg-gray-200 border border-gray-300 text-gray-800 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block p-2.5 mb-2"
//         />
//       )}

//       <div>
//         {editMode === index ? (
//           <>
//             <button
//               onClick={() => onEditHandler(null)} 
//               className="focus:outline-none text-gray-800 bg-gray-300 hover:bg-gray-400 focus:ring focus:border-gray-400 font-medium rounded-md text-sm px-4 py-2 mr-2"
//             >
//               Cancel
//             </button>
//             <button
//               onClick={handleSubmit}
//               className="focus:outline-none text-white bg-green-500 hover:bg-green-600 focus:ring-green-300 font-medium rounded-md text-sm px-4 py-2"
//             >
//               Save
//             </button>
//           </>
//         ) : (
//           <>
//             <button
//               onClick={() => onEditHandler(index)}
//               className="focus:outline-none text-white  bg-gray-800 hover:bg-gray-900 focus:ring focus:border-gray-900 font-medium rounded-md text-sm px-4 py-2 mr-2"
//             >
//               Edit
//             </button>
//             <button
//               onClick={() => onDeleteHandler(item.id)}
//               className="focus:outline-none text-white bg-red-500 hover:bg-red-600 focus:ring-red-300 font-medium rounded-md text-sm px-4 py-2"
//             >
//               Delete
//             </button>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default TodoItem;
