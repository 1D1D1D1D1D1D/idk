import { StateSchema } from "app/providers/StoreProvider";

export const getArticlesData = (state: StateSchema) => state.mainPage?.data
export const getArticlesIsloading = (state: StateSchema) => state.mainPage?.isLoading
export const getArticlesRecommendations = (state: StateSchema) => state.mainPage?.recommendations
export const getArticlesRecent = (state: StateSchema) => state.mainPage?.recent
