import { StoryFn } from '@storybook/react';
import { StateSchema, StoreProvider } from 'app/providers/StoreProvider';
import { DeepPartial } from 'app/types/DeepPartialObject';

export const StoreDecorator = (state: DeepPartial<StateSchema>) => (StoryComponent: StoryFn) => (
    <StoreProvider initialState={state}>
        <StoryComponent />
    </StoreProvider>
);
