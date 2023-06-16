import { useState } from 'react';
import UsersServices from '../../../services/users';

const initialState = {
  password: '',
  passwordConfirmation: ''
}

function FormEditPasswordUser () {
  const [fields, setFields] = useState(initialState)
  const [status, setStatus] = useState("");

  const handleFieldsChange = event => {
    setFields({
      ...fields,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

  const handleSubmit = async event => {
    event.preventDefault()
    setStatus("")
    if(/^\s*$/.test(fields.password)){
      setStatus("error")
      return
    }
    if(fields.password !== fields.passwordConfirmation){
      setStatus("error_confirmation_password")
      return
    }
    try {
      await UsersServices.updatePassword({ password: fields.password })
      setStatus("success")
    } catch (error) {
      setStatus("error")
    }
  }
  
  return (
    <>
      <div className="card">
        <h2>Personal information</h2>
        <div className="cardComponent">
          <form onSubmit={handleSubmit}>
            <label htmlFor="password">New Password:</label>
            <input type="password" id='password' name='password' required value={fields.password} onChange={handleFieldsChange} className='password'/>
            <label htmlFor="passwordConfirmation">Password Confirmation:</label>
            <input type="password" id='passwordConfirmation' name='passwordConfirmation' required value={fields.passwordConfirmation} onChange={handleFieldsChange} className='passwordConfirmation' />
            <button className='submitButton' type='submit'>Update</button>
          </form>
          {status === "success" && <p style={{color: "green", padding: '0'}}>Password successfully updated</p>}
          {status === "error" && <p style={{color: "red"}}>Error updating password</p>}
          {status === "error_confirmation_password" && <p style={{color: "red"}}>Error updating password confirmation</p>}
        </div>
      </div>
    </>
  )
}

export default FormEditPasswordUser;