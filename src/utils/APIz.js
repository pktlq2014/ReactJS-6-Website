import axios from 'axios';
import * as constantsAPI from '../constants/api';
export default function API(endpoint, method = 'GET', body) {
    return axios({
        method: method,
        url: `https://6052d3e1fb49dc00175b8aad.mockapi.io/${endpoint}`,
        data: body
    }).catch(err => {
        console.log(err);
    })
}