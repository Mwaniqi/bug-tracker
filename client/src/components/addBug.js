import React, { useState, useContext } from 'react'
import {BugContext} from '../components/BugContext'
import { useFormValidation } from '../middleware/formValidation'
import { Grid, Form, Button, TextArea, Input, Message } from 'semantic-ui-react'

function AddBug() {
  // consume bugs array state from Context
  // eslint-disable-next-line
  const [bugs, setBugs] = useContext(BugContext)
  const [message, setMessage] = useState(null)
  const INITIAL_STATE = {summary: '', description: ''}
  const { handleChange, handleBlur, values, setValues, errors, setErrors, submitting, validate } = useFormValidation(INITIAL_STATE)

  const handleSubmit = async (e) => {
    e.preventDefault()

    const validationErrors = validate(values)
    setErrors(validationErrors)
    // setSubmitting(true)

    // post data to db
    const response = await fetch('http://localhost:5000/new', {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values)
    })
    const data = await response.json()
    // update bugs array with db data, triggers bugs list rerender
    if(response.status === 200) {
      setMessage(null)
      setBugs(prevBugs => [...prevBugs, data])
      // clear inputs by resetting bug state
      setValues(INITIAL_STATE)
    } 
    if(response.status === 422) setMessage('Check required fields')
  }

  return (
    <Grid.Column as='section' centered='true' width={7}>
    <div className='b-shadow pad'>
      <h3>Add a bug</h3>
      {message && <Message visible error relaxed='true' content={message} />}
      <Form onSubmit={handleSubmit}>
       <Form.Field 
          value={values.summary || ''} label='Summary'
          placeholder='Issue summary' name='summary'
          control={Input} onChange={handleChange} onBlur={handleBlur}
          className={ errors.summary && 'error'} />
        <Form.TextArea 
          value={values.description || ''} label='Description'
          placeholder='Issue description...' name='description'
          control={TextArea} rows='6' onChange={handleChange} onBlur={handleBlur}
          className={ errors.description && 'error'} />
        <Button disabled={submitting} compact color='blue' content='Add' />
      </Form>
    </div>
    </Grid.Column>    
  )
}

export default AddBug