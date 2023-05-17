import Api from './api'

const UsersServices = {
  register: (params) => Api.post('/users/register', params)
}

export default UsersServices;