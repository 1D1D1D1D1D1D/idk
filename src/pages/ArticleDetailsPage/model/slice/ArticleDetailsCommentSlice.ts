import {
    createEntityAdapter,
    createSlice,
    PayloadAction,
} from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers/StoreProvider';
import { Comment } from 'entities/Comment';
import { ArticleDetailsCommentSchema } from '../../../ArticleDetailsPage';
import { fetchCommentByArticleId } from '../services/fetchCommentByArticleId/fetchCommentByArticleId';

const commentsAdapter = createEntityAdapter<Comment, string>({
    selectId: (comment: Comment) => comment.id,
});
export const getArticleComments = commentsAdapter.getSelectors<StateSchema>(
    (state: StateSchema) => state.articleDetailsPage?.comments || commentsAdapter.getInitialState(),
);

const ArticleDetailsCommentSlice = createSlice({
    name: 'ArticleDetailsCommentSlice',
    initialState: commentsAdapter.getInitialState<ArticleDetailsCommentSchema>({
        isLoading: false,
        ids: [],
        error: '',
        entities: {

        },

    }),
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCommentByArticleId.pending, (state) => {
                state.isLoading = true;
                state.error = undefined;
            })
            .addCase(fetchCommentByArticleId.fulfilled, (state, action: PayloadAction<Comment[]>) => {
                state.isLoading = false;
                state.error = undefined;
                commentsAdapter.setAll(state, action.payload);
            })
            .addCase(fetchCommentByArticleId.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { reducer: ArticleDetailsCommentReducer } = ArticleDetailsCommentSlice;
