import { NavLink, useNavigate } from 'react-router-dom';
import './index.scss';
import { useState } from 'react';
import UsersServices from '../../../services/users';
import { AiOutlineLoading3Quarters } from 'react-icons/ai'

const initialState = {
  name: '',
  email: '',
  password: '',
  confirmPassword: ''
};

const RegisterForm = () => {
  const [fields, setFields] = useState(initialState);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleFieldsChange = event => {
    setFields({
      ...fields,
      [event.currentTarget.name]: event.currentTarget.value
    });
  };

  const handleSubmit = async event => {
    event.preventDefault();
    setError('');
    setIsLoading(true);

    if (fields.password.length < 6) {
      setError('Password must have at least 6 characters');
      setIsLoading(false);
      return;
    }

    if (fields.password !== fields.confirmPassword) {
      setError('Passwords must be identical');
      setIsLoading(false);
      return;
    }

    const emailMatch = fields.email.match(/^\s*([a-zA-Z0-9_.+-]{4,})@([a-zA-Z0-9-]+)\.([a-zA-Z0-9-.]{2,})\s*$/);
    if (!emailMatch) {
      setError('Invalid email format');
      setIsLoading(false);
      return;
    }

    try {
      const email = `${emailMatch[1]}@${emailMatch[2]}.${emailMatch[3]}`;
      await UsersServices.register({ name: fields.name, email, password: fields.password });
      navigate('/login');
    } catch (error) {
      setError("E-mail already registered");
    }

    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Full name:</label>
      <input type="text" name="name" id="name" autoComplete="off" placeholder="Type your name" value={fields.name} required onChange={handleFieldsChange} />
      <label htmlFor="email">Email:</label>
      <input type="email" name="email" id="email" autoComplete="off" placeholder="Type your email" value={fields.email} required onChange={handleFieldsChange} />
      <label htmlFor="password">Password:</label>
      <input type="password" name="password" id="password" autoComplete="off" placeholder="Create a password" value={fields.password} required onChange={handleFieldsChange} />
      <label htmlFor="password">Confirm your password:</label>
      <input type="password" name="confirmPassword" id="confirmPassword" autoComplete="off" placeholder="Confirm your password" value={fields.confirmPassword} required onChange={handleFieldsChange} />
      
      {error && <p style={{ color: 'rgb(255, 0, 0)', margin: '0' }}>{error}</p>}
      
      <div className="btnLoginOrRegister">
        <NavLink to="/login">
          <p className="login text">Login or</p>
        </NavLink>
        <button type="submit" className="register text">{isLoading ? <AiOutlineLoading3Quarters id='iconLoading'/> : "Register"}</button>
      </div>
    </form>
  );
};

export default RegisterForm;