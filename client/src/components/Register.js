import React from 'react'
import {Link} from 'react-router-dom'
import { Grid, Form, Button, Input, Message, Header, Divider } from 'semantic-ui-react'
import { useFormValidation, validate } from '../middleware/formValidation'

function Register() {
  const INITIAL_STATE = {email: '', password: '', confirmPassword: ''}
  const { handleChange, values, errors } = useFormValidation(INITIAL_STATE, validate)
  
  return(
  <Grid padded centered='true'>
    <Grid.Column as='section' className='form-width'>
    <div className='b-shadow pad'>
      <Header as='h3' textAlign='center' block>Register</Header>
      <Form >
        <Form.Field 
          value={values.email || ''} label='Email'
          placeholder='email' name='email'
          control={Input} onChange={handleChange}
          className={ errors.email && 'error'} />
        <Form.Field 
          value={values.password || ''} label='Password'
          placeholder='password...' name='password'
          control={Input} onChange={handleChange}
          className={ errors.password && 'error'} />
        <Form.Field 
          value={values.confirmPassword || ''} label='Confirm password'
          placeholder='confirm password...' name='confirmPassword'
          control={Input} onChange={handleChange}
          className={ errors.confirmPassword && 'error'} />
        <Message
          success
          header='Success!'
          content='Registration complete'/>
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