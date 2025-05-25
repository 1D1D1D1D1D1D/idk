
import { useTranslation } from 'react-i18next';

import { Page } from 'widgets/Page/ui/Page';

const MainPage = () => {


    const { t } = useTranslation();

    // const test = fetch('http://localhost:8000/chat', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ messages: [{ role: 'user', content: 'ты говоришь по  русски?' }] })
    // })
    return (
        <Page data-testid="MainPage">
            {t('Главная страница')}
        </Page>
    );
};

export default MainPage;
