import { NavLink, useNavigate } from 'react-router-dom'
import './index.scss'
import { useState, useEffect } from 'react'
import UsersServices from '../../../services/users'

const initialState = {
  email: '',
  password: ''
}

const LoginForm = () => {
  const [fields, setFields] = useState(initialState)
  const [redirectToNotes, setRedirectToNotes] = useState(false)
  const [error, setError] = useState(false)
  const navigate = useNavigate()

  const handleFieldsChange = event => {
    setFields({
      ...fields,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

  const handleSubmit = async event => {
    event.preventDefault()
    try {
      await UsersServices.login({ email: fields.email, password: fields.password })
      setRedirectToNotes(true)
    } catch (error) {
      setError(true)
    }
  }

  useEffect(() => {
    if (redirectToNotes) {
      navigate('/notes')
    }
  }, [redirectToNotes])

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">Email:</label>
      <input type="text" name="email" id="email" autoComplete="off" placeholder="Type your email" value={fields.email} required onChange={handleFieldsChange} />
      <label htmlFor="password">Password:</label>
      <input type="password" name="password" id="password" autoComplete="off" placeholder="Type your password" value={fields.password} required onChange={handleFieldsChange} />
      {error && <p style={{ color: 'rgb(255, 0, 0)', margin: '0' }}>Invalid password or email</p>}
      <div className="btnLoginOrRegister">
        <NavLink to="/register" className="registerForm">
          <p>Register or</p>
        </NavLink>
        <button type="submit" className="loginForm">
          Login
        </button>
      </div>
    </form>
  )
}

export default LoginForm;
