import axios from 'axios'

const Api = axios.create({baseURL: 'https://apirestfullfornoteverseproject.onrender.com'});

export default Api;