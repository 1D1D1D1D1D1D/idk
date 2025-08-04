import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { ArticleSortField } from 'entities/Article';
import { ArticleType } from 'entities/Article/model/consts/articleConsts';
import {
    getArticlePageInited,
} from '../../selectors/articlePageSelectors';
import { articlesPageSliceActions } from '../../slice/articlesPageSlice';
import { fetchArticlesList } from '../fetchArticlesList/fetchArticlesList';

export const initArticlesPage = createAsyncThunk<
    void,
    URLSearchParams,
    ThunkConfig<string>
>(
    'articlesPage/initArticlesPage',
    async (searchParams, thunkApi) => {
        const {
            getState, dispatch,
        } = thunkApi;

        const inited = getArticlePageInited(getState());
        if (!inited) {
            const orderFromUrl = searchParams.get('order');
            const sortFromUrl = searchParams.get('sort') as ArticleSortField;
            const searchFromUrl = searchParams.get('search');
            const typeFromUrl = searchParams.get('type') as ArticleType;

            if (orderFromUrl) {
                dispatch(articlesPageSliceActions.setOrder(orderFromUrl));
            }

            if (sortFromUrl) {
                dispatch(articlesPageSliceActions.setSort(sortFromUrl));
            }

            if (searchFromUrl) {
                dispatch(articlesPageSliceActions.setSearch(searchFromUrl));
            }
            if (typeFromUrl) {
                dispatch(articlesPageSliceActions.setSelected(typeFromUrl));
            }
            dispatch(articlesPageSliceActions.initState());
            dispatch(fetchArticlesList({
                page: 1,
            }));
        }
    },
);
