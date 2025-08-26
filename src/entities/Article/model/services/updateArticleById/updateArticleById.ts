import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Article } from '../../types/article';
import { getArticleDetailsData, getArticleDetailsForm } from '../../selectors/articleDetails';

export const updateArticleById = createAsyncThunk<Article, void, ThunkConfig<string>>(
    'articleDetails/updateArticleById',
    async (articleId, thunkAPI) => {
        const { extra, rejectWithValue, getState } = thunkAPI;
        const formData = getArticleDetailsForm(getState())
        const data = getArticleDetailsData(getState())

        console.log(formData);

        try {
            const response = await thunkAPI.extra.api.patch<Article>(`/articles/${data?.id}`, formData);
            if (!response.data) {
                throw new Error();
            }

            return response.data;
        } catch (e) {
            return rejectWithValue(e instanceof Error ? e.message : String(e));
        }
    },
);
