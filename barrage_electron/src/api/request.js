import axios from 'axios';

const requests = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 10000
})
requests.interceptors.response.use(config => {
  return config;
})
requests.interceptors.request.use(config => {
  return config;
})
export default requests;
