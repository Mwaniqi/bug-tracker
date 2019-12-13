import React, { useState } from 'react'

function AddBug() {
  const [bug, setBug] = useState('')

  const handleChange = (e) => {
    const bugInfo = {[e.target.name]: e.target.value}
    setBug(bugInfo)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const response = await fetch('http://localhost:5000/new', {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bug)
    })
    const data = await response.json()

    if(response.status !== 200) throw ('error posting: ', data.error)
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