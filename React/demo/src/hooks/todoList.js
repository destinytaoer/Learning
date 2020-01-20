import React, { memo, useState, useEffect, useCallback, useRef } from "react";
import '../App.css';

let idSeq = Date.now();
const Control = memo((props) => {
  const { addTodo } = props;
  const inputRef = useRef();

  const onSubmit = useCallback((e) => {
    e.preventDefault();
    const newText = inputRef.current.value.trim();
    if (newText.length === 0) return;

    addTodo({
      id: ++idSeq,
      text: newText,
      complete: false
    });

    inputRef.current.value = '';
  }, []);

  return (
    <div className="control">
      <h1>Todos</h1>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          ref={inputRef}
          className="new-todo"
          placeholder="What needs to be done?"
        />
      </form>
    </div>
  )
});

const TodoItem = memo((props) => {
  const {
    removeTodo,
    toggleTodo,
    todo: { id, text, complete }
  } = props;

  const onChange = useCallback(() => {
    toggleTodo(id);
  }, []);

  const onRemove = useCallback(() => {
    removeTodo(id)
  }, []);

  return (
    <li className="todo-item">
      <input
        type="checkbox"
        id={"complete-" + id}
        onChange={onChange}
        checked={complete}
      />
      <label className={complete ? "complete" : ''} htmlFor={"complete-" + id}>{text}</label>
      <button onClick={onRemove}>&#xd7;</button>
    </li>
  )
});

const Todos = memo((props) => {
  const { removeTodo, toggleTodo, todos } = props;
  return (
    <ul className="todos">
      {
        todos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            toggleTodo={toggleTodo}
            removeTodo={removeTodo}
          />
        ))
      }
    </ul>
  )
});

const LS_KEY = '$todos';
export default function TodoList() {
  const [todos, setTodos] = useState([]);

  const addTodo = useCallback((todo) => {
    setTodos(todos => [...todos, todo]);
  }, []);

  const removeTodo = useCallback((id) => {
    setTodos(todos => todos.filter(todo => {
      return todo.id !== id;
    }))
  }, []);

  const toggleTodo = useCallback((id) => {
    setTodos(todos => todos.map(todo => {
      return todo.id === id
        ? { ...todo, complete: !todo.complete }
        : todo;
    }))
  }, []);

  useEffect(() => {
    const todos = localStorage.getItem(LS_KEY) || '[]';
    setTodos(JSON.parse(todos));
  }, []);

  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(todos))
  }, [todos]);

  return (
    <div className="todo-list">
      <Control addTodo={addTodo}></Control>
      <Todos toggleTodo={toggleTodo} removeTodo={removeTodo} todos={todos}></Todos>
    </div>
  )
}