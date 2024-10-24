import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Text } from 'shared/ui/Text/Text';
import { Icon } from 'shared/ui/Icon/Icon';
import ViewsIcon from 'shared/assets/icons/eye-20-20.svg';
import { Card } from 'shared/ui/Card/Card';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import Button, { ThemeButton } from 'shared/ui/Button/Button';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import cls from './ArticleListItem.module.scss';
import { Article, ArticleBlockType, ArticleTextBlock } from '../../model/types/article';
import { ArticleView } from '../../index';
import { ArticleTextBlockComponent } from '../ArticleTextBlockComponent/ArticleTextBlockComponent';

interface ArticleListItemProps {
    className?: string;
    article: Article
    view: ArticleView

}

export const ArticleListItem = ({ className, article, view }: ArticleListItemProps) => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    // const { isHover, onMouseEnter, onMouseLeave } = useHover();

    const onOpenArticle = useCallback(() => {
        navigate(RoutePath.article_details + article.id);
    }, [article.id, navigate]);

    if (view === ArticleView.LIST) {
        const textBlock = article.blocks.find((block) => block.type === ArticleBlockType.TEXT) as ArticleTextBlock;
        return (
            <div className={classNames(cls.ArticleListItem, {}, [className, cls[view]])}>
                <Card>
                    <div className={cls.header}>
                        <Avatar width={30} height={30} src={article.user.avatar} round />
                        <Text text={article.user.username} className={cls.username} />
                        <Text text={article.createdAt} className={cls.date} />
                    </div>
                    <Text title={article.title} className={cls.title} />
                    <Text text={article.type.join(',')} className={cls.types} />
                    <img src={article.img} alt={article.title} className={cls.image} />
                    <div className={cls.textBlock}>
                        {textBlock && <ArticleTextBlockComponent block={textBlock} />}

                    </div>

                    <div className={cls.footer}>
                        <Button theme={ThemeButton.OUTLINE} onClick={onOpenArticle}>
                            {t('Читать')}
                        </Button>
                        <Text text={String(article.views)} className={cls.views} />
                    </div>
                </Card>
            </div>
        );
    }
    return (
        <div
            className={classNames(cls.ArticleListItem, {}, [className, cls[view]])}
            onClick={onOpenArticle}
            // onMouseEnter={onMouseEnter}
            // onMouseLeave={onMouseLeave}
        >
            <Card className={classNames(cls.card, {}, [className, cls[view]])}>
                <div className={cls.imageWrapper}>
                    <img src={article.img} alt={article.title} className={cls.image} />
                    <Text text={article.createdAt} className={cls.date} />
                </div>
                <div className={cls.infoWrapper}>
                    <Text text={article.type.join(',')} className={cls.types} />
                    <Text text={String(article.views)} className={cls.views} />
                    <Icon Svg={ViewsIcon} />
                </div>
                <Text text={article.title} />
            </Card>
        </div>
    );
};
