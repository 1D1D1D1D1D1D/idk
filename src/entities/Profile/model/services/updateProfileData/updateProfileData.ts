import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { getProfileForm, Profile } from 'entities/Profile';
import { ValidateProfileErrors } from '../../types/profile';
import { validateForm } from '../validateForm/validateForm';

export const updateProfileData = createAsyncThunk<Profile, void, ThunkConfig<ValidateProfileErrors[]>>(
    'profile/updateProfileData',
    async (_, thunkAPI) => {
        const { extra, rejectWithValue, getState } = thunkAPI;
        const formData = getProfileForm(getState());
        const errors = validateForm(formData);

        if (errors.length) {
            return rejectWithValue(errors);
        }

        try {
            const response = await thunkAPI.extra.api.put<Profile>('/profile', formData);
            if (!response.data) {
                throw new Error();
            }
            return response.data;
        } catch (e) {
            console.log(e);
            return thunkAPI.rejectWithValue(([ValidateProfileErrors.SERVER_ERROR]));
        }
    },
);
