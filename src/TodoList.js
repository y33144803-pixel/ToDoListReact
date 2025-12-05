import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import service from './service.js';

function TodoList() {
  const [newTodo, setNewTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!service.isLoggedIn()) {
      navigate('/login');
      return;
    }
    getTodos();
  }, [navigate]);

  async function getTodos() {
    try {
      const todos = await service.getTasks();
      setTodos(todos);
    } catch (error) {
      console.error('Failed to get todos:', error);
    }
  }

  async function createTodo(e) {
    e.preventDefault();
    if (!newTodo.trim()) return;
    
    try {
      await service.addTask(newTodo);
      setNewTodo("");
      await getTodos();
    } catch (error) {
      console.error('Failed to create todo:', error);
    }
  }

  async function updateCompleted(todo, isComplete) {
    try {
      await service.setCompleted(todo.id, todo.name, isComplete);
      await getTodos();
    } catch (error) {
      console.error('Failed to update todo:', error);
    }
  }

  async function deleteTodo(id) {
    try {
      await service.deleteTask(id);
      await getTodos();
    } catch (error) {
      console.error('Failed to delete todo:', error);
    }
  }

  async function updateTodo(id, name, isComplete) {
    try {
      await service.updateTask(id, name, isComplete);
      await getTodos();
      setEditingId(null);
      setEditingText("");
    } catch (error) {
      console.error('Failed to update todo:', error);
    }
  }

  function startEditing(todo) {
    setEditingId(todo.id);
    setEditingText(todo.name);
  }

  function cancelEditing() {
    setEditingId(null);
    setEditingText("");
  }

  function handleEditKeyPress(e, todo) {
    if (e.key === 'Enter') {
      updateTodo(todo.id, editingText, todo.isComplete);
    } else if (e.key === 'Escape') {
      cancelEditing();
    }
  }

  function handleLogout() {
    service.logout();
    navigate('/login');
  }

  return (
    <section className="todoapp">
      <header className="header">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1>todos</h1>
          <div>
            <span style={{ marginRight: '10px' }}>Welcome, {localStorage.getItem('username')}</span>
            <button 
              onClick={handleLogout} 
              style={{ 
                padding: '8px 16px',
                backgroundColor: '#d32f2f',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Logout
            </button>
          </div>
        </div>
        <form onSubmit={createTodo}>
          <input 
            className="new-todo" 
            placeholder="Well, let's take on the day" 
            value={newTodo} 
            onChange={(e) => setNewTodo(e.target.value)} 
            required
          />
        </form>
      </header>
      <section className="main" style={{ display: "block" }}>
        <ul className="todo-list">
          {todos.map(todo => {
            const isEditing = editingId === todo.id;
            const className = todo.isComplete ? "completed" : "";
            const finalClassName = isEditing ? className + " editing" : className;
            
            return (
              <li className={finalClassName} key={todo.id}>
                <div className="view">
                  <input 
                    className="toggle" 
                    type="checkbox" 
                    checked={todo.isComplete} 
                    onChange={(e) => updateCompleted(todo, e.target.checked)} 
                  />
                  <label onDoubleClick={() => startEditing(todo)}>
                    {todo.name}
                  </label>
                  <button 
                    className="destroy" 
                    onClick={() => deleteTodo(todo.id)}
                  ></button>
                </div>
                {isEditing && (
                  <input 
                    className="edit" 
                    value={editingText} 
                    onChange={(e) => setEditingText(e.target.value)}
                    onKeyDown={(e) => handleEditKeyPress(e, todo)}
                    onBlur={() => updateTodo(todo.id, editingText, todo.isComplete)}
                    autoFocus
                  />
                )}
              </li>
            );
          })}
        </ul>
      </section>
    </section>
  );
}

export default TodoList;