// // TodoList.js
// import React from "react";
// import TodoItem from "./TodoItem";

// const TodoList = ({ todo, editMode, onDeleteHandler, onEditHandler, setTodoInput, handleSubmit }) => {
//   return (
//     <div>
//       {todo.map((item, index) => (
//         <TodoItem
//           key={item.id}
//           item={item}
//           index={index}
//           editMode={editMode}
//           onDeleteHandler={onDeleteHandler}
//           onEditHandler={onEditHandler}
//           setTodoInput={setTodoInput}
//           handleSubmit={handleSubmit}
//         />
//       ))}
//     </div>
//   );
// };

// export default TodoList;

import React from "react";
import TodoItem from "./TodoItem";

const TodoList = ({ todo, onEditHandler, onDeleteHandler, editingTodoId }) => {
  return (
    <div>
      {todo.map((item, index) => (
        <TodoItem
          key={item.id}
          item={item}
          onEditHandler={onEditHandler}
          onDeleteHandler={onDeleteHandler}
          editingTodoId={editingTodoId}
        />
      ))}
    </div>
  );
};

export default TodoList;
