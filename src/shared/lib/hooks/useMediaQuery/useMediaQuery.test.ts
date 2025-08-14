import { renderHook, act } from '@testing-library/react';
import { useMediaQuery } from './useMediaQuery';

const mockMatchMedia = (matches: boolean) => {
    const listeners: ((event: MediaQueryListEvent) => void)[] = [];

    return jest.fn().mockImplementation((query: string) => ({
        matches,
        media: query,
        onchange: null,
        addListener: jest.fn(), // deprecated
        removeListener: jest.fn(), // deprecated
        addEventListener: jest.fn((event: string, listener: (event: MediaQueryListEvent) => void) => {
            if (event === 'change') {
                listeners.push(listener);
            }
        }),
        removeEventListener: jest.fn((event: string, listener: (event: MediaQueryListEvent) => void) => {
            if (event === 'change') {
                const index = listeners.indexOf(listener);
                if (index > -1) {
                    listeners.splice(index, 1);
                }
            }
        }),
        dispatchEvent: jest.fn(),
        // Функция для симуляции изменения медиа-запроса
        triggerChange: (newMatches: boolean) => {
            listeners.forEach(listener => {
                listener({ matches: newMatches } as MediaQueryListEvent);
            });
        }
    }));
};

describe('useMediaQuery', () => {
    let matchMediaMock: jest.Mock;

    beforeEach(() => {
        matchMediaMock = mockMatchMedia(false);
        Object.defineProperty(window, 'matchMedia', {
            writable: true,
            value: matchMediaMock,
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('должен возвращать false когда медиа-запрос не совпадает', () => {
        matchMediaMock = mockMatchMedia(false);
        window.matchMedia = matchMediaMock;

        const { result } = renderHook(() => useMediaQuery('(max-width: 768px)'));

        expect(result.current).toBe(false);
        expect(matchMediaMock).toHaveBeenCalledWith('(max-width: 768px)');
    });

    test('должен возвращать true когда медиа-запрос совпадает', () => {
        matchMediaMock = mockMatchMedia(true);
        window.matchMedia = matchMediaMock;

        const { result } = renderHook(() => useMediaQuery('(max-width: 768px)'));

        expect(result.current).toBe(true);
    });

    test('должен обновляться при изменении медиа-запроса', () => {
        const mediaQueryList = {
            matches: false,
            media: '(max-width: 768px)',
            onchange: null,
            addListener: jest.fn(),
            removeListener: jest.fn(),
            addEventListener: jest.fn(),
            removeEventListener: jest.fn(),
            dispatchEvent: jest.fn(),
        };

        const listeners: ((event: MediaQueryListEvent) => void)[] = [];

        mediaQueryList.addEventListener = jest.fn((event: string, listener: (event: MediaQueryListEvent) => void) => {
            if (event === 'change') {
                listeners.push(listener);
            }
        });

        matchMediaMock = jest.fn().mockReturnValue(mediaQueryList);
        window.matchMedia = matchMediaMock;

        const { result } = renderHook(() => useMediaQuery('(max-width: 768px)'));

        expect(result.current).toBe(false);

        // Симулируем изменение медиа-запроса
        act(() => {
            listeners.forEach(listener => {
                listener({ matches: true } as MediaQueryListEvent);
            });
        });

        expect(result.current).toBe(true);
    });

    test('должен правильно очищать event listeners при размонтировании', () => {
        const removeEventListenerSpy = jest.fn();
        const mediaQueryList = {
            matches: false,
            media: '(max-width: 768px)',
            onchange: null,
            addListener: jest.fn(),
            removeListener: jest.fn(),
            addEventListener: jest.fn(),
            removeEventListener: removeEventListenerSpy,
            dispatchEvent: jest.fn(),
        };

        matchMediaMock = jest.fn().mockReturnValue(mediaQueryList);
        window.matchMedia = matchMediaMock;

        const { unmount } = renderHook(() => useMediaQuery('(max-width: 768px)'));

        unmount();

        expect(removeEventListenerSpy).toHaveBeenCalledWith('change', expect.any(Function));
    });

    test('должен пересоздавать listener при изменении query', () => {
        const firstMediaQuery = {
            matches: false,
            media: '(max-width: 768px)',
            onchange: null,
            addListener: jest.fn(),
            removeListener: jest.fn(),
            addEventListener: jest.fn(),
            removeEventListener: jest.fn(),
            dispatchEvent: jest.fn(),
        };

        const secondMediaQuery = {
            matches: true,
            media: '(max-width: 1024px)',
            onchange: null,
            addListener: jest.fn(),
            removeListener: jest.fn(),
            addEventListener: jest.fn(),
            removeEventListener: jest.fn(),
            dispatchEvent: jest.fn(),
        };

        matchMediaMock = jest.fn()
            .mockReturnValueOnce(firstMediaQuery)
            .mockReturnValueOnce(secondMediaQuery);

        window.matchMedia = matchMediaMock;

        const { result, rerender } = renderHook(
            ({ query }) => useMediaQuery(query),
            { initialProps: { query: '(max-width: 768px)' } }
        );

        expect(result.current).toBe(false);
        expect(firstMediaQuery.addEventListener).toHaveBeenCalledWith('change', expect.any(Function));

        // Изменяем query
        rerender({ query: '(max-width: 1024px)' });

        expect(result.current).toBe(true);
        expect(firstMediaQuery.removeEventListener).toHaveBeenCalledWith('change', expect.any(Function));
        expect(secondMediaQuery.addEventListener).toHaveBeenCalledWith('change', expect.any(Function));
    });
})