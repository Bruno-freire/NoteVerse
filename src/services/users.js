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
    await Api.delete('/users', { headers: {'x-access-token': localStorage.getItem('token')} })
    localStorage.removeItem('user', null)
    localStorage.removeItem('token', null)
  },
  update: async (params) => {
    await Api.put('/users', params, { headers: {'x-access-token': localStorage.getItem('token')} })
    const userLocal = JSON.parse(localStorage.getItem('user'))
    userLocal.name = params.name
    userLocal.email = params.email
    localStorage.setItem('user', JSON.stringify(userLocal))
  },
  updatePassword: async (params) => {
    const response = await Api.put('/users/password', params, { headers: {'x-access-token': localStorage.getItem('token')} })
  }
}

export default UsersServices;