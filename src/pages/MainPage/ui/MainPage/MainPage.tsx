import { useTranslation } from 'react-i18next';
import { Carousel } from 'shared/ui/Carousel/ui/Carousel';
import { Flex } from 'shared/ui/Stack/Flex/Flex';
import { HFlex } from 'shared/ui/Stack/HFlex/HFlex';
import { Text, TextSize } from 'shared/ui/Text/Text';
import { Page } from 'widgets/Page/ui/Page';
import { MostViewedArticles } from '../MostViewedArticles/MostViewedArticles';
import { VFlex } from 'shared/ui/Stack/VFlex/VFlex';
import cls from './MainPage.module.scss'
import { RecommendationListArticles } from '../RecommendationListArticles/RecommendationListArticles';
import { RecentArticlesList } from '../RecentArticlesList/RecentArticlesList';
const MainPage = () => {

    const { t } = useTranslation();

    return (
        <Page data-testid="MainPage">
            <VFlex align='center' justify='center'>
                <Text text={t('Главная')} size={TextSize.L}></Text>
                <MostViewedArticles />
            </VFlex>
            <Flex direction='row' justify='between' className={cls.lists} >
                <RecommendationListArticles className={cls.recommendations} />
                <RecentArticlesList className={cls.recent} />
            </Flex>
        </Page>
    );
};

export default MainPage;

