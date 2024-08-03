import { configureStore, ReducersMapObject } from '@reduxjs/toolkit';
import { loginReducer } from 'features';
import { counterReducer } from 'entities/Counter/index';
import { userReducer } from 'entities/User/index';
import { StateSchema } from './StateSchema';

export const store = createReduxStore();
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export function createReduxStore(initialState?: StateSchema) {
    const rootReducers: ReducersMapObject<StateSchema> = {
        counter: counterReducer,
        user: userReducer,
        loginForm: loginReducer,
    };

    return configureStore<StateSchema>({
        reducer: rootReducers,
        devTools: __IS_DEV__,
        preloadedState: initialState,
    });
}

// // Infer the `RootState` and ` AppDispatch` types from the store itself
// export type RootState = ReturnType<typeof store.getState>
// // Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
// export type AppDispatch = typeof store.dispatch
