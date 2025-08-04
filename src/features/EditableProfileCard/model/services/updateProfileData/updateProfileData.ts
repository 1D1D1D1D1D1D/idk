import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Profile } from 'entities/Profile';
import { validateForm } from '../validateForm/validateForm';
import { getProfileForm } from '../../selectors/getProfileForm/getProfileForm';
import { ValidateProfileErrors } from '../../consts/consts';

export const updateProfileData = createAsyncThunk<Profile, void, ThunkConfig<ValidateProfileErrors[]>>(
    'profile/updateProfileData',
    async (_, thunkAPI) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { extra, rejectWithValue, getState } = thunkAPI;
        const formData = getProfileForm(getState());
        const errors = validateForm(formData);

        if (errors.length) {
            return rejectWithValue(errors);
        }

        try {
            const response = await thunkAPI.extra.api.put<Profile>(`/profile/${formData?.id}`, formData);
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
