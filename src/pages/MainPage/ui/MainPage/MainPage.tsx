import { useTranslation } from 'react-i18next';
import { Carousel } from 'shared/ui/Carousel/ui/Carousel';
import { Flex } from 'shared/ui/Stack/Flex/Flex';
import { HFlex } from 'shared/ui/Stack/HFlex/HFlex';
import { Text, TextSize } from 'shared/ui/Text/Text';
import { Page } from 'widgets/Page/ui/Page';
import { MostViewedArticles } from '../MostViewedArticles/MostViewedArticles';
import { VFlex } from 'shared/ui/Stack/VFlex/VFlex';
import cls from './MainPage.module.scss'
const MainPage = () => {

    const { t } = useTranslation();


    return (
        <Page data-testid="MainPage">
            <VFlex align='center' justify='center'>
                <Text text={t('Главная')} size={TextSize.L}></Text>
                <MostViewedArticles />

            </VFlex>

        </Page>
    );
};

export default MainPage;

