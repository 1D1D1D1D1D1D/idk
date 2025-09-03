import { createSlice } from "@reduxjs/toolkit";
import { initAllArticles } from "../services/initAllArticles/initAllArticles";
import { AllArticlesSchema } from "../types/AllArticlesSchema";


const initialState: AllArticlesSchema = {

    data: [],
    articles: [],
    error: '',
    isLoading: false,
    recent: [],
    recommendations: []
}

export const AllArticlesSlice = createSlice({
    name: 'AllArticlesSlice',
    initialState,
    reducers: {
    },

    extraReducers: builder => {
        builder
            .addCase(initAllArticles.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(initAllArticles.fulfilled, (state, action) => {
                state.isLoading = false
                state.articles = action.payload

                if (state.articles) {
                    const articles = state.articles

                    state.data = articles.map(article => ({
                        id: article.id,
                        title: article.title,
                        imgUrl: article.img
                    }))
                    state.recommendations = articles.map(article => ({
                        id: article.id,
                        title: article.title,
                        subtitle: article.subtitle,
                        type: article.type,
                        views: article.views
                    })).slice(0, 5)
                    state.recent = articles.map(article => ({
                        id: article.id,
                        title: article.title,
                        createdAt: article.createdAt,
                        user: article.user
                    })).sort((a, b) => {
                        if (!a.createdAt || !b.createdAt) {
                            return 0;
                        }
                        const dateA = new Date(a.createdAt.split('.').reverse().join('-'));
                        const dateB = new Date(b.createdAt.split('.').reverse().join('-'));
                        return dateB.getTime() - dateA.getTime();
                    }).slice(0, 5)

                }

            })
            .addCase(initAllArticles.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload
            })
    }

})

export const { reducer: AllArticlesSliceReducer } = AllArticlesSlice
export const { actions: AllArticlesSliceActions } = AllArticlesSlice