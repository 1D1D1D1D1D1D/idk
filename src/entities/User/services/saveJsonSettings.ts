import { createAsyncThunk } from "@reduxjs/toolkit";
import { JsonSettings } from "../model/types/jsonSetting";
import { ThunkConfig } from "app/providers/StoreProvider";
import { getUserAuthData } from "../model/selectors/getUserAuthData/getUserAuthData";
import { getJsonSettings } from "../model/selectors/jsonSettingsSelector";
import { setJsonSettingsMutation } from "../api/userApi";

export const saveJsonSettings = createAsyncThunk<
    JsonSettings,
    JsonSettings,
    ThunkConfig<string>
>('user/saveJsonSettings', async (newJsonSettings, thunkApi) => {
    const { rejectWithValue, getState, dispatch } = thunkApi;
    const userData = getUserAuthData(getState())
    const currentSettings = getJsonSettings(getState())

    if (!userData) {
        return rejectWithValue('User is not authenticated');

    }
    try {
        const response = await dispatch(setJsonSettingsMutation({
            userId: userData?.id,
            jsonSettings: {
                ...currentSettings,
                ...newJsonSettings
            }
        })).unwrap()
        if (!response.jsonSettings) {
            return rejectWithValue('no response');

        }
        return response.jsonSettings
    } catch (err: any) {
        return rejectWithValue(err.message ?? 'Unknown error');
    }
}) 