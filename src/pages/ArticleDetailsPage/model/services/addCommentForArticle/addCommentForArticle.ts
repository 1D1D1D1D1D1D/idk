import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Comment } from 'entities/Comment';
import { getUserAuthData } from 'entities/User';
import { getArticleDetailsData } from 'entities/Article/model/selectors/articleDetails';

import { fetchCommentByArticleId } from '../fetchCommentByArticleId/fetchCommentByArticleId';

export const addCommentForArticle = createAsyncThunk<Comment, string, ThunkConfig<string>>(
    'articleDetails/addCommentForArticle',
    async (text, thunkAPI) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const {
            extra, rejectWithValue, getState, dispatch,
        } = thunkAPI;
        const userData = getUserAuthData(getState());
        const article = getArticleDetailsData(getState());

        if (!userData || !text || !article) {
            return rejectWithValue('no data');
        }

        try {
            const response = await thunkAPI.extra.api.post<Comment>('/comments', {
                text,
                articleId: article.id,
                userId: userData.id,

            });
            if (!response.data) {
                throw new Error();
            }
            dispatch(fetchCommentByArticleId(article.id));
            return response.data;
        } catch (e) {
            console.log(e);
            return rejectWithValue(e instanceof Error ? e.message : String(e));
        }
    },
);
