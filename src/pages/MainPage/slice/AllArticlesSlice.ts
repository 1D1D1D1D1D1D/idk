import { createSlice } from "@reduxjs/toolkit";
import { initAllArticles } from "../services/initAllArticles/initAllArticles";
import { AllArticlesSchema } from "../types/AllArticlesSchema";


const initialState: AllArticlesSchema = {

    data: [],
    articles: [],
    error: '',
    isLoading: false
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
                    for (let article of articles) {
                        if (state.data) {
                            state.data.push({
                                id: article.id,
                                title: article.title,
                                imgUrl: article.img
                            })
                        }



                    }
                }
                console.log(state.data?.length);

            })
            .addCase(initAllArticles.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload
            })
    }

})

export const { reducer: AllArticlesSliceReducer } = AllArticlesSlice
export const { actions: AllArticlesSliceActions } = AllArticlesSlice