import { createSelector } from "@reduxjs/toolkit";
import { StateSchema } from "app/providers/StoreProvider";
import { Article, ArticleType } from "entities/Article";

const articleType: ArticleType[] = []
export const getEditArticleReadonly = (state: StateSchema) => state.editArticleForm?.readonly
export const getArticleTypesForm = createSelector(
    (state: StateSchema) => state.editArticleForm?.form?.type,
    (type) => type || articleType
)
