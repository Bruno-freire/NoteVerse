import { NavLink, useNavigate } from 'react-router-dom'
import './index.scss'
import { useState, useEffect } from 'react'
import UsersServices from '../../../services/users'
import { AiOutlineLoading3Quarters, AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'

const initialState = {
  email: '',
  password: ''
}


const LoginForm = () => {
  const [fields, setFields] = useState(initialState)
  const [redirectToNotes, setRedirectToNotes] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingWithoutAccount, setIsLoadingWithoutAccount] = useState(false)
  const [view, setView] = useState(false)
  const navigate = useNavigate()

  const handleView = () => {
    if(view){
      setView(false)
    }else{
      setView(true)
    }
  }

  const generateRandomCode = (length) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
  }

  const handleLoginWithoutAccount = async () => {
    const randomCode = generateRandomCode(10)
    setIsLoadingWithoutAccount(true)
    await UsersServices.loginWithoutAccount(randomCode)
    setIsLoadingWithoutAccount(false)
    navigate('/notes')
  }

  const handleFieldsChange = event => {
    setFields({
      ...fields,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

  const handleSubmit = async event => {
    event.preventDefault()
    setError("")
    try {
      setIsLoading(true)
      await UsersServices.login({ email: fields.email, password: fields.password })
      setIsLoading(false)
      setRedirectToNotes(true)
    } catch (error) {
      setError(error.response.data.error)
      setIsLoading(false)
      if(error.response.data.error === 'unauthenticated email'){
        await UsersServices.authenticationSendCode({email: fields.email})
        navigate('/auth/code', {state: {email: fields.email}})
      }
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
      <input type={view ? 'text' : "password"} name="password" id="password" autoComplete="off" placeholder="Type your password" value={fields.password} required onChange={handleFieldsChange} />
      <span id='view'>{view ? <AiFillEye className='AiFillEyes' onClick={handleView}/> : <AiFillEyeInvisible className='AiFillEyes' onClick={handleView}/>}</span>
      {error && <p style={{ color: 'rgb(255, 0, 0)', margin: '0' }}>{error}</p>}
      {isLoadingWithoutAccount ? <AiOutlineLoading3Quarters className='iconLoadingWithoutAccount' id='iconLoading'/> : <button className='loginWithoutAccount' type='button' onClick={handleLoginWithoutAccount} >Sign in to the application without creating an account</button>}
      <div className="btnLoginOrRegister">
        <NavLink to="/register" className="registerForm">
          <p>Register or</p>
        </NavLink>
        <button type="submit" className="loginForm">
          {isLoading ? <AiOutlineLoading3Quarters id='iconLoading'/> : "Login"}
        </button>
      </div>
    </form>
  )
}

export default LoginForm;
