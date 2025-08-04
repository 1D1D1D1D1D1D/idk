import {
    createEntityAdapter,
    createSlice,
    PayloadAction,
} from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers/StoreProvider';
import { ARTICLE_VIEW_LOCALSTORAGE_KEY } from 'shared/const/localstorage';
import { ArticleSortField, ArticleType, SortOrder } from 'entities/Article/model/consts/articleConsts';
import { Article, ArticleView } from 'entities/Article';
import { ArticlesPageSchema } from '../types/articlesPageSchema';
import { fetchArticlesList } from '../services/fetchArticlesList/fetchArticlesList';
import { TabItem } from 'shared/ui/Tabs/Tabs';

const articlesAdapter = createEntityAdapter<Article, string>({
    selectId: (article: Article) => article.id || '',
});
export const getArticle = articlesAdapter.getSelectors<StateSchema>(
    (state: StateSchema) => state.articlesPage || articlesAdapter.getInitialState(),
);

const articlesPageSlice = createSlice({
    name: 'ArticleDetailsCommentSlice',
    initialState: articlesAdapter.getInitialState<ArticlesPageSchema>({
        isLoading: false,
        error: undefined,
        ids: [],
        entities: {},
        view: ArticleView.LIST,
        page: 1,
        hasMore: true,
        inited: false,
        sort: ArticleSortField.CREATED,
        search: '',
        order: SortOrder.ASC,
        limit: 15,
        type: [ArticleType.ALL]
        // type: ArticleType.ALL,

    }),
    reducers: {
        setView: (state, action: PayloadAction<ArticleView>) => {
            state.view = action.payload;
            localStorage.setItem(ARTICLE_VIEW_LOCALSTORAGE_KEY, action.payload);
        },
        initState: (state) => {
            const view = localStorage.getItem(ARTICLE_VIEW_LOCALSTORAGE_KEY) as ArticleView;
            state.view = view;
            state.limit = view === ArticleView.LIST ? 4 : 20;
            state.inited = true;
        },
        setPage: (state, action) => {
            state.page = action.payload;
        },
        setOrder: (state, action) => {
            state.order = action.payload;
        },
        setSearch: (state, action: PayloadAction<string>) => {
            state.search = action.payload;
        },
        setSort: (state, action: PayloadAction<ArticleSortField>) => {
            state.sort = action.payload;
        },
        // setType: (state, action: PayloadAction<ArticleType>) => {
        //     // state.type = action.payload;
        // },
        setSelected: (state, action: PayloadAction<ArticleType>) => {
            const type = action.payload;

            if (state.type.includes(type)) {
                state.type = state.type.filter(t => t !== type);
                return;
            }
            if (type === ArticleType.ALL) {
                if (state.type.length > 0) {
                    return;
                }

                state.type = [ArticleType.ALL];
                return;
            }

            if (state.type.includes(ArticleType.ALL)) {
                return;
            }

            if (state.type.length >= 3) {
                return;
            }

            state.type = [...state.type, action.payload]
        }

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchArticlesList.pending, (state, action) => {
                state.isLoading = true;
                state.error = undefined;

                if (action.meta.arg.replace) {
                    articlesAdapter.removeAll(state);
                }
            })
            .addCase(fetchArticlesList.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = undefined;
                state.hasMore = action.payload.length >= state.limit;

                if (action.meta.arg.replace) {
                    articlesAdapter.setAll(state, action.payload);
                } else {
                    articlesAdapter.setMany(state, action.payload);
                }
            })
            .addCase(fetchArticlesList.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },

});

export const { reducer: articlesPageSliceReducer } = articlesPageSlice;
export const { actions: articlesPageSliceActions } = articlesPageSlice;
