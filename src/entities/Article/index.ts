import { Article } from './model/types/article';
import {
    ArticleBlockType, ArticleSortField, ArticleType, ArticleView,
} from './model/consts/articleConsts';
import { ArticleDetailsSchema } from './model/types/ArticleDetailsSchema';
import { ArticleTypeTabs } from './ui/ArticleTypeTabs/ui/ArticleTypeTabs';
import { getArticleDetailsData } from './model/selectors/articleDetails';

export {
    type Article, type ArticleDetailsSchema, ArticleView, ArticleSortField, ArticleType, getArticleDetailsData, ArticleBlockType,
};
export { ArticleTypeTabs };
