import { TestAsyncThunk } from 'shared/lib/tests/TestAsyncThunk/TestAsyncThunk';
import { fetchArticleNextPage } from './fetchArticleNextPage';
import { fetchArticlesList } from '../fetchArticlesList/fetchArticlesList';

jest.mock('../fetchArticlesList/fetchArticlesList');

const fetchArticlesListMock = fetchArticlesList as jest.MockedFunction<typeof fetchArticlesList>;

describe('fetchArticleNextPage', () => {
    beforeEach(() => {
        fetchArticlesListMock.mockClear();
    });
    test('success', async () => {
        const thunk = new TestAsyncThunk(fetchArticleNextPage, {
            articlesPage: {
                page: 2,
                ids: [],
                entities: {},
                limit: 5,
                isLoading: false,
                hasMore: true,
            },
        });
        await thunk.callThunk();

        expect(thunk.dispatch).toHaveBeenCalledTimes(4);
        expect(fetchArticlesListMock).toHaveBeenCalledWith({ page: 3 });
    });
    test('fetchArticleNextPage not called', async () => {
        const thunk = new TestAsyncThunk(fetchArticleNextPage, {
            articlesPage: {
                page: 1,
                ids: [],
                entities: {},
                limit: 5,
                isLoading: false,
                hasMore: false,
            },
        });
        await thunk.callThunk();

        expect(thunk.dispatch).toHaveBeenCalledTimes(2);
        expect(fetchArticlesListMock).not.toHaveBeenCalled();
    });
    test('fetchArticleNextPage id loading', async () => {
        const thunk = new TestAsyncThunk(fetchArticleNextPage, {
            articlesPage: {
                page: 2,
                ids: [],
                entities: {},
                limit: 5,
                isLoading: true,
                hasMore: false,
            },
        });
        await thunk.callThunk();

        expect(thunk.dispatch).toHaveBeenCalledTimes(2);
    });
});
