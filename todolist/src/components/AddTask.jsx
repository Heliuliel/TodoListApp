import React, { useState } from 'react'
import PopupTaskForm from './PopupTaskForm'
export default function AddTask() {
  const [trigger, setTrigger] = useState(false)
  return (
    <div>
      <PopupTaskForm trigger={trigger} setTrigger={setTrigger} />
      <h4
        className='open-popup'
        onClick={() => { setTrigger(true) }}>
        Add new task
        <span className='material-icons'>add</span>
      </h4>
    </div>
  )
}
