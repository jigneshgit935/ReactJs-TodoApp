import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const api_url = process.env.REACT_APP_API_URL;

  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState({
    id: '',
    title: '',
    description: '',
  });

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await fetch(`${api_url}/getAllTodo`);
      const data = await response.json();
      setTodos(data.todos);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchTodoById = async (id) => {
    try {
      const response = await fetch(`${api_url}/getatodo/${id}`);
      const data = await response.json();
      console.log(data);
      setNewTodo({
        title: data.todo.title,
        description: data.todo.description,
        id: data.todo._id,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const deleteTodo = async (id) => {
    try {
      const response = await fetch(`${api_url}/deletetodo/${id}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      alert(data.message);
      fetchTodos();
      console.log('delete button clicked');
    } catch (error) {
      console.log(error);
    }
  };

  const createTodo = async (e) => {
    if (newTodo.title === '') {
      alert('title is required');
    }
    e.preventDefault();
    try {
      const response = await fetch(`${api_url}/createtodo`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTodo),
      });
      const data = await response.json();
      alert(data.message);
      fetchTodos();
    } catch (error) {
      console.log(error);
    }
  };

  const updateTodo = async (id) => {
    if (newTodo.title === '') {
      alert('title is required');
    }
    try {
      console.log(id);
      const response = await fetch(`${api_url}/updatetodo/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTodo),
      });

      const data = await response.json();
      alert(data.message);
      fetchTodos();
    } catch (error) {
      console.log(error);
    }
  };

  // console.log(process.env.REACT_APP_API_URL);
  return (
    <div className="">
      <h1 className="display-3 text-center fw-bold py-3">Todo App</h1>
      <div className="d-flex justify-content-center  flex-wrap">
        {todos.map((todo) => {
          return (
            <div
              key={todo._id}
              style={{ gap: '20px', backgroundColor: 'aliceblue' }}
              className="py-3 d-flex text-center flex-column my-3 justify-content-center align-items-center col-lg-5 mx-2 col-md-6 col-12 shadow"
            >
              <h3 style={{ textTransform: 'capitalize' }} className="">
                {todo.title}
              </h3>
              <p style={{ textTransform: 'capitalize' }} className="">
                {todo.description}
              </p>
              <p style={{ textTransform: 'capitalize' }}>
                {todo.completed ? 'Completed' : 'Not Completed'}
              </p>
              <button
                onClick={() => deleteTodo(todo._id)}
                className="px-4 py-1 rounded-5"
              >
                Delete
              </button>
              <button
                onClick={() => fetchTodoById(todo._id)}
                className="px-4 py-1 rounded-5"
              >
                Edit
              </button>
            </div>
          );
        })}
      </div>

      <div className="my-5 text-center d-flex  flex-column">
        <div
          className="col-4 mx-auto border px-5 py-5"
          style={{ boxShadow: '-10px 12px 15px 10px  gray' }}
        >
          <h1 className="my-4">Create Todo</h1>
          <form className="d-flex flex-column" style={{ gap: '20px' }}>
            <input
              className="rounded p-2"
              type="text"
              placeholder="Enter title"
              onChange={(e) =>
                setNewTodo({
                  ...newTodo,
                  title: e.target.value,
                })
              }
            />

            <textarea
              rows={3}
              className="rounded p-2"
              type="text"
              placeholder="Enter description"
              onChange={(e) =>
                setNewTodo({
                  ...newTodo,
                  description: e.target.value,
                })
              }
            ></textarea>
            <div>
              <button className="rounded-4 px-3 py-1" onClick={createTodo}>
                Create Todo
              </button>
            </div>
          </form>
        </div>
      </div>

      <hr />

      <div className="my-5 text-center d-flex  flex-column">
        <div
          className="col-4 mx-auto border px-5 py-5"
          style={{ boxShadow: '-10px 12px 15px 10px  gray' }}
        >
          <h1 className="my-4">Update Todo</h1>
          <form className="d-flex flex-column" style={{ gap: '20px' }}>
            <input
              className="rounded p-2"
              type="text"
              placeholder="Enter title"
              value={newTodo.title}
              onChange={(e) =>
                setNewTodo({
                  ...newTodo,
                  title: e.target.value,
                })
              }
            />

            <textarea
              rows={3}
              className="rounded p-2"
              type="text"
              value={newTodo.description}
              placeholder="Enter description"
              onChange={(e) =>
                setNewTodo({
                  ...newTodo,
                  description: e.target.value,
                })
              }
            ></textarea>
            <div>
              <button
                className="rounded-4 px-3 py-1"
                onClick={() => updateTodo(newTodo.id)}
              >
                Update Todo
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
