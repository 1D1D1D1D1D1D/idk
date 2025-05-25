import { classNames } from 'shared/lib/classNames/classNames';
import { ArticleViewSelector } from 'features/ArticleViewSelector';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { ArticleSortField, ArticleView } from 'entities/Article';
import { useCallback } from 'react';

import { Card } from 'shared/ui/Card/Card';
import { Input } from 'shared/ui/Input/Input';
import { ArticleType, SortOrder } from 'entities/Article/model/consts/articleConsts';
import { useDebounce } from 'shared/lib/hooks/useDebounce/useDebounce';
import { ArticleSortSelector } from 'features/ArticleSortSelector/ui/ArticleSortSelector';
import { ArticleTypeTabs } from 'features/ArticleTypeTabs/ui/ArticleTypeTabs';
import {
    getArticlePageOrder, getArticlePageSearch, getArticlePageSelectedTypes, getArticlePageSort,
    // getArticlePageType,
    getArticlePageView,
} from '../../../model/selectors/articlePageSelectors';
import { fetchArticlesList } from '../../../model/services/fetchArticlesList/fetchArticlesList';
import { articlesPageSliceActions } from '../../../model/slice/articlesPageSlice';

import cls from './ArticlesPageFilters.module.scss';

interface ArticlesPageFiltersProps {
    className?: string;
}

export const ArticlesPageFilters = ({ className }: ArticlesPageFiltersProps) => {
    const dispatch = useAppDispatch();
    const view = useSelector(getArticlePageView);
    const order = useSelector(getArticlePageOrder);
    const search = useSelector(getArticlePageSearch);
    const sort = useSelector(getArticlePageSort);
    const type = useSelector(getArticlePageSelectedTypes);

    const fetchData = useCallback(() => {
        dispatch(fetchArticlesList({ replace: true }));
    }, [dispatch]);
    const onChangeView = useCallback((view: ArticleView) => {
        dispatch(articlesPageSliceActions.setView(view));
        dispatch(articlesPageSliceActions.setPage(1));
    }, [dispatch]);

    const onChangeSort = useCallback((sort: ArticleSortField) => {
        dispatch(articlesPageSliceActions.setSort(sort));
        dispatch(articlesPageSliceActions.setPage(1));
        fetchData();
    }, [dispatch, fetchData]);

    const onChangeOrder = useCallback((order: SortOrder) => {
        dispatch(articlesPageSliceActions.setOrder(order));
        dispatch(articlesPageSliceActions.setPage(1));
        fetchData();
    }, [dispatch, fetchData]);

    const debounceSearch = useDebounce(fetchData, 500);
    const debounceChangeType = useDebounce(fetchData, 1000);
    const onChangeSearch = useCallback((search: string) => {
        dispatch(articlesPageSliceActions.setSearch(search));
        dispatch(articlesPageSliceActions.setPage(1));
        debounceSearch();
    }, [dispatch, debounceSearch]);

    const onChangeType = useCallback((value: ArticleType) => {
        dispatch(articlesPageSliceActions.setSelected(value));
        dispatch(articlesPageSliceActions.setPage(1));
        debounceChangeType()
    }, [dispatch, debounceChangeType]);
    return (
        <div className={classNames(cls.ArticlesPageFilters, {}, [className])}>
            <div className={cls.sortWrapper}>
                <ArticleSortSelector sort={sort} order={order} onChangeSort={onChangeSort} onChangeOrder={onChangeOrder} />
                <ArticleViewSelector onViewClick={onChangeView} view={view} className={cls.viewSelector} />
            </div>
            <Card className={cls.search}>
                <Input placeholder="Search" onChange={onChangeSearch} value={search} />
            </Card>
            <ArticleTypeTabs
                onChangeType={onChangeType}
                value={type}
            />
        </div>
    );
};
