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
