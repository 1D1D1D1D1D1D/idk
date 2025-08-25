import { Article } from "entities/Article"


interface CarouselData {
    imgUrl?: string,
    title?: string
}
export interface AllArticlesSchema {
    isLoading?: boolean
    error?: string
    articles?: Article[]
    data?: CarouselData[]
}