import { configureStore, ReducersMapObject } from '@reduxjs/toolkit';
import { counterReducer } from 'entities/Counter/index';
import { userReducer } from 'entities/User/index';
import { loginReducer } from 'features/AuthByUsername/model/slice/loginSlice';
import { StateSchema } from './StateSchema';
import { createReducerManager } from './reducerManager';

export const store = createReduxStore();
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export function createReduxStore(initialState?: StateSchema) {
    const rootReducers: ReducersMapObject<StateSchema> = {
        counter: counterReducer,
        user: userReducer,
        loginForm: loginReducer,
    };

    const reducerManager = createReducerManager(rootReducers);
    const configuredStore = configureStore<StateSchema>({
        // вместо rootreducers передать надо reducerManager: reduce   code splitting redux
        // Create a store with the root reducer function being the one exposed by the manager.
        // const store = createStore(reducerManager.reduce, initialState)
        reducer: reducerManager.reduce,
        devTools: __IS_DEV__,
        preloadedState: initialState,
    });
    // @ts-ignore
    configuredStore.reducerManager = reducerManager;
    return configuredStore;
}
