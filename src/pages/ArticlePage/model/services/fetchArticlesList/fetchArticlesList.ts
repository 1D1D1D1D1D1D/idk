import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Article } from 'entities/Article';
import { addQueryParams } from 'shared/lib/url/addQueryParams';
import { ArticleType } from 'entities/Article/model/consts/articleConsts';
import {
    getArticlePageLimit, getArticlePageOrder, getArticlePageSearch, getArticlePageSelectedTypes, getArticlePageSort,
} from '../../selectors/articlePageSelectors';
import Qs from 'qs'
interface FetchArticlesListProps {
    page?: number;
    replace?: boolean;
}
export const fetchArticlesList = createAsyncThunk<
    Article[],
    FetchArticlesListProps,
    ThunkConfig<string>
>(
    'articlesPage/fetchArticlesList',
    async (props, thunkApi) => {
        const { extra, rejectWithValue, getState } = thunkApi;
        const { page } = props;

        const limit = getArticlePageLimit(getState());
        const search = getArticlePageSearch(getState());
        const order = getArticlePageOrder(getState());
        const sort = getArticlePageSort(getState());
        const selectedTypes = getArticlePageSelectedTypes(getState());

        try {
            addQueryParams({
                search,
                order,
                sort,
                type: selectedTypes.join(','),
            });

            const response = await extra.api.get<Article[]>('/articles', {
                params: {
                    _expand: 'user',
                    _limit: limit,
                    _page: page,
                    _sort: sort,
                    _order: order,
                    q: search,
                    ...(selectedTypes.includes(ArticleType.ALL) ? {} : { type: selectedTypes }),
                },
                paramsSerializer: (params: Record<string, any>) =>
                    Qs.stringify(params, { arrayFormat: 'repeat' }),
            });

            if (!response.data) {
                throw new Error();
            }

            return response.data;
        } catch (e) {
            return rejectWithValue('error');
        }
    },
);