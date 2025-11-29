
return (
  <>
    <section id="header">
      <h1 id="title">To Do List</h1>

      <div className="flexrow-container">
        <div
          className="theme-selector standard-theme"
          onClick={() => handleChangeTheme("standard")}
        />
        <div
          className="theme-selector light-theme"
          onClick={() => handleChangeTheme("light")}
        />
        <div
          className="theme-selector darker-theme"
          onClick={() => handleChangeTheme("darker")}
        />
      </div>
    </section>

    <form id="form" onSubmit={handleAddTodo}>
      <input
        type="text"
        className={`todo-input ${theme}-input`}
        placeholder="Add a todo"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button type="submit" className={`todo-btn ${theme}-button`}>
        <i className="fas fa-plus" />
      </button>
    </form>

    <div id="myUnOrdList">
      <ul className="todo-list">
        {todos.map((todo) => (
          <li key={todo.id}>
            <div
              className={`todo ${theme}-todo ${
                todo.completed ? "completed" : ""
              }`}
            >
              <span className="todo-item">
                {todo.title || todo.text}
              </span>
              <button
                type="button"
                className={`check-btn ${theme}-button`}
                onClick={() => handleToggleTodo(todo)}
              >
                <i className="fas fa-check" />
              </button>
              <button
                type="button"
                className={`delete-btn ${theme}-button`}
                onClick={() => handleDeleteTodo(todo.id)}
              >
                <i className="fas fa-trash" />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  </>
);
