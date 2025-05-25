import {
    createSlice,
    PayloadAction,
} from '@reduxjs/toolkit';
import { Article, ArticleType } from 'entities/Article';
import { updateArticleById } from 'entities/Article/model/services/updateArticleById/updateArticleById';
import { EditArticleSchema } from 'features/EditArticleForm';

const initialState: EditArticleSchema = {
    isLoading: false,
    data: undefined,
    form: {
        type: [],
    },
    error: undefined,
    readonly: true

};
const EditArticleSlice = createSlice({
    name: 'editArticleForm',
    initialState,
    reducers: {
        updateData: (state, action: PayloadAction<Article>) => {
            const { type, ...rest } = action.payload;
            state.form = {
                ...state.form,
                ...action.payload,
            };
        },
        setReadonly: (state, action: PayloadAction<boolean>) => {
            state.readonly = action.payload
        },
        cancelEdit: (state, action: PayloadAction<Article>) => {
            state.form = action.payload
            state.readonly = true
        },
        setType: (state, action: PayloadAction<ArticleType>) => {

            if (state.form && state.form.type) {
                if (state.form.type.includes(action.payload)) {
                    state.form.type = state.form.type.filter(t => t !== action.payload);
                    return;
                }
            }

            if (state.form && state.form.type) {
                if (!state.form.type.includes(action.payload)) {
                    state.form.type = [...state.form.type, action.payload];
                }
            }
        },
        saveData: (state, action) => {
            state.form = action.payload
            state.readonly = true
        }
    },

    extraReducers: (builder) => {
        builder
            .addCase(updateArticleById.pending, (state) => {
                state.isLoading = true;
                state.error = undefined
            })
            .addCase(updateArticleById.fulfilled, (state, action: PayloadAction<Article>) => {
                state.isLoading = false;
                state.data = action.payload;
                state.form = action.payload;

            })
            .addCase(updateArticleById.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload
            })
    },
});

export const { reducer: EditArticleReducer } = EditArticleSlice;
export const { actions: EditArticleActions } = EditArticleSlice;
