import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTodos,
  addTodo,
  updateTodo,
  deleteTodo,
} from "../features/todos/todosSlice";
import "../index.css";

const getInitialTheme = () => {
  if (typeof window === "undefined") return "standard";
  const saved = localStorage.getItem("savedTheme");
  return saved || "standard";
};

const Todos = () => {
  const [theme, setTheme] = useState(getInitialTheme);
  const [inputValue, setInputValue] = useState("");

  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos.items);

  // load todos from JSONPlaceholder on first mount
  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  // apply theme (same as before)
  useEffect(() => {
    document.body.className = theme;

    const titleEl = document.getElementById("title");
    if (titleEl) {
      if (theme === "darker") {
        titleEl.classList.add("darker-title");
      } else {
        titleEl.classList.remove("darker-title");
      }
    }

    const inputEl = document.querySelector("input.todo-input");
    if (inputEl) {
      inputEl.className = `todo-input ${theme}-input`;
    }

    document.querySelectorAll(".todo").forEach((todoEl) => {
      const isCompleted = Array.from(todoEl.classList).some(
        (item) => item === "completed"
      );
      todoEl.className = isCompleted
        ? `todo ${theme}-todo completed`
        : `todo ${theme}-todo`;
    });

    document.querySelectorAll("button").forEach((button) => {
      if (button.classList.contains("check-btn")) {
        button.className = `check-btn ${theme}-button`;
      } else if (button.classList.contains("delete-btn")) {
        button.className = `delete-btn ${theme}-button`;
      } else if (button.classList.contains("todo-btn")) {
        button.className = `todo-btn ${theme}-button`;
      }
    });

    localStorage.setItem("savedTheme", theme);
  }, [theme]);

  const handleAddTodo = (e) => {
    e.preventDefault();
    const todoText = inputValue.trim();
    if (todoText === "") {
      alert("You must write something!");
      return;
    }
    // call thunk that hits POST /todos
    dispatch(addTodo(todoText));
    setInputValue("");
  };

  const handleToggleTodo = (todo) => {
    // send whole todo so thunk can PATCH /todos/:id with flipped completed
    const updated = { ...todo, completed: !todo.completed };
    dispatch(updateTodo(updated));
  };

  const handleDeleteTodo = (id) => {
    dispatch(deleteTodo(id));
  };

  const handleChangeTheme = (color) => {
    setTheme(color);
  };

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
};
export default Todos;