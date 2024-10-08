import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Comment } from 'entities/Comment';

export const fetchCommentByArticleId = createAsyncThunk<Comment[], string | undefined, ThunkConfig<string>>(
    'articleDetailsPage/fetchCommentByArticleId',
    async (articleId, thunkAPI) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { extra, rejectWithValue } = thunkAPI;
        if (!articleId) {
            return rejectWithValue('no id');
        }
        try {
            const response = await thunkAPI.extra.api.get<Comment[]>('/comments/', {
                params: {
                    articleId,
                    _expand: 'user',
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
