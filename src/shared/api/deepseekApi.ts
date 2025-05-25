import axios from 'axios';

export const $api = axios.create({
    baseURL: __DEEPSEEK_API__,

});

