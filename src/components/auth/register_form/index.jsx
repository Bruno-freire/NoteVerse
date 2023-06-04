import { NavLink, useNavigate } from 'react-router-dom'
import './index.scss'
import { useState } from 'react'
import UsersServices from '../../../services/users'

const initialState = {
  name: '', email: '', password: ''
}

const RegisterForm = () => {
    const [fields, setFields] = useState(initialState)
    const [redirectToLogin, setRedirectToLogin] = useState(false)
    const [error, setError] = useState(false)

    const handleFieldsChange = event => {
      setFields({
        ...fields, [event.currentTarget.name]: event.currentTarget.value
      })
    }
    const navigate = useNavigate()

    const handleSubmit = async (event) => {
      event.preventDefault();
      try {
        const user = await UsersServices.register({name: fields.name, email: fields.email, password: fields.password})
        setRedirectToLogin(true)
      } catch (error) {
        setError(true)
      }
    }

    if(redirectToLogin){
      return navigate('/login')
    }

    return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name:</label>
      <input type="text" name="name" id="name" autocomplete="off" placeholder="Type your name" value={fields.name} required onChange={handleFieldsChange}/>
      <label htmlFor="email">Email:</label>
      <input type="text" name="email" id="email" autocomplete="off" placeholder="Type your e-mail" value={fields.email} required onChange={handleFieldsChange}/>
      <label htmlFor="password">Password:</label>
      <input type="password" name="password" id="password" autocomplete="off" placeholder="Create a password" value={fields.password} required onChange={handleFieldsChange}/>
      {error && <p style={{color: 'rgb(255, 0, 0)', margin: '0'}}>Invalid password or email</p>}
      <div className="btnLoginOrRegister">
        <NavLink to='/login'><p className="login text">Login or</p></NavLink>
        <button type='submit' className="register text">Register</button>
      </div>
    </form>
    )
}

export default RegisterForm