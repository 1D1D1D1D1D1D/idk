import { StateSchema } from 'app/providers/StoreProvider';

export const getArticleDetailsData = (state: StateSchema) => state?.articleDetails?.data;
export const getArticleDetailsForm = (state: StateSchema) => state?.editArticleForm?.form;
export const getArticleDetailsIsLoading = (state: StateSchema) => state?.articleDetails?.isLoading;
export const getArticleDetailsError = (state: StateSchema) => state?.articleDetails?.error;
