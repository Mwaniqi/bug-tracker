import React, { useState } from 'react'

export function useFormValidation(initialState) { 
  // custom state hooks
  const [values, setValues] = useState(initialState)
  const [errors, setErrors] = useState({})
  // eslint-disable-next-line
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
  const validate = (values) => {
    let field = Object.keys(values)

    for(field in values) {
      if(!values[field]) {
        console.log(`${field} required`)
        errors[field] = `${field} required`
      }
    }
    return errors
  }

  const handleBlur = () => {
    const validationErrors = validate(values);
    setErrors(validationErrors);
  }

  const handleChange = (e) => {
    if (errors[e.target.name]) delete errors[e.target.name]

    setValues({...values, [e.target.name]: e.target.value})
    console.log(values)
    console.log('errors..', errors)
  }
  return {values, setValues, submitting, handleChange, handleBlur, errors, setErrors, validate}
}