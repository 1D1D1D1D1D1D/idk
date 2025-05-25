import { StateSchema } from "app/providers/StoreProvider";

export const getEditArticleReadonly = (state: StateSchema) => state.editArticleForm?.readonly
export const getArticleTypesForm = (state: StateSchema) => state.editArticleForm?.form?.type || [];
