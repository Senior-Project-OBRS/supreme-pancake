import axios from 'axios';

const Testing_URL = 'http://localhost:3000'; // Testing
const PRODUCTION_URL = 'https://nj-phuyaipu.meteorapp.com/';

export default axios.create({
    baseURL: Testing_URL
});