import React, { useState, useEffect } from 'react';
import { Todo } from './types/data';



const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const storedTodos = localStorage.getItem('todos');
    return storedTodos ? JSON.parse(storedTodos) : [];
  });

  const [newTodo, setNewTodo] = useState('');
  const [editingTodoId, setEditingTodoId] = useState<number | null>(null);
  const [editingTodoText, setEditingTodoText] = useState<string>(() => {
   const storedEditingTodoText = localStorage.getItem('editingTodoText');
    return storedEditingTodoText ? JSON.parse(storedEditingTodoText) : '';
  });
  useEffect(() => {
   const storedTodos = localStorage.getItem('todos');
   if (storedTodos) {
     setTodos(JSON.parse(storedTodos));
   }
 
   const storedEditingTodoText = localStorage.getItem('editingTodoText');
   if (storedEditingTodoText) {
     setEditingTodoText(JSON.parse(storedEditingTodoText));
   }
 }, []);
 
 useEffect(() => {
   localStorage.setItem('todos', JSON.stringify(todos));
 }, [todos]);
 
 useEffect(() => {
   localStorage.setItem('editingTodoText', JSON.stringify(editingTodoText));
 }, [editingTodoText]);

  const addTodo = () => {
    if (newTodo.trim() !== '') {
      const newTodoItem: Todo = {
        id: Date.now(),
        text: newTodo,
        completed: false,
      };

      setTodos((prevTodos) => [...prevTodos, newTodoItem]);
      setNewTodo('');
    }
  };

  const deleteTodo = (id: number) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const toggleTodo = (id: number) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const startEditingTodo = (id: number, text: string) => {
    setEditingTodoId(id);
    setEditingTodoText(text);
  };

  const saveEditedTodo = (id: number) => {
    if (editingTodoText.trim() !== '') {
      editTodo(id, editingTodoText);
    }
    setEditingTodoId(null);
  };

  const editTodo = (id: number, newText: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, text: newText } : todo
      )
    );
  };

  return (
    <div className='todo__block'>
      <h2 className='title'>I LOVE TODO LIST</h2>
      <ul className='todo__list'>
        {todos.map((todo) => (
          <li className='todo__item' key={todo.id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
            />
            {todo.id === editingTodoId ? (
              <>
                <input
                  type="text"
                  value={editingTodoText}
                  onChange={(e) => setEditingTodoText(e.target.value)}
                />
                <button onClick={() => saveEditedTodo(todo.id)}>
                &#10003;
                </button>
              </>
            ) : (
              <>
                <span
                  style={{
                    textDecoration: todo.completed ? 'line-through' : 'none',
                    opacity: todo.completed ? '0.5':'1',
                    transition: '0.4s',
                    color: todo.completed ? 'green' : 'black',
                  }}
                  onClick={() => startEditingTodo(todo.id, todo.text)}
                >
                  {todo.text}
                </span>
                <button onClick={() => deleteTodo(todo.id)}>X</button>
              </>
            )}
          </li>
        ))}
      </ul>
      <div className='todo__input'>
      <input
        type="text"
        
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            addTodo();
          }
        }}
      />
      
      <button onClick={addTodo}>ADD</button>
      </div>
      
    </div>
  );
};

export { App };
