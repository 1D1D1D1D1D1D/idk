import { createAsyncThunk, GetThunkAPI } from '@reduxjs/toolkit';
// eslint-disable-next-line quotes
import axios from "axios";
import { User, userActions } from 'entities/User';

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

            // localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(response.data));
            // thunkAPI.dispatch(userActions.setAuthData(response.data));

            return response.data;
        } catch (e) {
            console.log(e);
            return thunkAPI.rejectWithValue('error');
        }
    },
);
