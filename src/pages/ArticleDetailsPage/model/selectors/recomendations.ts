import { StateSchema } from 'app/providers/StoreProvider';

export const getArticleRecomendationIsLoading = (state: StateSchema) => state.articleDetailsRecomendation?.isLoading;
export const getArticleRecomendationError = (state: StateSchema) => state.articleDetailsRecomendation?.error;
