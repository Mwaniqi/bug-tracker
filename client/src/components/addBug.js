import React, { useState, useContext } from 'react'
import {BugContext} from './bugContext'

function AddBug() {
  const [bug, setBug] = useState('')
  // consume bugs array state
  const [bugs, setBugs] = useContext(BugContext)

  const handleChange = (e) => {
    const bugInfo = {[e.target.name]: e.target.value}
    setBug(bugInfo)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    // post data to db
    const response = await fetch('http://localhost:5000/new', {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bug)
    })
    const data = await response.json()

    if(response.status !== 200) throw ('error: ', data.error)
    // update bugs array with db data, triggers bugs list rerender
    setBugs(prevBugs => [...prevBugs, data])
  }

  return (
    <article className='form-add_bug'>
      <h3>Add a bug</h3>
      <form onSubmit={handleSubmit}>
        <textarea rows='6' cols='25' name='description' placeholder='Describe issue' required
        onChange={handleChange}></textarea>
        <button className='btn-add_bug' type='submit'>Add</button>
      </form>
    </article>    
  )
}

export default AddBug