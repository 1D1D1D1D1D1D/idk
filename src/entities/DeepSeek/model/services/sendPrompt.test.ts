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

