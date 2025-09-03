import { Article, ArticleType } from "entities/Article"
import { User } from "entities/User"

interface CarouselData {
    id?: string
    imgUrl?: string,
    title?: string
}
export interface RecommendationsData {
    id?: string
    title?: string
    subtitle?: string,
    views?: number
    type?: string[]

}
export interface RecentArticlesData {
    id?: string
    title?: string
    createdAt?: string,
    user?: User
}
export interface AllArticlesSchema {
    isLoading?: boolean
    error?: string
    articles?: Article[]
    data?: CarouselData[]
    recommendations: RecommendationsData[]
    recent: RecentArticlesData[]
}