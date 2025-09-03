import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import cls from './RecentArticlesList.module.scss';
import { HFlex } from 'shared/ui/Stack/HFlex/HFlex';
import { Text } from 'shared/ui/Text/Text';
import { TextSize } from 'shared/ui/Text/Text';
import { useSelector } from 'react-redux';
import { getArticlesRecent } from 'pages/MainPage/services/selectors/selectors';
import { RecentArticlesData } from 'pages/MainPage/types/AllArticlesSchema';
import { VFlex } from 'shared/ui/Stack/VFlex/VFlex';
import AppLink from 'shared/ui/AppLink/AppLink';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';

interface RecentArticlesProps {
    className?: string;
}

export const RecentArticlesList = ({ className }: RecentArticlesProps) => {
    const { t } = useTranslation();
    const articles = useSelector(getArticlesRecent)
    const renderRecentArticles = (recent: RecentArticlesData[]) => (
        recent.map((item) => (
            <VFlex align='start' justify='start' className={cls.card} key={item.title} >
                <AppLink to={RoutePath.article_details + item.id}>
                    <Text text={item.title} size={TextSize.L}></Text>
                </AppLink>
                <Text text={item.createdAt} size={TextSize.M}></Text>
                <Text text={item.user?.username} size={TextSize.M}></Text>

            </VFlex>
        ))
    )
    return (
        <VFlex align='start' justify='start' className={classNames(cls.RecommendationListArticles, {}, [className])}>
            <VFlex>
                <Text text={t('Последние статьи')} size={TextSize.L}></Text>
            </VFlex>
            <>
                {articles && renderRecentArticles(articles)}

            </>
        </VFlex>
    );
};