import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import cls from './ArticlesPage.module.scss';

interface ArticlePageProps {
    className?: string;
}

const ArticlesPage = memo(({ className }: ArticlePageProps) => (
    <div className={classNames(cls.ArticlePage, {}, [className])} />
));

export default ArticlesPage;
