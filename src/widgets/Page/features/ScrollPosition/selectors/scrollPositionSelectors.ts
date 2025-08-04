import { createSelector } from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers/StoreProvider';

export const getScrollPosition = (state: StateSchema) => state.scrollPosition?.scroll;
export const getScrollPositionByPath = createSelector(
    getScrollPosition,
    (state: StateSchema, path: string) => path,
    (scroll, path) => (scroll && scroll[path] !== undefined ? scroll[path] : 0),
);
