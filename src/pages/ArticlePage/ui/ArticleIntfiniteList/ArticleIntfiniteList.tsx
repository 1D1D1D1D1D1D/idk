import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { ArticleList } from 'entities/Article';
import { useSelector } from 'react-redux';
import { useCallback, useEffect } from 'react';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSearchParams } from 'react-router-dom';
import { initArticlesPage } from '../../model/services/initArticlesPage/initArticlesPage';
import { getArticle } from '../../model/slice/articlesPageSlice';
import { fetchArticleNextPage } from '../../model/services/fetchArticleNextPage/fetchArticleNextPage';
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
