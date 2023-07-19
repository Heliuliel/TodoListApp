import React from 'react'
import { Link } from 'react-router-dom'
export default function Narbar() {
  return (
    <header>
      <div className='container'>
        <Link to='/'>
          <h1>To Do List</h1>
        </Link>
      </div>
    </header>
  )
}
