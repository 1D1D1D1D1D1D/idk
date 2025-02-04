import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { ArticleList } from 'entities/Article/ui/ArticleList/ArticleList';
import { getArticle } from '../../model/slice/articlesPageSlice';
import { getArticlePageIsLoading, getArticlePageView } from '../../model/selectors/articlePageSelectors';

interface ArticleIntfiniteListProps {
    className?: string;
}

export const ArticleIntfiniteList = ({ className }: ArticleIntfiniteListProps) => {
    const articles = useSelector(getArticle.selectAll);
    const isLoading = useSelector(getArticlePageIsLoading);
    const view = useSelector(getArticlePageView);
    const { t } = useTranslation();

    return (
        <ArticleList
            isLoading={isLoading}
            view={view}
            article={articles}
            className={className}
        />
    );
};
