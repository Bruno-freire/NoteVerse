import './index.scss'

const RegisterForm = () => {
    return (<form>
      <label htmlFor="name">Name:</label>
      <input type="text" name="name" id="name" />
      <label htmlFor="email">Email:</label>
      <input type="text" name="email" id="email"/>
      <label htmlFor="password">password:</label>
      <input type="password" name="password" id="password"/>
    </form>
    )
}

export default RegisterForm