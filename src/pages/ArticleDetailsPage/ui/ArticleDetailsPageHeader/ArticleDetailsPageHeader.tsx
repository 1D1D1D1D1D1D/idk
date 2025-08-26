import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';
import Button from 'shared/ui/Button/Button';
import { useSelector } from 'react-redux';
import { getUserAuthData } from 'entities/User';
import { getArticleDetailsData } from 'entities/Article';
import { getCanEditArticle } from '../../model/selectors/article';
import cls from './ArticleDetailsPageHeader.module.scss';

interface ArticleDetailsPageHeaderProps {
    className?: string;
}

export const ArticleDetailsPageHeader = ({ className }: ArticleDetailsPageHeaderProps) => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const user = useSelector(getUserAuthData);
    const article = useSelector(getArticleDetailsData);
    const canEdit = useSelector(getCanEditArticle);
    const onBack = useCallback(() => {
        navigate(-1);
    }, [navigate]);

    const onEditArticle = useCallback(() => {
        // eslint-disable-next-line no-unsafe-optional-chaining
        navigate(`${RoutePath.article_details + article?.id}/edit`);
    }, [navigate, article?.id]);
    return (
        <div className={classNames(cls.ArticleDetailsPageHeader, {}, [className])}>
            <Button onClick={onBack}>{t('Назад')}</Button>

            {canEdit && <Button className={cls.ediBtn} onClick={onEditArticle}>{t('Редактировать')}</Button>}

        </div>
    );
};
