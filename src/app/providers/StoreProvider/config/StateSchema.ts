import {
    Action, EnhancedStore, Reducer, ReducersMapObject,
} from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { ArticleDetailsSchema } from 'entities/Article';
import { CounterSchema } from 'entities/Counter';
import { ProfileSchema } from 'entities/Profile';
import { UserSchema } from 'entities/User';
import { LoginSchema } from 'features';
import { AddCommentSchema } from 'features/addCommentForm';
import { ArticleDetailsCommentSchema } from 'pages/ArticleDetailsPage/model/types/ArticleDetailsCommentSchema';
import { ArticlesPageSchema } from 'pages/ArticlePage';
import { ScrollPositionSchema } from 'widgets/Page/features/ScrollPosition';

export interface StateSchema {
    counter: CounterSchema;
    user: UserSchema;
    scrollPosition: ScrollPositionSchema;

    loginForm: LoginSchema | undefined
    profile: ProfileSchema | undefined
    articleDetails: ArticleDetailsSchema | undefined
    articleDetailsComments: ArticleDetailsCommentSchema | undefined
    addCommentForm: AddCommentSchema | undefined
    articlesPage: ArticlesPageSchema | undefined
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
