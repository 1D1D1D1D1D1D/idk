import { Reducer } from '@reduxjs/toolkit';
import { ReduxStoreWithManager } from 'app/providers/StoreProvider';
import { StateSchemaKey } from 'app/providers/StoreProvider/config/StateSchema';
import { ReactNode, useEffect } from 'react';
import { useDispatch, useStore } from 'react-redux';

export type ReducerList = {
    [keyName in StateSchemaKey]?: Reducer
}
type ReducersListEntry = [StateSchemaKey, Reducer]
interface DynamicModuleLoaderProps {
    reducers: ReducerList;
    children: ReactNode
    removeAfterUnmount?: boolean
}

export const DynamicModuleLoader = (props: DynamicModuleLoaderProps) => {
    const store = useStore() as ReduxStoreWithManager;
    const dispatch = useDispatch();
    const {
        reducers, children, removeAfterUnmount,
    } = props;
    useEffect(() => {
        Object.entries(reducers).forEach(([name, reducer]) => {
            const reducerManager = store.reducerManager!;
            reducerManager.add(name as StateSchemaKey, reducer);
            dispatch({ type: '@INIT LoginFormReducer' });
        });

        return () => {
            if (removeAfterUnmount) {
                Object.entries(reducers).forEach(([name]) => {
                    const reducerManager = store.reducerManager!;
                    reducerManager.remove(name as StateSchemaKey);
                    dispatch({ type: '@DELETE LoginFormReducer' });
                });
            }
        };
    }, []);
    return ( 
        <div>
            {children}
        </div>
    );
};
