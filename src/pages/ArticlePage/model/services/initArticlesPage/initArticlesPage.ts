import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import {
    getArticlePageInited,
} from '../../selectors/articlePageSelectors';
import { articlesPageSliceActions } from '../../slice/articlesPageSlice';
import { fetchArticlesList } from '../fetchArticlesList/fetchArticlesList';

export const initArticlesPage = createAsyncThunk<
   void,
    void,
    ThunkConfig<string>
    >(
        'articlesPage/initArticlesPage',
        async (_, thunkApi) => {
            const {
                getState, dispatch,
            } = thunkApi;
            const inited = getArticlePageInited(getState());
            if (!inited) {
                dispatch(articlesPageSliceActions.initState());
                dispatch(fetchArticlesList({
                    page: 1,
                }));
            }
        },
    );
