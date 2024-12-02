import { classNames } from 'shared/lib/classNames/classNames';
import { Select, SelectOptions } from 'shared/ui/Select/Select';
import { useMemo } from 'react';
import { ArticleSortField, SortOrder } from 'entities/Article/model/types/article';
import cls from './ArticleSortSelector.module.scss';

interface ArticleSortSelectorProps {
    className?: string;
    sort: ArticleSortField
    order: SortOrder
    onChangeOrder: (newOrder: SortOrder) => void
    onChangeSort: (newSort: ArticleSortField) => void
}

export const ArticleSortSelector = (props: ArticleSortSelectorProps) => {
    const {
        className,
        sort,
        order,
        onChangeOrder,
        onChangeSort,
    } = props;
    // const orderOptions = useMemo<SelectOptions[]>(() => [

    // ], []);

    const orderOptions = useMemo<SelectOptions<SortOrder>[]>(() => [
        {
            value: SortOrder.ASC,
            content: 'Возрастанию',
        },
        {
            value: SortOrder.DESC,
            content: 'Убыванию',
        },

    ], []);

    const sortOptions = useMemo<SelectOptions<ArticleSortField>[]>(() => [
        {
            value: ArticleSortField.CREATED,
            content: 'Созданию',
        },
        {
            value: ArticleSortField.TITLE,
            content: 'Названию',
        },
        {
            value: ArticleSortField.VIEWS,
            content: 'Просмотрам',
        },

    ], []);

    return (
        <div className={classNames(cls.ArticleSortSelector, {}, [className])}>
            <Select<ArticleSortField> options={sortOptions} label="Сортировать по " onChange={onChangeSort} value={sort} className={cls.sort} />
            <Select<SortOrder> options={orderOptions} label="по " onChange={onChangeOrder} value={order} />
        </div>
    );
};
