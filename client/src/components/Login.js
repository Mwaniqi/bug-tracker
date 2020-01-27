import React from 'react'
import {Link} from 'react-router-dom'
import { Grid, Form, Button, Input, Header, Divider } from 'semantic-ui-react'
import { useFormValidation, validate } from '../middleware/formValidation'

function Login() {
  const INITIAL_STATE = {email: '', password: '', confirmPassword: ''}
  const { handleChange, values, errors } = useFormValidation(INITIAL_STATE, validate)
  
  return(
  <Grid padded centered>
    <Grid.Column as='section' className='form-width'>
    <div className='b-shadow pad'>
      <Header as='h3' textAlign='center' block>Login</Header>
      <Form >
        <Form.Field 
          value={values.email || ''} label='Username'
          placeholder='email' name='username'
          control={Input} onChange={handleChange}
          className={ errors.email && 'error'} />
        <Form.Field 
          value={values.password || ''} label='Password'
          placeholder='password...' name='password' type='password'
          control={Input} onChange={handleChange}
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