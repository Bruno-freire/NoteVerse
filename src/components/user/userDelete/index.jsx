import { useNavigate } from 'react-router-dom';
import './index.scss';
import { useState } from 'react';
import UsersServices from '../../../services/users';

function UsersDelete() {
  const [redirectHome, setRedirectHome] = useState(false)
  
  const navigate = useNavigate();
  
  const deleteUser = async () => {
    if(window.confirm('Are you sure wish to delete this account?')){
      await UsersServices.delete()
      setRedirectHome(true)
    }
  }
  
  if(redirectHome){
    return navigate('/')
  }

  return <button onClick={() => deleteUser()}>Delete account</button>
}

export default UsersDelete;