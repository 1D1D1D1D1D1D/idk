import { createAsyncThunk, GetThunkAPI } from '@reduxjs/toolkit';
// eslint-disable-next-line quotes
import axios from "axios";
import { USER_LOCALSTORAGE_KEY } from 'shared/const/localstorage';
import i18n from 'shared/config/i18n/i18n';
import { User, userActions } from 'entities/User/index';

interface LoginByUsernameProps {
    username: string
    password: string
}

export const loginByUsername = createAsyncThunk<User, LoginByUsernameProps, { rejectValue: string,} >(
    'login/loginByUsername',
    async (authData: LoginByUsernameProps, thunkAPI: GetThunkAPI<{rejectValue: string}>) => {
        try {
            const response = await axios.post<User>('http://localhost:8000/login', authData);

            if (!response.data) {
                throw new Error();
            }

            localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(response.data));
            thunkAPI.dispatch(userActions.setAuthData(response.data));

            return response.data;
        } catch (e) {
            console.log(e);
            return thunkAPI.rejectWithValue(i18n.t('Неверный логин или пароль'));
        }
    },
);
