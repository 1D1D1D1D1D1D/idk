import { useTranslation } from 'react-i18next';
import { Page } from 'widgets/Page/ui/Page';

const AboutPage = () => {
    const { t } = useTranslation();
    return (
        <Page data-testid="AboutPage">
            {t('О сайте')}
        </Page>
    );
};

export default AboutPage;
