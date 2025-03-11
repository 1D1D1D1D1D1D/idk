import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Profile } from 'entities/Profile';

export const fetchProfileData = createAsyncThunk<Profile, string, ThunkConfig<string>>(
    'profile/fetchProfileData',
    async (userId, thunkAPI) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { extra, rejectWithValue } = thunkAPI;
        try {
            const response = await thunkAPI.extra.api.get<Profile>(`/profile/${userId}`);
            if (!response.data) {
                throw new Error();
            }
            return response.data;
        } catch (e) {
            console.log(e);
            return thunkAPI.rejectWithValue(('error'));
        }
    },
);
