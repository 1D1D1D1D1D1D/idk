import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ScrollPositionSchema } from '..';

const initialState: ScrollPositionSchema = {
    scroll: {
    },
};

export const scrollPositionSlice = createSlice({
    name: 'scrollPosition',
    initialState,
    reducers: {
        setScrollPosition: (state, { payload }: PayloadAction<{ path: string; position: number }>) => {
            state.scroll[payload.path] = payload.position;
        },

    },

});
export const { actions: scrollPositionActions } = scrollPositionSlice;
export const { reducer: scrollPositionReducer } = scrollPositionSlice;
