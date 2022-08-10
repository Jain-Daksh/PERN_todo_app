import React from 'react'
import { useEffect , useState } from 'react'
import EditTodo from './EditTodo';
function ListTodo() {
  
  //delete
  const deleteTodo = async(id) => {
    try {
      const deleteTodo = await fetch(`http://localhost:5000/todos/${id}`, {
        method: "DELETE"
      });
      setTodos(todos.filter(todo => todo.id !== id));
    } catch (error) {
      console.log(error.message)
    }
  }
  
  
  //
  const [todos , setTodos] = useState([]);
  const getTodos = async () => {
    try {
      const response = await fetch('http://localhost:5000/todos') 
      const jsonData = await response.json()

      setTodos(jsonData)
    } catch (error) {
      console.log(error.message)
    }
  };
  useEffect(() => {
    getTodos()
  })
  return (
    <div>
      <h1>list</h1>
      <table className="table mt-5">
    <thead>
      <tr>
        <th>Description</th>
        <th>Edit</th>
        <th>Delete</th>
      </tr>
    </thead>
    <tbody>
    {todos.map(todo => (
      <tr key={todo.id}>
        <td>{todo.description}</td>
        <td><EditTodo todo={todo} /></td>
        <td>
          <button className="btn btn-danger" onClick={() => deleteTodo(todo.id)}>
            Delete
          </button>
        </td>
      </tr>
    ))}
    </tbody>
  </table>
    </div>
  )
}

export default ListTodo