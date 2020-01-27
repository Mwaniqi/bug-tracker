import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import { Grid, Form, Button, Input, Message, Header, Divider } from 'semantic-ui-react'
import { useFormValidation, validate } from '../middleware/formValidation'

function Register() {
  const INITIAL_STATE = {password: '', confirmPassword: ''}
  const { handleChange, values, setValues } = useFormValidation(INITIAL_STATE, validate)
  const [errors, setErrors] = React.useState({})
  const [message, setMessage] = useState({})

  const handleRegister = async (e) => {
    e.preventDefault()
    const validationErrors = validate(values)
    setErrors(validationErrors)

    // post user data to db
    const response = await fetch('http://localhost:5000/users/register', {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values)
    })

    const res = await response.json()
    if(response.status === 500) {
      setMessage({['dup']: res.errmsg})
    } else if(response.status !== 200) {
      setMessage('fail')
    } else {
      setValues(INITIAL_STATE)
    }
  }

  return( 
  <Grid padded centered>
    <Grid.Column as='section' className='form-width'>
    <div className='b-shadow pad'>
      {message==='fail' && <Message visible error content='Registration failed!'/>}
      {message.dup && <Message visible error content={message.dup} />}
      <Header as='h3' textAlign='center' block>Register</Header>
      <Form onSubmit={handleRegister}>
        <Form.Field 
          value={values.username || ''} label='Username'
          placeholder='username' name='username'
          control={Input} onChange={(e) => handleChange(e)}
          className={ errors.username && 'error'} />
        <Form.Field 
          value={values.password || ''} label='Password'
          placeholder='password...' name='password' type='password'
          control={Input} onChange={handleChange}
          className={ errors.password && 'error'} />
        <Form.Field 
          value={values.confirmPassword || ''} label='Confirm password'
          placeholder='confirm password...' name='confirmPassword'
          type='password' control={Input} onChange={(e) => handleChange(e)}
          className={ errors.confirmPassword && 'error'} />
        <Button fluid color='blue' content='register' />
      </Form>
      <Divider></Divider>
      <p>Already registered? <Link to="/login">login</Link></p>    
    </div>
    </Grid.Column>      
  </Grid> 
  )
}

export default Register