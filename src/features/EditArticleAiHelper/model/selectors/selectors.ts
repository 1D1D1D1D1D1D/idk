import { createSelector } from "@reduxjs/toolkit";
import { StateSchema } from "app/providers/StoreProvider";
import { ArticleBlock } from "entities/Article";
const emptyResult = {};
const emptyBlocks: ArticleBlock[] = []
export const getAiInputPrompt = (state: StateSchema) => state.articleAiInput?.prompt || ''
export const getAiInputIsLoading = (state: StateSchema) => state.articleAiInput?.isLoading || false
export const getAiInputResponse = (state: StateSchema) => state.articleAiInput?.response || ''
// export const getAiInputBlocks = (state: StateSchema) => state.articleAiInput?.result?.blocks || []
export const getAiInputReadonly = (state: StateSchema) => state.articleAiInput?.readonly
export const getAiInputResult = (state: StateSchema) => state.articleAiInput?.result || emptyResult

export const getAiInputBlocks = createSelector(
    (state: StateSchema) => state.articleAiInput?.result?.blocks,
    (blocks) => blocks || emptyBlocks
)
export const AiResponse = createSelector(getAiInputResponse, (response) => {
    return response

})

