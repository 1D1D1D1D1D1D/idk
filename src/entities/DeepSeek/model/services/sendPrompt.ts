import { AppDispatch } from "app/providers/StoreProvider";
import { articleAiActions } from "features/EditArticleAiHelper/model/slice/articleAiSlice";
import { EditArticleActions } from "features/EditArticleForm/model/slice/EditArticleSlice";
interface ChatChunkData {
    index: number;
    delta: {
        role?: 'assistant' | 'user' | 'system';
        content?: string;
    };
    finish_reason: string | null;
    logprobs: null | object;
    content_filter_results?: any;
}

interface FullChunk {
    id: string;
    object: string;
    created: number;
    model: string;
    system_fingerprint?: string;
    choices: ChatChunkData[];
}

export const sendPrompt = async (promptTemplate: string, text: string = '', dispatch: AppDispatch) => {
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

        if (!response.ok) {
            return console.log('Error');

        }
        const reader = response.body?.getReader();
        const decoder = new TextDecoder();
        let buffer = ''; //накапливае данные между чанками
        let testResult = ''
        let inBlocks = false;
        let braceLevel = 0;
        let currentBlock = '';
        const seenBlockIds = new Set<string>();
        if (reader) {
            while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                buffer += decoder.decode(value, { stream: true });
                // console.log('buffer', buffer);
                const lines = buffer.split('\n'); //накапливает данные между чанками если нет \n в самом конце то чан не завершен до конца и нужно разбить на массив с остатком следующего 
                // console.log('lines', lines)
                buffer = lines.pop() || ''; // вернуть последний элемент массива с остатком чанка  или пустую строку если чанк пришел полным
                // lines = ['data: {...}', 'data: {...}', 'da']
                // line  'data: {...}' ||   'data: {...}\n*da*...'
                for (const line of lines) {
                    const trimmed = line.trim(); //убрать пробелы и переносы строк чтоб не обрабатывать пцустые строки
                    if (!trimmed || !trimmed.startsWith('data:')) continue; // если пришел чанк не относящийся к данным которые ожидались
                    const jsonStr = trimmed.replace(/^data:\s*/, ''); //убрать data чтобы распарсить в json   {delta: {content: ...}}
                    if (jsonStr === '[DONE]') continue;
                    const parsed: FullChunk = JSON.parse(jsonStr);
                    const testContent = parsed.choices?.[0]?.delta?.content;
                    if (testContent) {
                        testResult += testContent // OK
                        if (!inBlocks && testResult.includes('"blocks": [')) {
                            inBlocks = true;
                            console.log('BLOCKS !!!!');
                        }
                        if (inBlocks) {
                            for (let i = 0; i < testContent.length; i++) {
                                const char = testContent[i];

                                if (char === '{') {
                                    braceLevel++;

                                    if (braceLevel === 1) {
                                        currentBlock = '{';
                                    } else {
                                        currentBlock += char;
                                    }
                                }
                                else if (char === '}') {
                                    if (braceLevel > 0) {
                                        currentBlock += char;
                                        braceLevel--;
                                        if (braceLevel === 0) {
                                            console.log('BRACE LEVEl 0');
                                            try {
                                                const block = JSON.parse(currentBlock);
                                                //был ли уже этот блок 
                                                if (!seenBlockIds.has(block.id)) {
                                                    //если нет то добавляем в сет и парсим
                                                    seenBlockIds.add(block.id);
                                                    console.log(seenBlockIds);

                                                    if (block.type === 'CODE') {
                                                        dispatch(articleAiActions.setBlocks(block))
                                                        console.log('CODE BLOCK:', block);
                                                    } else if (block.type === 'TEXT') {
                                                        dispatch(articleAiActions.setBlocks(block))
                                                        console.log('TEXT BLOCK:', block);
                                                    }
                                                }
                                            } catch (error) {
                                                // console.warn('Ошибка при парсинге блока:', error, 'Текущий блок:', currentBlock);
                                            }
                                            currentBlock = '';
                                        }
                                    }
                                }
                                // Добавляем символы в текущий блок
                                else if (braceLevel > 0) {
                                    currentBlock += char;
                                }
                                // Проверяем завершение блока blocks
                                if (char === ']' && braceLevel === 0) {
                                    inBlocks = false;
                                    console.log('выход из  blocks');
                                }
                            }

                        }
                    }
                }
            }
            dispatch(articleAiActions.setResult(testResult));
            dispatch(articleAiActions.setLoading(false))
            const parse = testResult
                .trim()
                .replace(/^```json\s*/, '')
                .replace(/```$/, '');

            if (parse) {
                try {
                    let parsedJson = JSON.parse(parse);
                    dispatch(EditArticleActions.updateData(parsedJson))
                } catch (error) {
                    console.error("Ошибка парсинга JSON:", error);
                }
            } else {
                console.log("JSON не найден.");
            }
        }
        return console.log('FINISH');
    }
    catch (e) {
        return e

    }


}

