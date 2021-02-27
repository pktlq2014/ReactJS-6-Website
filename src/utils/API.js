import axios from 'axios';
import * as constantsAPI from './../constants/api';
export default function API(endpoint, method = 'GET', body) {
    return axios({
        method: method,
        url: `https://602e4adb4410730017c5060c.mockapi.io/${endpoint}`,
        data: body
    }).catch(err => {
        console.log(err);
    })
}