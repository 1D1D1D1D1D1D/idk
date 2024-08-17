import { configureStore, ReducersMapObject } from '@reduxjs/toolkit';
import { counterReducer } from 'entities/Counter/index';
import { userReducer } from 'entities/User/index';
import { StateSchema } from './StateSchema';
import { createReducerManager } from './reducerManager';

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch']
export function createReduxStore(initialState?: StateSchema, asyncReducers?: ReducersMapObject<StateSchema>) {
    const rootReducers: ReducersMapObject<StateSchema> = {
        ...asyncReducers,
        counter: counterReducer,
        user: userReducer,
    };
    const reducerManager = createReducerManager(rootReducers);

    const configuredStore = configureStore<StateSchema>({
        reducer: reducerManager.reduce,
        devTools: __IS_DEV__,
        preloadedState: initialState,
    });
    // @ts-ignore

    configuredStore.reducerManager = reducerManager;
    return configuredStore;
}
