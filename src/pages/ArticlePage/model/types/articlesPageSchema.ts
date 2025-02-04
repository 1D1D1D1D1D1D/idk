import { EntityState } from '@reduxjs/toolkit';
import { Article, ArticleView } from 'entities/Article';
import { ArticleSortField, ArticleType, SortOrder } from 'entities/Article/model/consts/articleConsts';

export interface ArticlesPageSchema extends EntityState<Article, string> {
    isLoading?: boolean
    error?: string
    view?: ArticleView
    page: number
    limit: number
    hasMore: boolean
inited?: boolean
order: SortOrder
sort: ArticleSortField
search: string
type: ArticleType
}
