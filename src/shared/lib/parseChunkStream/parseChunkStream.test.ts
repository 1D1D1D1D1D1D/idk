import { parseChunkStream } from "./parseChunkStream";

const createMockReader = (chunks: string[]) => {
    let index = 0

    return {
        read: jest.fn().mockImplementation(() => {
            if (index < chunks.length) {
                const chunk = chunks[index]
                index++
                return Promise.resolve({
                    value: new TextEncoder().encode(chunk),
                    done: false
                })
            }
            return Promise.resolve({ done: true })
        }),
        releaseLock: jest.fn(),
        cancel: jest.fn(),
        closed: Promise.resolve()

    } as ReadableStreamDefaultReader
}
describe('sendPrompt', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    test('accumulates reuslt', async () => {
        const handlers = {
            onTextBlock: jest.fn(),
            onCodeBlock: jest.fn(),
            onResultReady: jest.fn(),
            onLoading: jest.fn()
        };
        const testArr = [
            'data: {"choices":[{"content_filter_results":{"hate":{"filtered":false,"severity":"safe"},"self_harm":{"filtered":false,"severity":"safe"},"sexual":{"filtered":false,"severity":"safe"},"violence":{"filtered":false,"severity":"safe"}},"delta":{"content":"1"},"finish_reason":null,"index":0,"logprobs":null}],"created":1754517158,"id":"chatcmpl-C1gLmesRzT002PUcT59MzW82cophI","model":"gpt-4o-2024-11-20","object":"chat.completion.chunk","system_fingerprint":"fp_ee1d74bde0"}\n',
            'data: {"choices":[{"content_filter_results":{"hate":{"filtered":false,"severity":"safe"},"self_harm":{"filtered":false,"severity":"safe"},"sexual":{"filtered":false,"severity":"safe"},"violence":{"filtered":false,"severity":"safe"}},"delta":{"content":"1"},"finish_reason":null,"index":0,"logprobs":null}],"created":1754517158,"id":"chatcmpl-C1gLmesRzT002PUcT59MzW82cophI","model":"gpt-4o-2024-11-20","object":"chat.completion.chunk","system_fingerprint":"fp_ee1d74bde0"}\n',
            'data: {"choices":[{"content_filter_results":{"hate":{"filtered":false,"severity":"safe"},"self_harm":{"filtered":false,"severity":"safe"},"sexual":{"filtered":false,"severity":"safe"},"violence":{"filtered":false,"severity":"safe"}},"delta":{"content":"1"},"finish_reason":null,"index":0,"logprobs":null}],"created":1754517158,"id":"chatcmpl-C1gLmesRzT002PUcT59MzW82cophI","model":"gpt-4o-2024-11-20","object":"chat.completion.chunk","system_fingerprint":"fp_ee1d74bde0"}\n',
            'data: {"choices":[{"content_filter_results":{"hate":{"filtered":false,"severity":"safe"},"self_harm":{"filtered":false,"severity":"safe"},"sexual":{"filtered":false,"severity":"safe"},"violence":{"filtered":false,"severity":"safe"}},"delta":{"content":"1"},"finish_reason":null,"index":0,"logprobs":null}],"created":1754517158,"id":"chatcmpl-C1gLmesRzT002PUcT59MzW82cophI","model":"gpt-4o-2024-11-20","object":"chat.completion.chunk","system_fingerprint":"fp_ee1d74bde0"}\n',
            'data: [DONE]\n'
        ];

        const mockReader = createMockReader(testArr)
        await parseChunkStream(mockReader, handlers)
        expect(handlers.onResultReady).toHaveBeenCalledWith('1111');
    })
    test('TEXT bllock callback', async () => {
        const handlers = {
            onTextBlock: jest.fn(),
            onCodeBlock: jest.fn(),
            onResultReady: jest.fn(),
            onLoading: jest.fn()
        };

        const testArr = [
            'data: {"choices":[{"content_filter_results":{"hate":{"filtered":false,"severity":"safe"},"self_harm":{"filtered":false,"severity":"safe"},"sexual":{"filtered":false,"severity":"safe"},"violence":{"filtered":false,"severity":"safe"}},"delta":{"content":" ],\\\"blocks\\\": ["},"finish_reason":null,"index":0,"logprobs":null}],"created":1754517158,"id":"chatcmpl-C1gLmesRzT002PUcT59MzW82cophI","model":"gpt-4o-2024-11-20","object":"chat.completion.chunk","system_fingerprint":"fp_ee1d74bde0"}\n',
            'data: {"choices":[{"content_filter_results":{"hate":{"filtered":false,"severity":"safe"},"self_harm":{"filtered":false,"severity":"safe"},"sexual":{"filtered":false,"severity":"safe"},"violence":{"filtered":false,"severity":"safe"}},"delta":{"content":"{\\\"id\\\": \\\"1\\\",\\\"type\\\": \\\"TEXT\\\",\\\"title\\\": \\\"Почему React?\\\",\\\"paragraphs\\\": ["},"finish_reason":null,"index":1,"logprobs":null}],"created":1754517158,"id":"chatcmpl-C1gLmesRzT002PUcT59MzW82cophII","model":"gpt-4o-2024-11-20","object":"chat.completion.chunk","system_fingerprint":"fp_ee1d74bde1"}\n',
            'data: {"choices":[{"content_filter_results":{"hate":{"filtered":false,"severity":"safe"},"self_harm":{"filtered":false,"severity":"safe"},"sexual":{"filtered":false,"severity":"safe"},"violence":{"filtered":false,"severity":"safe"}},"delta":{"content":" \\\"React — это библиотека для создания пользовательских интерфейсов, разработанная Facebook. Она позволяет разбивать интерфейс на небольшие компоненты, которые можно переиспользовать.\\\""},"finish_reason":null,"index":2,"logprobs":null}],"created":1754517158,"id":"chatcmpl-C1gLmesRzT002PUcT59MzW82cophIII","model":"gpt-4o-2024-11-20","object":"chat.completion.chunk","system_fingerprint":"fp_ee1d74bde2"}\n',
            'data: {"choices":[{"content_filter_results":{"hate":{"filtered":false,"severity":"safe"},"self_harm":{"filtered":false,"severity":"safe"},"sexual":{"filtered":false,"severity":"safe"},"violence":{"filtered":false,"severity":"safe"}},"delta":{"content":"   ]},{"},"finish_reason":null,"index":3,"logprobs":null}],"created":1754517158,"id":"chatcmpl-C1gLmesRzT002PUcT59MzW82cophIV","model":"gpt-4o-2024-11-20","object":"chat.completion.chunk","system_fingerprint":"fp_ee1d74bde3"}\n',
            'data: [DONE]\n'
        ];

        const mockReader = createMockReader(testArr)
        await parseChunkStream(mockReader, handlers)
        expect(handlers.onTextBlock).toHaveBeenCalledWith({
            "id": "1",
            "type": "TEXT",
            "title": "Почему React?",
            "paragraphs": [
                "React — это библиотека для создания пользовательских интерфейсов, разработанная Facebook. Она позволяет разбивать интерфейс на небольшие компоненты, которые можно переиспользовать."
            ]
        });

    })

    test('CODE block callback', async () => {
        const handlers = {
            onTextBlock: jest.fn(),
            onCodeBlock: jest.fn(),
            onResultReady: jest.fn(),
            onLoading: jest.fn()
        };

        const testArr = [
            'data: {"choices":[{"content_filter_results":{"hate":{"filtered":false,"severity":"safe"},"self_harm":{"filtered":false,"severity":"safe"},"sexual":{"filtered":false,"severity":"safe"},"violence":{"filtered":false,"severity":"safe"}},"delta":{"content":" ],\\\"blocks\\\": ["},"finish_reason":null,"index":0,"logprobs":null}],"created":1754517158,"id":"chatcmpl-C1gLmesRzT002PUcT59MzW82cophI","model":"gpt-4o-2024-11-20","object":"chat.completion.chunk","system_fingerprint":"fp_ee1d74bde0"}\n',
            'data: {"choices":[{"content_filter_results":{"hate":{"filtered":false,"severity":"safe"},"self_harm":{"filtered":false,"severity":"safe"},"sexual":{"filtered":false,"severity":"safe"},"violence":{"filtered":false,"severity":"safe"}},"delta":{"content":"{\\\"id\\\": \\\"4\\\",\\\"type\\\": \\\"CODE\\\",\\\"code\\\": \\\"npm install -g typescript\\\"}"},"finish_reason":null,"index":1,"logprobs":null}],"created":1754517158,"id":"chatcmpl-C1gLmesRzT002PUcT59MzW82cophII","model":"gpt-4o-2024-11-20","object":"chat.completion.chunk","system_fingerprint":"fp_ee1d74bde1"}\n',
            'data: {"choices":[{"content_filter_results":{"hate":{"filtered":false,"severity":"safe"},"self_harm":{"filtered":false,"severity":"safe"},"sexual":{"filtered":false,"severity":"safe"},"violence":{"filtered":false,"severity":"safe"}},"delta":{"content":"  ]}"},"finish_reason":null,"index":2,"logprobs":null}],"created":1754517158,"id":"chatcmpl-C1gLmesRzT002PUcT59MzW82cophIII","model":"gpt-4o-2024-11-20","object":"chat.completion.chunk","system_fingerprint":"fp_ee1d74bde2"}\n',
            'data: [DONE]\n'
        ];

        const mockReader = createMockReader(testArr)
        await parseChunkStream(mockReader, handlers)

        expect(handlers.onCodeBlock).toHaveBeenCalledWith({
            "id": "4",
            "type": "CODE",
            "code": "npm install -g typescript"
        });

    })

})

