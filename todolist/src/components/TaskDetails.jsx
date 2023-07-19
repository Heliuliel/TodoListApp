import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import React from 'react'
import { useTasksContext } from '../hooks/useTasksContext'
export default function Task({ task }) {
  const { dispatch } = useTasksContext()

  const deleteTask = async () => {
    const response = await fetch('/api/tasks/' + task._id, {
      method: 'DELETE'
    })
    const json = await response.json()
    if (response.ok) {
      dispatch({ type: 'DELETE_TASK', payload: json })
    }
  }

  const updateTask = async () => {
    const response = await fetch('/api/tasks/' + task._id, {
      method: 'PATCH',
      body: JSON.stringify({ status: 'complete' }),
      headers: {
        'Content-type': 'application/json',
      }
    })
    if (response.ok) {
      task.status = 'complete'
      dispatch({ type: 'UPDATE_TASK', payload: task })
    }
  }

  return (
    <div className='task-details'>
      <div className='task-content'>
        <h4 className={task.status === 'complete' ? 'done' : ''} >{task.title}</h4>
        <p>{task.comment}</p>
        <p><strong>Ststus: </strong>{task.status}</p>
        <p>{formatDistanceToNow(new Date(task.createdAt), { addSuffix: true })}</p>
      </div>
      <div className='icons'>
        {task.status === 'incomplete' && (
          <i
            className="material-icons"
            id='done'
            onClick={updateTask}>
            done
          </i>
        )}
        <i
          className="material-icons"
          id='delete'
          onClick={deleteTask}>
          delete
        </i>
      </div>
    </div>
  )
}
