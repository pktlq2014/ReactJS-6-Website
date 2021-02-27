import axios from 'axios';
import {api} from './../../constants/api';
const axiosIntance = axios.create({
    baseURL : api,
});
export default axiosIntance; 