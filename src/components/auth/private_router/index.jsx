import {Route, useNavigate} from 'react-router-dom'

const PrivateRoute = ({element: Component, ...rest}) => {
  const navigate = useNavigate();
  return <Route {...rest} render={props => {
    localStorage.getItem('user') 
    ? <Component {...props} />
    : navigate('/login')
  }} />
}

export default PrivateRoute