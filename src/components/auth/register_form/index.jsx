import { NavLink, useNavigate } from 'react-router-dom'
import './index.scss'
import { useState } from 'react'
import UsersServices from '../../../services/users'

const initialState = {
  name: '', email: '', password: '', confirmPassword: ""
}

const RegisterForm = () => {
    const [fields, setFields] = useState(initialState)
    const [error, setError] = useState("")

    const handleFieldsChange = event => {
      setFields({
        ...fields, [event.currentTarget.name]: event.currentTarget.value
      })
    }
    const navigate = useNavigate()

    const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    if (fields.password.length < 6) {
      setError("Password must have at least 6 characters");
      return;
    }
    if (fields.password !== fields.confirmPassword) {
      setError("Passwords must be identical");
      return;
    }
    try {
      const emailMatch = fields.email.match(/^\s*([a-zA-Z0-9_.+-]{4,})@([a-zA-Z0-9-]+)\.([a-zA-Z0-9-.]{2,})\s*$/);
      if (emailMatch) {
        const email = `${emailMatch[1]}@${emailMatch[2]}.${emailMatch[3]}`;
        await UsersServices.register({ name: fields.name, email, password: fields.password });
        navigate('/login');
      } else {
        setError("Invalid email format");
      }
    } catch (error) {
      setError("Invalid password or email");
    }
  };


    return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Full name:</label>
      <input type="text" name="name" id="name" autoComplete="off" placeholder="Type your name" value={fields.name} required onChange={handleFieldsChange}/>
      <label htmlFor="email">Email:</label>
      <input type="email" name="email" id="email" autoComplete="off" placeholder="Type your e-mail" value={fields.email} required onChange={handleFieldsChange}/>
      <label htmlFor="password">Password:</label>
      <input type="password" name="password" id="password" autoComplete="off" placeholder="Create a password" value={fields.password} required onChange={handleFieldsChange}/>
      <label htmlFor="password">Confirm your password:</label>
      <input type="password" name="confirmPassword" id="confirmPassword" autoComplete="off" placeholder="Confirm your password" value={fields.confirmPassword} required onChange={handleFieldsChange}/>
      {error === "Invalid email format" && <p style={{color: 'rgb(255, 0, 0)', margin: '0'}}>Invalid email format</p>}
      {error === "Passwords must be identical" && <p style={{color: 'rgb(255, 0, 0)', margin: '0'}}>Passwords must be identical</p>}
      {error === "Password must have at least 6 characters" && <p style={{color: 'rgb(255, 0, 0)', margin: '0'}}>Password must have at least 6 characters</p>}
      {error === "Invalid password or email" && <p style={{color: 'rgb(255, 0, 0)', margin: '0'}}>Invalid password or email</p>}
      <div className="btnLoginOrRegister">
        <NavLink to='/login'><p className="login text">Login or</p></NavLink>
        <button type='submit' className="register text">Register</button>
      </div>
    </form>
    )
}

export default RegisterForm;