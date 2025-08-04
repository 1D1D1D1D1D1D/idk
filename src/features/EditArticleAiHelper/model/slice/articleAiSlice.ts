import {
    createSlice,
    PayloadAction,
} from '@reduxjs/toolkit';
import { Article, ArticleBlockType, ArticleType } from 'entities/Article';
import { ArticleAiInputSchema } from 'entities/DeepSeek';

const initialState: ArticleAiInputSchema = {
    error: undefined,
    isLoading: false,
    response: '',
    prompt: '',
    version: 0,
    readonly: false,
    result: {
        blocks: []
    },
}

const articleAiSlice = createSlice({
    name: 'editArticleForm',
    initialState,
    reducers: {
        setData: (state, action: PayloadAction<Article>) => {
            state.data = action.payload
        },
        setPrompt: (state, action: PayloadAction<string>) => {
            state.prompt = action.payload
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload
        },
        setReaonly: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload
        },
        setResponse: (state, action) => {
            const updated = (state.response ?? '') + action.payload;
            state.response = updated;

        },
        clear: (state) => {
            state.response = '';
            state.result = { blocks: [] };
        },
        setError: (state, action: PayloadAction<string>) => {
            state.error = action.payload
        },
        setResult: (state, action) => {
            const data = action.payload;
            // console.log(data);

            const parsed = data
                .trim()
                .replace(/^```json\s*/, '')
                .replace(/```$/, '');

            if (parsed) {
                try {
                    let parsedJson = JSON.parse(parsed);
                    state.result = parsedJson
                    // console.log(parsedJson);
                } catch (error) {
                    // console.error("Ошибка парсинга JSON:", error);
                }
            } else {
                // console.log("JSON не найден.");
            }
        },
        setBlocks: (state, action) => {
            state.result?.blocks?.push(action.payload)
        },
    }
});

export const { reducer: articleAiReducer } = articleAiSlice;
export const { actions: articleAiActions } = articleAiSlice;
