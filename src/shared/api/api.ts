import axios from 'axios';
import { USER_LOCALSTORAGE_KEY } from 'shared/const/localstorage';

const baseURL = IS_DEV ? 'http://localhost:8000' : 'https://server-kohl-eta.vercel.app';
export const $api = axios.create({
    baseURL,
    headers: {
        authorization: localStorage.getItem(USER_LOCALSTORAGE_KEY) || '',
    },
});
