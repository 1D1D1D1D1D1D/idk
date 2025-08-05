import axios from 'axios';
import { TestAsyncThunk } from './TestAsyncThunk/TestAsyncThunk';
import { componentRender } from './componentRender/componentRender';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// Мокаем axios для всех тестов
jest.mock('axios');
const mockedAxios = jest.mocked(axios, true);

/**
 * ПРИМЕР 1: Тестирование AsyncThunk с API запросами
 */
describe('API Testing Examples - AsyncThunk', () => {
    // Пример функции, которую будем тестировать
    const fetchUserData = async (userId: string) => {
        const response = await axios.get(`/api/users/${userId}`);
        return response.data;
    };

    // Создаем AsyncThunk для тестирования
    const fetchUserThunk = (userId: string) => async (dispatch: any, getState: any, extra: any) => {
        try {
            const userData = await extra.api.get(`/api/users/${userId}`);
            return userData.data;
        } catch (error) {
            throw new Error('Failed to fetch user');
        }
    };

    test('успешный запрос данных пользователя', async () => {
        const userData = { id: '1', name: 'John Doe', email: 'john@example.com' };

        const thunk = new TestAsyncThunk(fetchUserThunk);
        thunk.api.get.mockReturnValue(Promise.resolve({ data: userData }));

        const result = await thunk.callThunk('1');

        expect(thunk.api.get).toHaveBeenCalledWith('/api/users/1');
        expect(result.payload).toEqual(userData);
        expect(result.meta.requestStatus).toBe('fulfilled');
    });

    test('ошибка при запросе данных пользователя', async () => {
        const thunk = new TestAsyncThunk(fetchUserThunk);
        thunk.api.get.mockRejectedValue(new Error('Network error'));

        const result = await thunk.callThunk('1');

        expect(thunk.api.get).toHaveBeenCalledWith('/api/users/1');
        expect(result.meta.requestStatus).toBe('rejected');
        expect(result.error).toBeDefined();
    });
});

/**
 * ПРИМЕР 2: Тестирование RTK Query запросов
 */
describe('API Testing Examples - RTK Query', () => {
    // Мокаем RTK Query хук
    const mockUseQuery = jest.fn();

    test('тестирование RTK Query хука', async () => {
        const mockData = [{ id: 1, title: 'Article 1' }, { id: 2, title: 'Article 2' }];

        mockUseQuery.mockReturnValue({
            data: mockData,
            isLoading: false,
            error: null,
            refetch: jest.fn(),
        });

        // Здесь можно протестировать компонент, использующий RTK Query
        expect(mockUseQuery).toHaveBeenCalled();
    });
});

/**
 * ПРИМЕР 3: Тестирование компонентов с API запросами
 */
describe('API Testing Examples - Components', () => {
    test('компонент загружает данные при монтировании', async () => {
        const mockData = { id: '1', name: 'Test User' };
        mockedAxios.get.mockResolvedValueOnce({ data: mockData });

        // Рендерим компонент
        componentRender(<div data - testid="user-component" > Loading...</div>);

        await waitFor(() => {
            expect(screen.getByTestId('user-component')).toBeInTheDocument();
        });
    });

    test('компонент показывает ошибку при неудачном запросе', async () => {
        mockedAxios.get.mockRejectedValueOnce(new Error('API Error'));

        // Рендерим компонент
        componentRender(<div data - testid="error-component" > Error occurred </div>);

        await waitFor(() => {
            expect(screen.getByTestId('error-component')).toHaveTextContent('Error occurred');
        });
    });
});

/**
 * ПРИМЕР 4: Тестирование POST запросов
 */
describe('API Testing Examples - POST Requests', () => {
    const createUserThunk = (userData: any) => async (dispatch: any, getState: any, extra: any) => {
        try {
            const response = await extra.api.post('/api/users', userData);
            return response.data;
        } catch (error) {
            throw new Error('Failed to create user');
        }
    };

    test('успешное создание пользователя', async () => {
        const userData = { name: 'New User', email: 'new@example.com' };
        const createdUser = { id: '2', ...userData };

        const thunk = new TestAsyncThunk(createUserThunk);
        thunk.api.post.mockReturnValue(Promise.resolve({ data: createdUser }));

        const result = await thunk.callThunk(userData);

        expect(thunk.api.post).toHaveBeenCalledWith('/api/users', userData);
        expect(result.payload).toEqual(createdUser);
    });
});

/**
 * ПРИМЕР 5: Тестирование с параметрами запроса
 */
describe('API Testing Examples - Query Parameters', () => {
    const fetchArticlesThunk = (params: any) => async (dispatch: any, getState: any, extra: any) => {
        try {
            const response = await extra.api.get('/api/articles', { params });
            return response.data;
        } catch (error) {
            throw new Error('Failed to fetch articles');
        }
    };

    test('запрос с параметрами', async () => {
        const params = { page: 1, limit: 10, search: 'test' };
        const articles = [{ id: 1, title: 'Test Article' }];

        const thunk = new TestAsyncThunk(fetchArticlesThunk);
        thunk.api.get.mockReturnValue(Promise.resolve({ data: articles }));

        const result = await thunk.callThunk(params);

        expect(thunk.api.get).toHaveBeenCalledWith('/api/articles', { params });
        expect(result.payload).toEqual(articles);
    });
});

/**
 * ПРИМЕР 6: Тестирование с заголовками авторизации
 */
describe('API Testing Examples - Authorization Headers', () => {
    const fetchProtectedDataThunk = () => async (dispatch: any, getState: any, extra: any) => {
        try {
            const token = localStorage.getItem('token');
            const response = await extra.api.get('/api/protected', {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (error) {
            throw new Error('Unauthorized');
        }
    };

    test('запрос с токеном авторизации', async () => {
        const token = 'test-token';
        localStorage.setItem('token', token);

        const thunk = new TestAsyncThunk(fetchProtectedDataThunk);
        thunk.api.get.mockReturnValue(Promise.resolve({ data: { secret: 'data' } }));

        const result = await thunk.callThunk();

        expect(thunk.api.get).toHaveBeenCalledWith('/api/protected', {
            headers: { Authorization: `Bearer ${token}` }
        });
    });
});

/**
 * ПРИМЕР 7: Тестирование с обработкой состояний загрузки
 */
describe('API Testing Examples - Loading States', () => {
    test('проверка состояния загрузки', async () => {
        const mockData = { id: '1', name: 'User' };

        // Создаем промис, который не разрешается сразу
        let resolvePromise: (value: any) => void;
        const promise = new Promise((resolve) => {
            resolvePromise = resolve;
        });

        mockedAxios.get.mockReturnValue(promise);

        // Рендерим компонент
        componentRender(<div data - testid="loading-component" > Loading...</div>);

        // Проверяем, что показывается состояние загрузки
        expect(screen.getByTestId('loading-component')).toHaveTextContent('Loading...');

        // Разрешаем промис
        resolvePromise!({ data: mockData });

        await waitFor(() => {
            // Здесь можно проверить, что данные загружены
        });
    });
});

/**
 * ПРИМЕР 8: Тестирование с моком fetch
 */
describe('API Testing Examples - Fetch Mock', () => {
    beforeEach(() => {
        // Мокаем fetch
        global.fetch = jest.fn();
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    test('тестирование с fetch', async () => {
        const mockData = { id: '1', name: 'User' };
        (global.fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: async () => mockData,
        });

        const response = await fetch('/api/users/1');
        const data = await response.json();

        expect(global.fetch).toHaveBeenCalledWith('/api/users/1');
        expect(data).toEqual(mockData);
    });
}); 