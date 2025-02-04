import { useTranslation } from 'react-i18next';
import { ArticleView } from 'entities/Article';
import { Text } from 'shared/ui/Text/Text';
import { VFlex } from 'shared/ui/Stack/VFlex/VFlex';
import { classNames } from 'shared/lib/classNames/classNames';
import { ArticleList } from 'entities/Article/ui/ArticleList/ArticleList';
import { useArticleRecomendationsList } from '../../api/articleRecommendationsApi';

interface articleRecommendationListProps {
    className?: string;
}

export const ArticleRecommendationList = (props: articleRecommendationListProps) => {
    const { className } = props;
    const { t } = useTranslation();
    const { isLoading, data, error } = useArticleRecomendationsList(3);
    if (isLoading || error) {
        return null;
    }
    console.log(data);
    console.log(className);

    return (
        <VFlex gap="8" align="normal">
            <Text title={t('Рекомендации')} />
            <ArticleList view={ArticleView.GRID} article={data} className={classNames('', {}, [className])} />
        </VFlex>
    );
};
