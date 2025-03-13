import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useCallback, useEffect } from 'react';
import {

} from 'entities/Article/model/types/article';
import { DynamicModuleLoader, ReducerList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Page } from 'widgets/Page/ui/Page';
import { useSearchParams } from 'react-router-dom';
import cls from './ArticlesPage.module.scss';
import { articlesPageSliceReducer } from '../../model/slice/articlesPageSlice';

import { fetchArticleNextPage } from '../../model/services/fetchArticleNextPage/fetchArticleNextPage';
import { initArticlesPage } from '../../model/services/initArticlesPage/initArticlesPage';
import { ArticlesPageFilters } from '../ArticlesPageFilters/ui/ArticlesPageFilters';
import { ArticleIntfiniteList } from '../ArticleIntfiniteList/ArticleIntfiniteList';

interface ArticlePageProps {
    className?: string;
}

const reducers: ReducerList = {
    articlesPage: articlesPageSliceReducer,
};
const ArticlesPage = memo(({ className }: ArticlePageProps) => {
    const dispatch = useAppDispatch();
    const [searchParams, setSearchParams] = useSearchParams();

    const onLoadNextPage = useCallback(() => {
        dispatch(fetchArticleNextPage());
    }, [dispatch]);
    useEffect(() => {
        if (__PROJECT__ !== 'storybook') {
            dispatch(initArticlesPage(searchParams));
        }
    }, [dispatch, searchParams]);
    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false} data-testid="ArticlesPage">
            <Page className={classNames(cls.ArticlePage, {}, [className])} onScroll={onLoadNextPage}>
                <ArticlesPageFilters />
                <ArticleIntfiniteList className={cls.list} />
            </Page>
        </DynamicModuleLoader>
    );
});
export default ArticlesPage;
