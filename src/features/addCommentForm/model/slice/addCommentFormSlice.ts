import {
    createSlice,
    PayloadAction,
} from '@reduxjs/toolkit';
import { AddCommentSchema } from '../types/addCommentForm';

const initialState: AddCommentSchema = {
    error: undefined,
    text: undefined,
};
const AddCommentFormSlice = createSlice({
    name: 'addCommentForm',
    initialState,
    reducers: {
        setText: (state, action: PayloadAction<string>) => {
            state.text = action.payload;
        },
    },
    extraReducers: (builder) => {
        // builder
        //     .addCase(fetchCommentByArticleId.pending, (state) => {
        //         state.isLoading = true;
        //         state.error = undefined;
        //     })
        //     .addCase(fetchCommentByArticleId.fulfilled, (state, action: PayloadAction<Comment[]>) => {
        //         state.isLoading = false;
        //         state.error = undefined;
        //         commentsAdapter.setAll(state, action.payload);
        //     })
        //     .addCase(fetchCommentByArticleId.rejected, (state, action) => {
        //         state.isLoading = false;
        //         state.error = action.payload;
        //     });
    },
});

export const { reducer: AddCommentFormReducer } = AddCommentFormSlice;
export const { actions: AddCommentFormActions } = AddCommentFormSlice;
