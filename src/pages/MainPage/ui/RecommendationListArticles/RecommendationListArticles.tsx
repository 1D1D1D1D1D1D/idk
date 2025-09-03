import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import cls from './RecommendationListArticles.module.scss';
import { HFlex } from 'shared/ui/Stack/HFlex/HFlex';
import { Text, TextSize } from 'shared/ui/Text/Text';
import { useSelector } from 'react-redux';
import { getArticlesRecommendations } from 'pages/MainPage/services/selectors/selectors';
import { RecommendationsData } from 'pages/MainPage/types/AllArticlesSchema';
import { VFlex } from 'shared/ui/Stack/VFlex/VFlex';
import AppLink from 'shared/ui/AppLink/AppLink';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import ViewsIcon from '../../../../shared/assets/icons/eye-20-20.svg'
import { Icon } from 'shared/ui/Icon/Icon';
interface RecommendationListArticlesProps {
    className?: string;
}

export const RecommendationListArticles = ({ className }: RecommendationListArticlesProps) => {
    const { t } = useTranslation();
    const recommendations = useSelector(getArticlesRecommendations)


    const renderRecommendation = (recommendations: RecommendationsData[]) => (
        recommendations.map((item) => (
            <VFlex align='start' justify='start' className={cls.card} key={item.title} >
                <AppLink to={RoutePath.article_details + item.id}>
                    <Text text={item.title} size={TextSize.L}></Text>
                </AppLink>
                <Text text={item.subtitle} size={TextSize.M}></Text>
                <HFlex align='center' gap='4'>
                    <Text text={`${item.views?.toString() + ' '}`} size={TextSize.M}></Text>
                    <Icon Svg={ViewsIcon} />
                    <Text text={item.type?.join(', ')} size={TextSize.M}></Text>
                </HFlex>
            </VFlex>
        ))
    )
    return (
        <VFlex align='start' justify='start' className={classNames(cls.RecommendationListArticles, {}, [className])}>
            <VFlex>
                <Text text={t('Рекомендации')} size={TextSize.L}></Text>
            </VFlex>
            <>
                {recommendations && renderRecommendation(recommendations)}
            </>
        </VFlex>
    );
};