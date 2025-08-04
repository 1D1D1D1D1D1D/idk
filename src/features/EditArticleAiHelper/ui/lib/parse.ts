import { Article } from "entities/Article";

export function tryParseJSON(jsonString: string): Article | null {
    try {
        const cleaned = jsonString
            .trim()
            .replace(/^```json\s*/, '')
            .replace(/```$/, '');
        return JSON.parse(cleaned);
    } catch {
        return null;
    }
}

// Парс на лету блоки вида ```...``` code и всё остальное текст
export function parseBlocksFromRawText(input: string): { type: 'CODE' | 'TEXT'; content: string }[] {
    const blocks: { type: 'CODE' | 'TEXT'; content: string }[] = [];

    const codeRegex = /```(?:\w+)?\n([\s\S]*?)```/g;
    let lastIndex = 0; // индекс послежднего обработанного символа
    let match: RegExpExecArray | null;

    while ((match = codeRegex.exec(input)) !== null) { //dвсе строки на ``` код ``` 
        const start = match.index; // где начинается блок код

        if (start > lastIndex) { // между last и старт есть что то это текст до кода добавить как TEXT
            const text = input.slice(lastIndex, start).trim();
            if (text) {
                blocks.push({ type: 'TEXT', content: text });
            }
        }

        blocks.push({ type: 'CODE', content: match[1].trim() });
        lastIndex = match.index + match[0].length; // обновление индекса для перехода к следующей части текста
    }

    const remaining = input.slice(lastIndex).trim();
    if (remaining) { //после последнего блока кода что-то осталось тоже добавить как TEXT.
        blocks.push({ type: 'TEXT', content: remaining });
    }

    return blocks;
}