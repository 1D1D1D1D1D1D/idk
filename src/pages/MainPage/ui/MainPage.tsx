import { useTranslation } from 'react-i18next';
import { Page } from 'widgets/Page/ui/Page';
const MainPage = () => {

    const { t } = useTranslation();
    const objString = '{"body": "{\\"messages\\":[{\\"role\\":\\"user\\",\\"content\\":\\"template text\\"}],\\"stream\\":true,\\"model\\":\\"openai/gpt-4o\\"}", "headers": { "Authorization": "Bearer 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", "Content-Type": "application/json" }, "method": "POST"}';


    const obj = JSON.parse(objString);
    console.log(objString);
    let values = Object.entries(obj)
    console.log(values);
    const newObj = Object.fromEntries(values);
    console.log(newObj);
    return (
        <Page data-testid="MainPage">
            {t('Главная страница')}
        </Page>
    );
};

export default MainPage;

