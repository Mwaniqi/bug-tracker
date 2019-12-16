import React, { useState, useContext } from 'react'
import {BugContext} from './bugContext'
import { Form, Button, TextArea, Input } from 'semantic-ui-react'

function AddBug() {
  const [bug, setBug] = useState({description: ''})
  // consume bugs array state from Context
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
    console.log('adding...', data)

    if(response.status !== 200) throw ('error: ', data.error)
    // update bugs array with db data, triggers bugs list rerender
    setBugs(prevBugs => [...prevBugs, data])
    // clear textarea by resetting bug state
    setBug({description: ''})
  }

  return (
    <article className='b-shadow pad'>
      <h3>Add a bug</h3>
      <Form onSubmit={handleSubmit}>
       {/* <Form.Field 
          value={bug.summary}
          placeholder='Issue summary' name='summary'
          control={TextArea} onChange={handleChange} /> */}
        <Form.Field 
          value={bug.description} label='Description'
          placeholder='Issue description...' name='description'
          control={TextArea} rows='6' onChange={handleChange} />
        <Button compact color='blue' content='Add' />
      </Form>
      
    </article>    
  )
}

export default AddBug