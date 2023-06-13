import Api from './api'

const UsersServices = {
  register: (params) => Api.post('/users/register', params),
  login: async (params) => {
    const response = await Api.post('/users/login', params)
    localStorage.setItem('user', JSON.stringify(response.data.user))
    localStorage.setItem('token', response.data.token)
  },
  logout: () => {
    localStorage.removeItem('user', null)
    localStorage.removeItem('token', null)
  },
  delete: async () => {
    const response = await Api.delete('/users', {headers: {'x-access-token': localStorage.getItem('token')}})
    localStorage.removeItem('user', null)
    localStorage.removeItem('token', null)
  }
}

export default UsersServices;