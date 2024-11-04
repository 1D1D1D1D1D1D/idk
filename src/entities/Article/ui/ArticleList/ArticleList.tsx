import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Article } from 'entities/Article/model/types/article';
import { useScroll } from 'shared/lib/hooks/useScroll/useScroll';
import { ArticleView } from '../../index';
import cls from './ArticleList.module.scss';
import { ArticleListItem } from '../ArticleListItem/ArticleListItem';
import { ArticleListItemSkeleton } from '../ArticleListItem/ArticleListItemSkeleton';

interface ArticleListProps {
    className?: string;
    article: Article[];
    isLoading?: boolean
    view: ArticleView
}

export const ArticleList = (props: ArticleListProps) => {
    const {
        className,
        article,
        isLoading,
        view,
    } = props;
    const { t } = useTranslation();
    const getSkeletons = (view: ArticleView) => new Array(view === ArticleView.GRID ? 9 : 3)
        .fill(0)
        .map((item, index) => (
            <ArticleListItemSkeleton className={cls.card} key={index} view={view} />
        ));

    const renderArticle = (article: Article) => (
        <ArticleListItem article={article} view={view} className={cls.card} key={article.id} />
    );

    return (
        <div className={classNames(cls.ArticleList, {}, [className, cls[view]])}>
            {article.length
                ? article.map(renderArticle)
                : null}

            {isLoading && getSkeletons(view)}
        </div>
    );
};
