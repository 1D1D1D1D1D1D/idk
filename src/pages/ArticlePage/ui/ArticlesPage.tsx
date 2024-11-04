import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useCallback, useEffect } from 'react';
import { ArticleList } from 'entities/Article';
import {
    ArticleView,
} from 'entities/Article/model/types/article';
import { DynamicModuleLoader, ReducerList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { ArticleViewSelector } from 'features/ArticleViewSelector';
import { Page } from 'shared/ui/Page/Page';
import cls from './ArticlesPage.module.scss';
import { articlesPageSliceActions, articlesPageSliceReducer, getArticle } from '../model/slice/articlesPageSlice';
import { fetchArticlesList } from '../model/services/fetchArticlesList/fetchArticlesList';
import {
    getArticlePageError, getArticlePageHasMore, getArticlePageIsLoading, getArticlePageNum, getArticlePageView,
} from '../model/selectors/articlePageSelectors';
import { fetchArticleNextPage } from '../model/services/fetchArticleNextPage/fetchArticleNextPage';

interface ArticlePageProps {
    className?: string;
}

const reducers: ReducerList = {
    articlesPage: articlesPageSliceReducer,
};

const ArticlesPage = memo(({ className }: ArticlePageProps) => {
    const dispatch = useAppDispatch();
    const articles = useSelector(getArticle.selectAll);
    const isLoading = useSelector(getArticlePageIsLoading);
    const error = useSelector(getArticlePageError);
    const view = useSelector(getArticlePageView);
    const currentPage = useSelector(getArticlePageNum);
    const hasMore = useSelector(getArticlePageHasMore);

    useEffect(() => {
        if (__PROJECT__ !== 'storybook') {
            dispatch(articlesPageSliceActions.initState());
            dispatch(fetchArticlesList({
                page: 1,
            }));
        }
    }, [dispatch]);

    const onLoadNextPage = useCallback(() => {
        dispatch(fetchArticleNextPage());
    }, [dispatch]);

    const onChangeView = useCallback((view: ArticleView) => {
        dispatch(articlesPageSliceActions.setView(view));
    }, [dispatch]);
    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
            <Page className={classNames(cls.ArticlePage, {}, [className])} onScroll={onLoadNextPage}>
                <ArticleViewSelector onViewClick={onChangeView} view={view} className={cls.viewSelector} />
                <ArticleList
                    isLoading={isLoading}
                    view={view}
                    article={articles}
                    className={cls.ArticleList}
                />
            </Page>
        </DynamicModuleLoader>
    );
});
export default ArticlesPage;
