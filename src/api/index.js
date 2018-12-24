import axios from 'axios';
const request = axios.create({
  timeout: 5000,
  baseURL: ''
})

// export const getNav = () => request.get('/api/getnav')