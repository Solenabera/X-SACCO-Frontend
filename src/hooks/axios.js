import axios from 'axios';
import { API_URL } from '../Config/config';

const baseURL = API_URL;

if (!baseURL) {
    alert('SERVER NOT FOUND, CONTACT SYSTEM ADMINS');
    throw new Error('SERVER NOT FOUND, CONTACT SYSTEM ADMINS');
}

export default axios.create({
    baseURL,
});