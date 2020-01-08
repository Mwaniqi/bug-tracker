import React, {useContext } from 'react'
import {BugContext} from '../components/BugContext'

export function useFormValidation(initialState, validate) {
  // consume bugs array state from Context
  const [bugs, setBugs] = useContext(BugContext)
  // custom state hooks
  const [values, setValues] = React.useState(initialState)
  const [errors, setErrors] = React.useState({})
  const [submitting, setSubmitting] = React.useState(false)

  // check for errors upon change in errors state
  // React.useEffect(() => {
  //   if(submitting) {
  //     const noErrors = Object.keys(errors).length === 0
  //     if (noErrors) {
  //       console.log('no errors')
  //       setSubmitting(false)
  //     } else {
  //       console.log('errors in validation')
  //       setSubmitting(false)        
  //     }
  //   }
  // }, [errors])

  const handleChange = (e) => {
    setValues({...values, [e.target.name]: e.target.value})
  }

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
    console.log('adding...', data)

    if(response.status !== 200) throw ('error: ', data.error)
    // update bugs array with db data, triggers bugs list rerender
    setBugs(prevBugs => [...prevBugs, data])
    // clear textarea by resetting bug state
    setValues(initialState)
  }

  return {values, errors, submitting, handleChange, handleSubmit}
}

export function validate(values) {
  let errors = {}

  if(!values.summary) {
    errors.summary = 'Summary required'
  }

  if(!values.description) {
    errors.description = 'Description required'
  }

  if(!values.email) {
    errors.email = 'email required'
  }

  if(!values.password) {
    errors.password = 'password required'
  }

  if(!values.passwordConfirm) {
    errors.passwordConfirm = 'confirm password'
  }

  return errors
}
