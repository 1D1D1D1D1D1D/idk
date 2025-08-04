import {
    createEntityAdapter,
    createSlice,
    PayloadAction,
} from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers/StoreProvider';
import { Article } from 'entities/Article';
import { ArticleDetailsRecomentationSchema } from '../types/ArticleDetailsRecomendationSchema';
import { fetchArticleRecomendations } from '../services/fetchArticleRecomendations/fetchArticleRecomendations';

const recomendationAdapter = createEntityAdapter<Article, string>({
    selectId: (article: Article) => article.id || '',
});
export const getArticleRecomendation = recomendationAdapter.getSelectors<StateSchema>(
    (state: StateSchema) => state.articleDetailsPage?.recommendations || recomendationAdapter.getInitialState(),
);

const ArticleDetailsRecomendationSlice = createSlice({
    name: 'ArticleDetailsCommentSlice',
    initialState: recomendationAdapter.getInitialState<ArticleDetailsRecomentationSchema>({
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
            .addCase(fetchArticleRecomendations.pending, (state) => {
                state.isLoading = true;
                state.error = undefined;
            })
            .addCase(fetchArticleRecomendations.fulfilled, (state, action: PayloadAction<Article[]>) => {
                state.isLoading = false;
                state.error = undefined;
                recomendationAdapter.setAll(state, action.payload);
            })
            .addCase(fetchArticleRecomendations.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { reducer: ArticleDetailsRecomendationtReducer } = ArticleDetailsRecomendationSlice;
