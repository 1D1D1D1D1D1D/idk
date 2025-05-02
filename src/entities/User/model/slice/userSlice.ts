import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { USER_LOCALSTORAGE_KEY } from 'shared/const/localstorage';
import { User, UserSchema } from '../../../User';
import { setFeatureFlags } from 'shared/lib/features';
import { saveJsonSettings } from 'entities/User/services/saveJsonSettings';
import { JsonSettings } from '../types/jsonSetting';

const initialState: UserSchema = {
    isMounted: false,
};
export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setAuthData: (state, action: PayloadAction<User>) => {
            state.authData = action.payload;
            setFeatureFlags(action.payload.features)
        },
        initAuthData: (state) => {
            const user = localStorage.getItem(USER_LOCALSTORAGE_KEY);
            if (user) {
                const json = JSON.parse(user) as User;
                state.authData = json;
                setFeatureFlags(json.features);
            }
            state.isMounted = true;
        },
        logOut: (state) => {
            localStorage.removeItem(USER_LOCALSTORAGE_KEY);
            state.authData = undefined;
        },

    },
    extraReducers(builder) {
        builder.addCase(saveJsonSettings.fulfilled, (state, action: PayloadAction<JsonSettings>) => {
            if (state.authData) {
                state.authData.jsonSettings = action.payload
                localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(state.authData));
            }
        })
    },
});

export const { actions: userActions } = userSlice;
export const { reducer: userReducer } = userSlice;
