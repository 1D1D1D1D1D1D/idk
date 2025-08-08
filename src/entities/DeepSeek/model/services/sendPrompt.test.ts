import { parseChunkStream } from "shared/lib/parseChunkStream/parseChunkStream";
import { sendPrompt } from "./sendPrompt";
import bodyParser from "body-parser";
import { articleAiActions } from "features/EditArticleAiHelper/model/slice/articleAiSlice";

const mockDispatch = jest.fn();

jest.mock('shared/lib/parseChunkStream/parseChunkStream', () => ({
    parseChunkStream: jest.fn()
}))

describe('sendPrompt', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    test('calling fetch and parseChunk', async () => {
        const mockReader = {}
        const mockResponse = {
            ok: true,
            body: { getReader: () => mockReader }
        }
        global.fetch = jest.fn(() => Promise.resolve(mockResponse)) as any

        await sendPrompt('template', 'text', mockDispatch, {})

        expect(fetch).toHaveBeenLastCalledWith(
            'https://models.github.ai/inference/chat/completions',
            expect.objectContaining({
                method: "POST",

                headers: expect.objectContaining({
                    "Authorization": "Bearer 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",
                    "Content-Type": "application/json"
                }),
                body: expect.stringContaining('{"messages":[{"role":"user","content":"template text"}],"stream":true,"model":"openai/gpt-4o"}')
            }
            )
        )
        expect(mockDispatch).toHaveBeenCalledWith(articleAiActions.setLoading(true));
        expect(parseChunkStream).toHaveBeenCalledWith(mockReader, expect.any(Object));
    })

    test('with error response', async () => {
        const mockResponse = {
            ok: false,
        }
        global.fetch = jest.fn(() => Promise.resolve(mockResponse)) as any
        const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
        await sendPrompt('template', 'text', mockDispatch, {})
        expect(consoleSpy).toHaveBeenCalledWith('Error');
        expect(parseChunkStream).not.toHaveBeenCalled();
        consoleSpy.mockRestore();
    })
    test('network error', async () => {
        const networkError = new Error('Network error')
        global.fetch = jest.fn(() => Promise.reject(networkError)) as any
        const result = await sendPrompt('template', 'text', mockDispatch, {})
        expect(result).toBe(networkError);
        expect(fetch).toHaveBeenCalled();
        expect(parseChunkStream).not.toHaveBeenCalled();

    })
})

// {
//     "messages": [
//         {
//             "role": "user",
//             "content": "template text"
//         }
//     ],
//         "stream": true,
//             "model": "openai/gpt-4o"
// }



// import { sendPrompt } from './sendPrompt';
// import { articleAiActions } from 'features/ArticleAI/model/slice/articleAiSlice';
// import { EditArticleActions } from 'features/EditArticle/model/slice/editArticleSlice';
// import * as Parser from './parseChunkStream';

// const mockDispatch = jest.fn();

// jest.mock('./parseChunkStream', () => ({
//   parseChunkStream: jest.fn(),
// }));

// describe('sendPrompt', () => {
//   beforeEach(() => {
//     jest.clearAllMocks();
//   });

//   it('вызывает fetch и parseChunkStream', async () => {
//     const mockReader = {};
//     const mockResponse = {
//       ok: true,
//       body: { getReader: () => mockReader }
//     };
//     global.fetch = jest.fn(() => Promise.resolve(mockResponse)) as any;

//     await sendPrompt('template', 'text', mockDispatch, {});

//     expect(fetch).toHaveBeenCalledWith(
//       'https://models.github.ai/inference/chat/completions',
//       expect.objectContaining({
//         method: 'POST',
//         headers: expect.any(Object),
//         body: expect.stringContaining('template text')
//       })
//     );

//     expect(mockDispatch).toHaveBeenCalledWith(articleAiActions.setLoading(true));
//     expect(Parser.parseChunkStream).toHaveBeenCalledWith(mockReader, expect.any(Object));
//   });
// });



// import { parseChunkStream } from './parseChunkStream';

// const createChunk = (content: string) => {
//   return `data: ${JSON.stringify({
//     id: '1',
//     object: 'chunk',
//     created: Date.now(),
//     model: 'gpt-4o',
//     choices: [
//       {
//         index: 0,
//         delta: { content },
//         finish_reason: null,
//         logprobs: null
//       }
//     ]
//   })}\n`;
// };

// describe('parseChunkStream', () => {
//   const encoder = new TextEncoder();

//   it('должен вызывать onTextBlock и onResultReady', async () => {
//     const handlers = {
//       onTextBlock: jest.fn(),
//       onCodeBlock: jest.fn(),
//       onResultReady: jest.fn(),
//       onLoading: jest.fn()
//     };

//     const chunk1 = createChunk('"blocks": [');
//     const chunk2 = createChunk('{"id":"123","type":"TEXT","content":"Hello"}');
//     const chunk3 = createChunk(']}');
//     const done = 'data: [DONE]\n';

//     const reader = {
//       read: jest
//         .fn()
//         .mockResolvedValueOnce({ value: encoder.encode(chunk1), done: false })
//         .mockResolvedValueOnce({ value: encoder.encode(chunk2), done: false })
//         .mockResolvedValueOnce({ value: encoder.encode(chunk3), done: false })
//         .mockResolvedValueOnce({ value: encoder.encode(done), done: false })
//         .mockResolvedValueOnce({ done: true })
//     };

//     await parseChunkStream(reader, handlers);

//     expect(handlers.onTextBlock).toHaveBeenCalledWith(
//       expect.objectContaining({
//         id: '123',
//         type: 'TEXT',
//         content: 'Hello'
//       })
//     );

//     expect(handlers.onResultReady).toHaveBeenCalledWith(
//       expect.stringContaining('blocks')
//     );

//     expect(handlers.onLoading).toHaveBeenLastCalledWith(false);
//   });
// });