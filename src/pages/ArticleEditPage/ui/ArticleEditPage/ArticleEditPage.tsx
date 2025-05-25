import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Page } from 'widgets/Page/ui/Page';
import { useParams } from 'react-router-dom';
import { EditArticleForm } from 'features/EditArticleForm/ui/EditArticleForm/EditArticleForm';
import { EditArticleHeader } from 'features/EditArticleForm/ui/EditArticleHeader/EditArticleHeader';

interface ArticleEditPageProps {
    className?: string;
}

const ArticleEditPage = ({ className }: ArticleEditPageProps) => {
    const { t } = useTranslation();
    const { id } = useParams<{ id: string }>();
    const isEditable = Boolean(id);
    return (
        <Page className={classNames('', {}, [className])}>
            <div>
                {isEditable ? `Редактирование${id}` : 'Создание'}
                <EditArticleHeader />
                <EditArticleForm id={id} />
            </div>
        </Page>
    );
};
export default ArticleEditPage;
