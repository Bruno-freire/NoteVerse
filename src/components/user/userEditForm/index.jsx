import { useEffect, useState } from 'react';
import '../index.scss'
import UsersServices from '../../../services/users';

const initial = {
  name: "",
  email: "email"
}

function FormEditUser (props) {
  const [fields, setFields] = useState(initial)
  const [status, setStatus] = useState("");

  const initializeStateUser = async () => {
    setFields({
      name: JSON.parse(localStorage.getItem('user')).name,
      email: JSON.parse(localStorage.getItem('user')).email
    })
  }

  useEffect(() => {
    initializeStateUser()
  }, [])

  const handleFieldsChange = event => {
    setFields({
      ...fields,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

  const handleSubmit = async event => {
    event.preventDefault()
    setStatus('')
    try {
      await UsersServices.update({ email: fields.email, name: fields.name })
      props.setChangeName(true)
      setStatus("success")
    } catch (error) {
      setStatus('error')
    }
  }
  
  return (
    <>
      <div className="card">
        <div className="cardComponent">
          <form onSubmit={handleSubmit}>
            <label htmlFor="name">Full name:</label>
            <input type="text" id='name' required name='name' value={fields.name} className='name' onChange={handleFieldsChange}/>
            <label htmlFor="email">Email:</label>
            <input type="text" id='email' required name='email' value={fields.email} className='email'  onChange={handleFieldsChange}/>
            <button className='submitButton' type='submit'>Update</button>
          </form>
          {status === "success" && <p style={{color: "green", padding: '0'}}>Name and email successfully updated</p>}
          {status === "error" && <p style={{color: "red"}}>Error updating email or password</p>}
        </div>
      </div>
    </>
  )
}

export default FormEditUser;