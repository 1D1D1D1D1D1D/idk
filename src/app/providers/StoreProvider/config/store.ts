import { configureStore, Reducer, ReducersMapObject } from '@reduxjs/toolkit';
import { counterReducer } from 'entities/Counter/index';
import { userReducer } from 'entities/User/index';
import { $api } from 'shared/api/api';
import { useNavigate } from 'react-router-dom';
import { StateSchema, ThunkExtraArg } from './StateSchema';
import { createReducerManager } from './reducerManager';

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch']
export function createReduxStore(
    asyncReducers: ReducersMapObject<StateSchema>,

    initialState?: StateSchema,

    navigate?: ReturnType<typeof useNavigate>,

) {
    const rootReducers = {
        ...asyncReducers,
        counter: counterReducer,
        user: userReducer,
    };
    const reducerManager = createReducerManager(rootReducers);

    const extraArg: ThunkExtraArg = {
        api: $api,
        navigate,
    };
    const configuredStore = configureStore({
        reducer: reducerManager.reduce as Reducer<StateSchema>,
        devTools: __IS_DEV__,
        preloadedState: initialState,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware({
            thunk: {
                extraArgument: extraArg,
            },
        }),
    });
    // @ts-ignore
    configuredStore.reducerManager = reducerManager;
    return configuredStore;
}
