import {
    Action, EnhancedStore, Reducer, ReducersMapObject,
} from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { ArticleDetailsSchema } from 'entities/Article';
import { CounterSchema } from 'entities/Counter';
import { UserSchema } from 'entities/User';
import { ProfileSchema } from 'features/EditableProfileCard';
import { AddCommentSchema } from 'features/addCommentForm';
import { LoginSchema } from 'features/AuthByUsername/model/types/loginSchema';
import { ArticleDetailsPageSchema } from 'pages/ArticleDetailsPage';
import { ArticlesPageSchema } from 'pages/ArticlePage';
import { rtkApi } from 'shared/api/rtkApi';
import { ScrollPositionSchema } from 'widgets/Page/features/ScrollPosition';
import { EditArticleSchema } from 'features/EditArticleForm';
import { ArticleAiInputSchema } from 'entities/DeepSeek';

export interface StateSchema {
    counter: CounterSchema;
    user: UserSchema;
    scrollPosition: ScrollPositionSchema;
    [rtkApi.reducerPath]: ReturnType<typeof rtkApi.reducer>
    loginForm: LoginSchema | undefined
    profile: ProfileSchema | undefined
    articleDetails: ArticleDetailsSchema | undefined
    articleDetailsPage: ArticleDetailsPageSchema | undefined
    addCommentForm: AddCommentSchema | undefined
    articlesPage: ArticlesPageSchema | undefined
    editArticleForm: EditArticleSchema | undefined
    articleAiInput: ArticleAiInputSchema | undefined
}

export type StateSchemaKey = keyof StateSchema
export type MountedReducers = OptionalRecord<StateSchemaKey, boolean>
export interface ReducerManager {
    getReducerMap: () => ReducersMapObject<StateSchema>
    reduce: (state: StateSchema, action: Action) => StateSchema
    add: (key: StateSchemaKey, reducer: Reducer) => void
    remove: (key: StateSchemaKey) => void
    getMountedReducers: () => MountedReducers
}
export interface ReduxStoreWithManager extends EnhancedStore<StateSchema> {
    reducerManager: ReducerManager;
}

export interface ThunkExtraArg {
    api: AxiosInstance
    // navigate?: ReturnType<typeof useNavigate>,
}

export interface ThunkConfig<T> {
    rejectValue: T,
    extra: ThunkExtraArg
    state: StateSchema
}
