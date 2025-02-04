import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Article } from 'entities/Article';
import { addQueryParams } from 'shared/lib/url/addQueryParams';
import { ArticleType } from 'entities/Article/model/consts/articleConsts';
import {
    getArticlePageLimit, getArticlePageOrder, getArticlePageSearch, getArticlePageSort,
    getArticlePageType,
} from '../../selectors/articlePageSelectors';

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
            const type = getArticlePageType(getState());
            try {
                addQueryParams({
                    search,
                    order,
                    sort,
                    type,

                });

                console.log(type);

                const response = await extra.api.get<Article[]>('/articles', {
                    params: {
                        _expand: 'user',
                        _limit: limit,
                        _page: page,
                        _sort: sort,
                        _order: order,
                        // GET /posts?q=internet
                        q: search,
                        type: type === ArticleType.ALL ? undefined : type,

                    },
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
