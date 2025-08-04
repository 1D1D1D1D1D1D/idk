import { Article } from "entities/Article"

export interface ArticleAiInputSchema {
    response?: string
    isLoading?: boolean
    error?: string
    data?: Article
    prompt?: string
    version?: number
    result?: Article
    readonly?: boolean
}


