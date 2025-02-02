import axios from 'axios'

const Api = axios.create({baseURL: import.meta.env.VITE_URL_API_BACKEND || "http://localhost:3000"});

export default Api;