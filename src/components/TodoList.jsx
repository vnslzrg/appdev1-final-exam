import TodoItem from "./TodoItem";

const TodoList = ({ theme, todos, onToggleTodo, onDeleteTodo }) => {
  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <li key={todo.id}>
          <TodoItem
            theme={theme}
            todo={todo}
            onToggle={onToggleTodo}
            onDelete={onDeleteTodo}
          />
        </li>
      ))}
    </ul>
  );
};

export default TodoList;