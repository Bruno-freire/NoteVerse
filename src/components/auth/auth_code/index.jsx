import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import UsersServices from '../../../services/users';
import './index.scss';

const AuthForm = () => {
  const location = useLocation();
  const [user, setUser] = useState({});
  const [successfully, setSuccessfully] = useState(false);
  const [authenticationCode, setAuthenticationCode] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const userLocation = location.state;
    if (!userLocation || !userLocation.email) {
      return navigate('/register');
    }
    setUser(userLocation);
  }, [location.state, navigate]);

  const handleAuthenticationCodeChange = (event) => {
    const value = event.target.value;
    // Verifica se o valor contém apenas números (expressão regular /^[0-9]+$/)
    if (/^[0-9]*$/.test(value) || value === '') {
      setAuthenticationCode(value);
      setError('');
    } else {
      setError('Invalid code');
    }
  };

  const handlePaste = (event) => {
    const pastedText = event.clipboardData.getData('text/plain');
    const numericText = pastedText.replace(/[^\d]/g, '');
    if(numericText.length > 6){
      setError('The code has to be less than 6 digits')
      return
    }

    if (/^[0-9]*$/.test(numericText)) {
      setAuthenticationCode(numericText);
      setError('');
    } else {
      setError('Invalid code');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    try {
      setIsLoading(true);
      await UsersServices.authenticationVerifyCode({
        authenticationCode: Number(authenticationCode),
        email: user.email.toLowerCase(),
      });
      setIsLoading(false);
      setSuccessfully(true);
      setTimeout(() => {
        navigate('/login');
      }, 1000);
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="code">
        <p style={{ wordWrap: 'break-word', color: 'black' }}>
          informe o código enviado para o email: {user.email}
        </p>
      </label>
      <input
        type="text"
        name="code"
        id="code"
        autoComplete="off"
        placeholder="ex: 123456"
        value={authenticationCode}
        required
        onInput={handleAuthenticationCodeChange}
        onPaste={handlePaste}
        maxLength={6}
      />
      {error && <p style={{ margin: 0 }}>{error}</p>}
      {isLoading ? (
        <AiOutlineLoading3Quarters style={{ margin: '0% 50%' }} id="iconLoading" />
      ) : successfully ? (
        <button type="submit" className="register success">
          Confirmed code
        </button>
      ) : (
        <button type="submit" className="register text">
          To send
        </button>
      )}
    </form>
  );
};

export default AuthForm;
