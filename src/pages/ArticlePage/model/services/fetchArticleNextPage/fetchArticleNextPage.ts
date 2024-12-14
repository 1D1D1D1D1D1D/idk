import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import {
    getArticlePageHasMore, getArticlePageIsLoading, getArticlePageLimit, getArticlePageNum,
    getArticlePageView,
} from '../../selectors/articlePageSelectors';
import { articlesPageSliceActions } from '../../slice/articlesPageSlice';
import { fetchArticlesList } from '../fetchArticlesList/fetchArticlesList';

export const fetchArticleNextPage = createAsyncThunk<
   void,
    void,
    ThunkConfig<string>
    >(
        'articlesPage/fetchArticleNextPaget',
        async (_, thunkApi) => {
            const {
                getState, dispatch,
            } = thunkApi;
            const hasMore = getArticlePageHasMore(getState());
            const page = getArticlePageNum(getState());
            const view = getArticlePageView(getState());
            const limit = getArticlePageLimit(getState());
            const isLoading = getArticlePageIsLoading(getState());
            if (hasMore && !isLoading) {
                dispatch(articlesPageSliceActions.setPage(page + 1));
                dispatch(fetchArticlesList({

                    page: page + 1,
                }));
            }
        },
    );
