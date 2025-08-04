import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { ReducersMapObject } from '@reduxjs/toolkit';
import { DeepPartial } from 'shared/lib/DeepPartialObject/DeepPartialObject';
import { createReduxStore } from '../config/store';
import { StateSchema } from '..';

interface StoreProviderProps {
    children?: ReactNode;
    initialState?: DeepPartial<StateSchema>;
    asyncReducers?: DeepPartial<ReducersMapObject<StateSchema>>
}

export const StoreProvider = (props: StoreProviderProps) => {
    const {
        children,
        initialState,
        asyncReducers,
    } = props;

    // const navigate = useNavigate();
    const store = createReduxStore(
        asyncReducers as ReducersMapObject<StateSchema>,
        initialState as StateSchema,
        // navigate,
    );

    return (
        <Provider store={store}>
            {children}
        </Provider>
    );
};
