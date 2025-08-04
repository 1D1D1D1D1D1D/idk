import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Article } from 'entities/Article';
import { Comment } from 'entities/Comment';

export const fetchArticleRecomendations = createAsyncThunk<Article[], void, ThunkConfig<string>>(
    'articleDetailsPage/fetchArticleRecomendations',
    async (_, thunkAPI) => {
        const { extra, rejectWithValue } = thunkAPI;

        try {
            const response = await thunkAPI.extra.api.get<Article[]>('/articles/', {
                params: {
                    _limit: 4,
                },
            });
            if (!response.data) {
                throw new Error();
            }
            console.log(response);

            return response.data;
        } catch (e) {
            console.log(e);
            return rejectWithValue(e instanceof Error ? e.message : String(e));
        }
    },
);
