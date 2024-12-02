import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useCallback, useEffect } from 'react';
import { ArticleList } from 'entities/Article';
import {

} from 'entities/Article/model/types/article';
import { DynamicModuleLoader, ReducerList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { Page } from 'widgets/Page/ui/Page';
import { useSearchParams } from 'react-router-dom';
import cls from './ArticlesPage.module.scss';
import { articlesPageSliceReducer, getArticle } from '../../model/slice/articlesPageSlice';
import {
    getArticlePageIsLoading, getArticlePageView,
} from '../../model/selectors/articlePageSelectors';
import { fetchArticleNextPage } from '../../model/services/fetchArticleNextPage/fetchArticleNextPage';
import { initArticlesPage } from '../../model/services/initArticlesPage/initArticlesPage';
import { ArticlesPageFilters } from '../ArticlesPageFilters/ui/ArticlesPageFilters';

interface ArticlePageProps {
    className?: string;
}

const reducers: ReducerList = {
    articlesPage: articlesPageSliceReducer,
};

const ArticlesPage = memo(({ className }: ArticlePageProps) => {
    const articles = useSelector(getArticle.selectAll);
    const isLoading = useSelector(getArticlePageIsLoading);
    const view = useSelector(getArticlePageView);
    const [searchParams, setSearchParams] = useSearchParams();
    console.log(searchParams);

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (__PROJECT__ !== 'storybook') {
            dispatch(initArticlesPage(searchParams));
        }
    }, [dispatch, searchParams]);

    const onLoadNextPage = useCallback(() => {
        dispatch(fetchArticleNextPage());
    }, [dispatch]);

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
            <Page className={classNames(cls.ArticlePage, {}, [className])} onScroll={onLoadNextPage}>
                <ArticlesPageFilters />
                <ArticleList
                    isLoading={isLoading}
                    view={view}
                    article={articles}
                    className={cls.list}
                />
            </Page>
        </DynamicModuleLoader>
    );
});
export default ArticlesPage;
