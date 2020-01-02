import React from 'react'
import { useFormValidation, validate } from '../middleware/formValidation'
import { Form, Button, TextArea, Input } from 'semantic-ui-react'

function AddBug() {
  const INITIAL_STATE = {summary: '', description: ''}
  const { handleChange, handleSubmit, values, errors, submitting } = useFormValidation(INITIAL_STATE, validate)

  return (
    <article className='b-shadow pad'>
      <h3>Add a bug</h3>
      <Form onSubmit={handleSubmit}>
       <Form.Field 
          value={values.summary || ''} label='Summary'
          placeholder='Issue summary' name='summary'
          control={Input} onChange={handleChange}
          className={ errors.summary && 'error'} />
        <Form.TextArea 
          value={values.description || ''} label='Description'
          placeholder='Issue description...' name='description'
          control={TextArea} rows='6' onChange={handleChange}
          className={ errors.description && 'error'} />
        <Button disabled={submitting} compact color='blue' content='Add' />
      </Form>
      
    </article>    
  )
}

export default AddBug