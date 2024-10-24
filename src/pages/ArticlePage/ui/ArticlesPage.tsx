import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useCallback, useEffect } from 'react';
import { ArticleList } from 'entities/Article';
import {
    Article, ArticleView,
} from 'entities/Article/model/types/article';
import { DynamicModuleLoader, ReducerList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { ArticleViewSelector } from 'features/ArticleViewSelector';
import cls from './ArticlesPage.module.scss';
import { articlesPageSliceActions, articlesPageSliceReducer, getArticle } from '../model/slice/articlesPageSlice';
import { fetchArticlesList } from '../model/services/fetchArticlesList/fetchArticlesList';
import { getArticlePageError, getArticlePageIsLoading, getArticlePageView } from '../model/selectors/articlePageSelectors';

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
    const erorr = useSelector(getArticlePageError);
    const view = useSelector(getArticlePageView);
    useEffect(() => {
        dispatch(fetchArticlesList());
    }, [dispatch]);

    const onChangeView = useCallback((view: ArticleView) => {
        dispatch(articlesPageSliceActions.setView(view));
        dispatch(articlesPageSliceActions.initState());
    }, [dispatch]);
    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
            <div className={classNames(cls.ArticlePage, {}, [className])}>
                <ArticleViewSelector onViewClick={onChangeView} view={view} className={cls.viewSelector} />
                <ArticleList
                    isLoading={isLoading}
                    view={view}
                    article={articles}
                />
            </div>
        </DynamicModuleLoader>
    );
});
export default ArticlesPage;
