import React from "react"
import Checkbox from "./checkbox.component";

function Todo(props) {
    const {todo, i, updateTodo, deleteTodo, editing, toggleEditing, editTodo} = props;

    let className = "row"
    if (todo.completed) className += " completed"
    if (editing) className += " editing"
    if (new Date() > Date.parse(todo.date)) className += " expired"

    let textClass = "todo-text"
    if (todo.completed) textClass += " completed-text"

    return editing ? (<tr
        key={i}
        onDoubleClick={e => toggleEditing(e, todo._id)}
        className={className}
    >
        <td onClick={e => updateTodo(e, todo._id)}><Checkbox checked={todo.completed}/></td>
        <td>
            <input
                id="todo-edit"
                className="todo-text"
                type="text"
                autoFocus
                value={todo.task}
                onChange={({target}) => editTodo(todo._id, target.value)}
                onKeyDown={async (event) => {
                    if (event.keyCode === 27 || event.keyCode === 13) {
                        toggleEditing(event, todo._id)
                    }
                }}
            />
        </td>
        <td onClick={e => deleteTodo(e, todo._id)}>✕</td>
    </tr>) : (<tr
        key={i}
        onDoubleClick={e => toggleEditing(e, todo._id)}
        className={className}
    >
        <td onClick={e => updateTodo(e, todo._id)}><Checkbox checked={todo.completed}/></td>
        <td className={textClass}>{todo.task}{todo.date !== "" ? " до " + todo.date : ""}</td>
        <td onClick={e => deleteTodo(e, todo._id)}>✕</td>
    </tr>)
}

export default Todo