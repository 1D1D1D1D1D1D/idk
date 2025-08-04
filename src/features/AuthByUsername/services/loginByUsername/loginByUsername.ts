import { createAsyncThunk } from '@reduxjs/toolkit';
import { USER_LOCALSTORAGE_KEY } from 'shared/const/localstorage';

import { User, userActions } from 'entities/User';
import { ThunkConfig } from 'app/providers/StoreProvider';

interface LoginByUsernameProps {
    username: string
    password: string
}

export const loginByUsername = createAsyncThunk<User, LoginByUsernameProps, ThunkConfig<string>>(
    'login/loginByUsername',
    async (authData, thunkAPI) => {
        const { extra, dispatch, rejectWithValue } = thunkAPI;

        try {
            const response = await thunkAPI.extra.api.post<User>('/login', authData);

            if (!response.data) {
                throw new Error();
            }

            // localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(response.data));
            thunkAPI.dispatch(userActions.setAuthData(response.data));
            // if (typeof extra.navigate === 'function') {
            //     extra.navigate('/profile');
            // }

            return response.data;
        } catch (e) {
            console.log();
            return thunkAPI.rejectWithValue('Error');
        }
    },
);
