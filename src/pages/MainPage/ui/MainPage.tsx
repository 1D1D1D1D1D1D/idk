import { useTranslation } from 'react-i18next';
import { Page } from 'widgets/Page/ui/Page';

const MainPage = () => {
    const { t } = useTranslation();

    return (
        <Page>
            {t('Главная страница')}
            {/* <ListBox
                onChange={(value: string) => {}}
                value=""
                items={
                    [
                        { value: '1', content: '123', disabled: false },
                        { value: '2', content: '123', disabled: true },
                        { value: '3', content: '123', disabled: false },
                    ]
                }
            /> */}
        </Page>
    );
};

export default MainPage;
