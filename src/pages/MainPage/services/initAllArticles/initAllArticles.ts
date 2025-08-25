import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "app/providers/StoreProvider";
import { Article } from "entities/Article";


export const initAllArticles = createAsyncThunk<Article[], void, ThunkConfig<string>>(
    'mainPage/initAllArticles',
    async (articles, thunkApi) => {

        const { extra, rejectWithValue, getState } = thunkApi;
        try {
            const response = await extra.api.get<Article[]>('/articles')


            console.log(response.data);

            return response.data
        } catch (error) {
            return rejectWithValue('error');
        }
    }


)