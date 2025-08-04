import { createAsyncThunk } from "@reduxjs/toolkit";
import { JsonSettings } from "../model/types/jsonSetting";
import { ThunkConfig } from "app/providers/StoreProvider";
import { getUserAuthData } from "../model/selectors/getUserAuthData/getUserAuthData";
import { getJsonSettings } from "../model/selectors/jsonSettingsSelector";
import { getUserDataByIdQuery, setJsonSettingsMutation } from "../api/userApi";
import { User } from "../model/types/User";
import { USER_LOCALSTORAGE_KEY } from "shared/const/localstorage";

export const initAuthData = createAsyncThunk<
    User,
    void,
    ThunkConfig<string>
>('user/initAuthData', async (newJsonSettings, thunkApi) => {
    const { rejectWithValue, dispatch } = thunkApi;

    const userId = localStorage.getItem(USER_LOCALSTORAGE_KEY)

    if (!userId) {
        return rejectWithValue('User is not authenticated');

    }
    try {
        const response = await dispatch(getUserDataByIdQuery(userId)).unwrap()

        return response
    } catch (err: any) {
        return rejectWithValue(err.message ?? 'Unknown error');
    }
}) 