import { StoreProvider } from './ui/StoreProvider';
import { AppDispatch, createReduxStore } from './config/store';
import { StateSchema, ReduxStoreWithManager, ThunkConfig } from './config/StateSchema';

export {
    StoreProvider,
    createReduxStore,
    type StateSchema,
    type ReduxStoreWithManager,
    type AppDispatch,
    type ThunkConfig,
};
