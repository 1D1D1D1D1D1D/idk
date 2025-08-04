import { Article } from "entities/Article"

export interface EditArticleSchema {
    isLoading: boolean
    error?: string
    data?: Article
    form?: Article
    readonly?: boolean
}
