import { StateSchema } from 'app/providers/StoreProvider';

export const getArticleRecomendationIsLoading = (state: StateSchema) => state.articleDetailsPage?.recommendations.isLoading;
export const getArticleRecomendationError = (state: StateSchema) => state.articleDetailsPage?.recommendations.error;
