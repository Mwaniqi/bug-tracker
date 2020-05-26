import React, { useState, useContext } from 'react'
import {Link, withRouter} from 'react-router-dom'
import { Grid, Form, Button, Input, Message, Header, Divider } from 'semantic-ui-react'
import { useFormValidation } from '../shared/formValidation'
import { UserContext } from './UserContex'

function Register(props) {
  const INITIAL_STATE = {username: '', password: '', confirmPassword: ''}
  const { handleChange, handleBlur, values, setValues, validate, errors, setErrors } = useFormValidation(INITIAL_STATE)
  const [message, setMessage] = useState({})
  // eslint-disable-next-line 
  const [ user, setUser ] = useContext(UserContext)

  const handleRegister = async (e) => {
    e.preventDefault()
    const validationErrors = validate(values)
    setErrors(validationErrors)

    // post user data to db
    const response = await fetch(process.env.REACT_APP_APIURL+'/users/register', {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values)
    })

    const res = await response.json()
    try {
      if(response.status === 500) {
        // eslint-disable-next-line
        setMessage({['err']: res.errmsg})
      } else if(response.status !== 200) {
        setMessage('fail')
      } else {
        console.log(res)
        setUser(res.username)
        sessionStorage.setItem('token', JSON.stringify(res.token))
        setValues(INITIAL_STATE)
        setMessage({})
        props.history.push('/')
      }      
    } catch (error) {
      console.log(error)
    }
  }
  
  return( 
  <Grid padded centered>
    <Grid.Column as='section' className='form-width'>
    <div className='b-shadow pad'>
      {message==='fail' && <Message visible error content='Registration failed!'/>}
      {message.err && <Message visible error content={message.err} />}
      <Header as='h3' textAlign='center' block>Register</Header>
      <Form onSubmit={handleRegister}>
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
        <Form.Field 
          value={values.confirmPassword || ''} label='Confirm password'
          placeholder='confirm password...' name='confirmPassword'
          type='password' control={Input} onChange={handleChange} onBlur={handleBlur}
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

export default withRouter(Register)