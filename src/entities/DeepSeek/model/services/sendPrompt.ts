import { AppDispatch, StateSchema } from "app/providers/StoreProvider";
import { Article } from "entities/Article";
import { articleAiActions } from "features/EditArticleAiHelper/model/slice/articleAiSlice";
import { EditArticleActions } from "features/EditArticleForm/model/slice/EditArticleSlice";
import { parseChunkStream } from "shared/lib/parseChunkStream/parseChunkStream";


export const sendPrompt = async (promptTemplate: string, text: string = '', dispatch: AppDispatch, parsedResult: Article) => {
    try {
        const response = await fetch('https://models.github.ai/inference/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer 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`
            },
            body: JSON.stringify({
                messages: [{ role: 'user', content: `${promptTemplate}` + ` ${text}` }],
                stream: true,
                model: "openai/gpt-4o"
            }),
        });
        dispatch(articleAiActions.setLoading(true))
        if (!response.ok) {
            return console.log('Error');

        }
        const reader = response.body?.getReader();
        if (reader) parseChunkStream(reader, {
            onTextBlock: (block) => dispatch(articleAiActions.setBlocks(block)),
            onCodeBlock: (block) => dispatch(articleAiActions.setBlocks(block)),
            onResultReady: (result) => {
                dispatch(articleAiActions.setResult(result));

                const parsed = result
                    .trim()
                    .replace(/^```json\s*/, '')
                    .replace(/```$/, '');

                if (parsed) {
                    try {
                        let parsedJson = JSON.parse(parsed);
                        dispatch(EditArticleActions.updateData(parsedJson));
                    } catch (error) {
                        console.error("Ошибка парсинга JSON для updateData:", error);
                    }
                }
            },
            onLoading: (isLoading) => dispatch(articleAiActions.setLoading(isLoading)),
        })
        if (parsedResult) {
            dispatch(EditArticleActions.updateData(parsedResult));
        }

        return console.log('FINISH');
    }
    catch (e) {
        return e

    }


}

