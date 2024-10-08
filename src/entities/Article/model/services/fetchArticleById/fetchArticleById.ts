import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Article } from '../../types/article';

export const fetchArticleById = createAsyncThunk<Article, string, ThunkConfig<string>>(
    'articleDetails/fetchArticleById',
    async (articleId, thunkAPI) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { extra, rejectWithValue } = thunkAPI;
        try {
            const response = await thunkAPI.extra.api.get<Article>(`/articles/${articleId}`);
            if (!response.data) {
                throw new Error();
            }

            return response.data;
        } catch (e) {
            return rejectWithValue(e instanceof Error ? e.message : String(e));
        }
    },
);
