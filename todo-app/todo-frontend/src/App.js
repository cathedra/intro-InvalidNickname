import React, {useState, useEffect} from "react"
import "./App.css"
import APIHelper from "./APIHelper.js"
import ToDo from "./components/ToDo";

import {faPlus} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

function App() {
    const [todos, setTodos] = useState([])
    const [todo, setTodo] = useState("")
    const [date, setDate] = useState("")
    const [curEditing, setEditing] = useState(-1)

    useEffect(() => {
        const fetchTodoAndSetTodos = async () => {
            const todos = await APIHelper.getAllTodos()
            setTodos(todos)
        }
        fetchTodoAndSetTodos()
    }, [])

    const createTodo = async e => {
        e.preventDefault()
        if (!todo) {
            alert("please enter something")
            return
        }
        if (todos.some(({task}) => task === todo)) {
            alert(`Task: ${todo} already exists`)
            return
        }
        const newTodo = await APIHelper.createTodo(todo, date)
        setTodos([...todos, newTodo])
    }

    const deleteTodo = async (e, id) => {
        try {
            e.stopPropagation()
            await APIHelper.deleteTodo(id)
            setTodos(todos.filter(({_id: i}) => id !== i))
        } catch (err) {
        }
    }

    const updateTodo = async (e, id) => {
        e.stopPropagation()
        const payload = {
            completed: !todos.find(todo => todo._id === id).completed,
        }
        const updatedTodo = await APIHelper.updateTodo(id, payload)
        setTodos(todos.map(todo => (todo._id === id ? updatedTodo : todo)))
    }

    const editTodo = async (id, value) => {
        const payload = {
            task: value,
        }
        const updatedTodo = await APIHelper.updateTodo(id, payload)
        setTodos(todos.map(todo => (todo._id === id ? updatedTodo : todo)))
    }

    const toggleEditing = (e, id) => {
        e.stopPropagation()
        if (curEditing !== id) {
            setEditing(id)
        } else {
            setEditing(-1)
        }
    }

    return (
        <div className="App">
            <div className="form">
                <input
                    id="todo-input"
                    type="text"
                    value={todo}
                    onChange={({target}) => setTodo(target.value)}
                    onKeyPress={async (event) => {
                        if (event.key === 'Enter') {
                            await createTodo(event)
                        }
                    }}
                />
                <input
                    id="date-input"
                    type="date"

                    onChange={({target}) => setDate(target.value)}
                />
                <span onClick={createTodo} id="add-btn">
                    <FontAwesomeIcon icon={faPlus}/>
                </span>
            </div>
            <table align="center" className="table">
                {todos.map((task, i) => {
                    let editing = task._id === curEditing
                    return <ToDo todo={task} i={i} updateTodo={updateTodo} deleteTodo={deleteTodo} editing={editing}
                                 toggleEditing={toggleEditing} editTodo={editTodo}/>
                })}
            </table>
        </div>
    )
}

export default App