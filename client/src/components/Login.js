import React, { useState }  from 'react'
import {Link} from 'react-router-dom'
import { Grid, Form, Button, Input, Header, Divider, Message } from 'semantic-ui-react'
import { useFormValidation } from '../shared/formValidation'

function Login() {
  const INITIAL_STATE = {username: '', password: ''}
  // eslint-disable-next-line
  const { handleChange, handleBlur, values, setValues, validate, errors, setErrors } = useFormValidation(INITIAL_STATE)
  const [message, setMessage] = useState({})

  const handleLogin = async (e) => {
    e.preventDefault()
    const validationErrors = validate(values)
    setErrors(validationErrors)

    // post user data to db
    const response = await fetch('http://localhost:5000/users/login', {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values)
    })

    const res = await response.json()
    if(response.status === 400 || response.status === 401) {
      // eslint-disable-next-line
      setMessage({['err']: res.errmsg})
    } else if(response.status !== 200) {
      setMessage('fail')
    } else {
      setValues(INITIAL_STATE)
      setMessage({})
    }
  }
  
  return(
  <Grid padded centered>
    <Grid.Column as='section' className='form-width'>
    <div className='b-shadow pad'>
      {message==='fail' && <Message visible error content='Login failed!'/>}
      {message.err && <Message visible error content={message.err} />}
      <Header as='h3' textAlign='center' block>Login</Header>
      <Form onSubmit={handleLogin}>
        <Form.Field 
          value={values.username || ''} label='Username'
          placeholder='username' name='username'
          control={Input} onChange={handleChange} onBlur={handleBlur}
          className={ errors.username && 'error'} />
        <Form.Field 
          value={values.password || ''} label='Password'
          placeholder='password...' name='password' type='password'
          control={Input} onChange={handleChange} onBlur={handleBlur}
          className={ errors.password && 'error'} />
        <Button fluid color='blue' content='login' />
      </Form>
      <Divider></Divider>
      <p>Not registered? <Link to="/register">register</Link></p>
    </div>
    </Grid.Column>      
  </Grid> 
  )
}

export default Login