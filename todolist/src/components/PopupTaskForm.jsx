import React, { useState } from 'react'
import { useTasksContext } from "../hooks/useTasksContext"

export default function PopupTaskForm(props) {
    const { dispatch } = useTasksContext()

    const [title, setTitle] = useState('')
    const [comment, setComment] = useState('')
    const [status, setStatus] = useState('')

    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()
        const task = { title, comment, status }
        const response = await fetch('/api/tasks', {
            method: 'POST',
            body: JSON.stringify(task),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()
        if (!response.ok) {
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }
        if (response.ok) {
            setEmptyFields([])
            setError(null)
            setTitle('')
            setComment('')
            setStatus('')
            dispatch({ type: 'CREATE_TASK', payload: json })
        }
    }

    return (props.trigger) ? (
        <div className='backdrop'>
            <form className='create-task' onSubmit={handleSubmit}>
                <i
                    className="material-icons"
                    id='close'
                    onClick={() => { props.setTrigger(false) }}>
                    close
                </i>
                <label>Task Title:</label>
                <input
                    type='text'
                    onChange={(e) => { setTitle(e.target.value) }}
                    value={title}
                    className={emptyFields?.includes('title') ? 'error' : ''} />
                <label>Comment: <small>(option)</small></label>
                <input
                    type='text'
                    onChange={(e) => { setComment(e.target.value) }}
                    value={comment} />
                <label>Status:</label>
                <select
                    onChange={(e) => { setStatus(e.target.value) }}
                    value={status}
                    className={emptyFields?.includes('status') ? 'error' : ''}>
                    <option></option>
                    <option>incomplete</option>
                    <option>complete</option>
                </select>
                <button>Add Task</button>
                {error && <div className='error'>{error}</div>}
                {props.children}
            </form>
        </div>
    ) : null
}
