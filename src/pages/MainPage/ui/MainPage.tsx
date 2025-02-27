import { RatingCard } from 'entities/Rating';
import { useTranslation } from 'react-i18next';
import { StarRating } from 'shared/ui/StarRating/StarRating';

import { Page } from 'widgets/Page/ui/Page';

const MainPage = () => {
    const { t } = useTranslation();

    return (
        <Page>
            {t('Главная страница')}
            <RatingCard title="asdas" feedbackTitile="rate article" />
        </Page>
    );
};

export default MainPage;
