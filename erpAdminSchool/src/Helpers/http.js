import axios from 'axios';
import {API_URL} from '../Constants'


const httpInstance = axios.create({
    baseURL: API_URL,
  });
  
  httpInstance.interceptors.request.use(
    config => {
         return config
    },
    error => Promise.reject(error)
  );
  
  export default httpInstance;
  