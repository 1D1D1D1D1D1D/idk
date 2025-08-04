import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { USER_LOCALSTORAGE_KEY } from 'shared/const/localstorage';
import { User, UserSchema } from '../../../User';
import { setFeatureFlags } from 'shared/lib/features';
import { saveJsonSettings } from 'entities/User/services/saveJsonSettings';
import { JsonSettings } from '../types/jsonSetting';
import { initAuthData } from 'entities/User/services/initAuthData';

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
            localStorage.setItem(USER_LOCALSTORAGE_KEY, action.payload.id);
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
                // localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(state.authData));
            }
        }),
            builder.addCase(initAuthData.pending, (state) => {
                state.isMounted = false
            }),
            builder.addCase(initAuthData.fulfilled, (state, { payload }) => {
                state.authData = payload
                setFeatureFlags(payload.features)
                state.isMounted = true
            }),
            builder.addCase(initAuthData.rejected, (state) => {
                state.isMounted = true

            })
    },
});

export const { actions: userActions } = userSlice;
export const { reducer: userReducer } = userSlice;
