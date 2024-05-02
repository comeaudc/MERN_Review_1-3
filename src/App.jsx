import { useState, useEffect } from 'react';
import TodoList from './components/TodoList/TodoList';

function App() {
  const [todos, setTodos] = useState([]);
  const [completedTodos, setCompletedTodos] = useState([]);
  const [newTodo, setNewTodo] = useState({
    title: '',
    completed: false,
  });

  // Create Todos
  const createTodo = async () => {
    const body = { ...newTodo };
    try {
      const res = await fetch('/api/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTodo),
      });
      const createdTodo = await res.json();
      const todosCopy = [createdTodo, ...todos];
      setTodos(todosCopy);
      setNewTodo({
        title: '',
        completed: false,
      });
    } catch (error) {
      console.error(error);
    }
  };
  // Delete Todos
  const deleteTodo = async (id) => {
    try {
      const index = completedTodos.findIndex((todo) => {
        return todo._id == id;
      });
      //make some more changes
      const completedTDsCopy = [...completedTodos];
      const res = await fetch(`/api/todos/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      await res.json();
      completedTDsCopy.splice(index, 1);
      setCompletedTodos(completedTDsCopy);
    } catch (error) {
      console.error(error);
    }
  };
  // moveToCompleted
  const moveToCompleted = async (id) => {
    try {
      console.log(todos);
      const index = todos.findIndex((todo) => {
        return todo._id == id;
      });

      const todosCopy = [...todos];
      const subject = todosCopy[index];
      subject.completed = true;
      const res = await fetch(`/api/todos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(subject),
      });
      const updatedTodo = await res.json();
      const completedTDsCopy = [updatedTodo, ...completedTodos];
      setCompletedTodos(completedTDsCopy);
      todosCopy.splice(index, 1);
      setTodos(todosCopy);
    } catch (error) {
      console.error(error);
    }
  };
  // getTodos
  const getTodos = async () => {
    try {
      const res = await fetch('/api/todos');
      const foundTodos = await res.json();
      setTodos(foundTodos.reverse());
      const res2 = await fetch('/api/todos/completed');
      const foundCompletedTodos = await res2.json();
      setCompletedTodos(foundCompletedTodos.reverse());
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <>
      <TodoList
        newTodo={newTodo}
        setNewTodo={setNewTodo}
        createTodo={createTodo}
        todos={todos}
        completedTodos={completedTodos}
        moveToCompleted={moveToCompleted}
        deleteTodo={deleteTodo}
      />
    </>
  );
}

export default App;
