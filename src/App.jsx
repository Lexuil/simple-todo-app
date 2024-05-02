import { useEffect, useState } from 'react'

function App() {
  // States --------------------------------------------------------------------
  // State to store the list of tasks
  const [todos, setTodos] = useState([])

  // State to store the task being added
  const [task, setTask] = useState('')

  // Effects -------------------------------------------------------------------
  // Load todos from local storage when the component mounts
  useEffect(() => {
    console.log('recovery todos from local storage...')
    const storedTodos = localStorage.getItem('todos')
    console.log(storedTodos)
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos))
    }
  }, [])

  // Save todos to local storage when the todos state changes
  useEffect(() => {
    console.log('save todos to local storage...')
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  // Functions -----------------------------------------------------------------
  // Function to add a new task
  const addTodo = () => {
    if (task.trim() !== '') {
      setTodos([
        ...todos,
        { id: new Date().getTime(), name: task, done: false },
      ])
      setTask('')
    }
  }

  // Function to toggle the done state of a task
  const toggleTodo = (id) => {
    const newTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, done: !todo.done } : todo
    )
    setTodos(newTodos)
  }

  // Function to remove a task
  const removeTodo = (id) => {
    const newTodos = todos.filter((todo) => todo.id !== id)
    setTodos(newTodos)
  }

  return (
    <main>
      <div className='container'>
        <h1>Lista de tareas</h1>

        <div className='stats'>
          <span>
            <strong>Tareas:</strong> {todos.length}
          </span>
          <span>
            <strong>Pendientes:</strong>{' '}
            {todos.filter((todo) => !todo.done).length}
          </span>
        </div>

        <h2>Agregar tarea</h2>

        <form
          className='add-task'
          onSubmit={(e) => {
            e.preventDefault()
            addTodo()
          }}
        >
          <input
            type='text'
            placeholder='Escribe una tarea'
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          <button type='submit'>Agregar</button>
        </form>

        <ol className='task-list'>
          {todos.map((todo) => (
            <li key={todo.id} className='task'>
              <div className='task-info'>
                <input
                  type='checkbox'
                  checked={todo.done}
                  onChange={() => toggleTodo(todo.id)}
                />
                <span className='task-name'>{todo.name}</span>
              </div>
              <button
                className='delete-task'
                onClick={() => removeTodo(todo.id)}
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                >
                  <path d='M6 7H5v13a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7H6zm4 12H8v-9h2v9zm6 0h-2v-9h2v9zm.618-15L15 2H9L7.382 4H3v2h18V4z'></path>
                </svg>
              </button>
            </li>
          ))}
        </ol>
      </div>
    </main>
  )
}

export default App
