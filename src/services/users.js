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
    if(localStorage.getItem('tester')){
      localStorage.removeItem('tester', null)
    }
  },
  update: async (params) => {
    await Api.put('/users', params, { headers: {'x-access-token': localStorage.getItem('token')} })
    const userLocal = JSON.parse(localStorage.getItem('user'))
    userLocal.name = params.name
    userLocal.email = params.email
    localStorage.setItem('user', JSON.stringify(userLocal))
  },
  updatePassword: async (params) => {
    await Api.put('/users/password', params, { headers: {'x-access-token': localStorage.getItem('token')} })
  },
  loginWithoutAccount: async (params) => {
    await Api.post('/users/register', {email: `${params}@gmail.com`, password: params, name: "userNull"})
    const response = await Api.post('/users/login', {email: `${params}@gmail.com`, password: params})
    localStorage.setItem('user', JSON.stringify(response.data.user))
    localStorage.setItem('token', response.data.token)
    localStorage.setItem('userNull', "ok")
  },
  authenticationSendCode: async (params) => {
    Api.post('/users/authentication/send-code', params)
  },
  authenticationVerifyCode: async (params) => {
    await Api.post('/users/authentication/verify-code', params)
  }
}

export default UsersServices;