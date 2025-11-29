const TodoItem = ({ theme, todo, onToggle, onDelete }) => {
  return (
    <div
      className={`todo ${theme}-todo ${todo.completed ? "completed" : ""}`}
    >
      <span className="todo-item">{todo.text}</span>
      <button
        type="button"
        className={`check-btn ${theme}-button`}
        onClick={() => onToggle(todo.id)}
      >
        <i className="fas fa-check" />
      </button>
      <button
        type="button"
        className={`delete-btn ${theme}-button`}
        onClick={() => onDelete(todo.id)}
      >
        <i className="fas fa-trash" />
      </button>
    </div>
  );
};

export default TodoItem;