import { classNames } from 'shared/lib/classNames/classNames';
import { Page } from 'widgets/Page/ui/Page';
import { useParams } from 'react-router-dom';
import { EditArticleForm } from 'features/EditArticleForm/ui/EditArticleForm/EditArticleForm';
import { EditArticleHeader } from 'features/EditArticleForm/ui/EditArticleHeader/EditArticleHeader';
import { VFlex } from 'shared/ui/Stack/VFlex/VFlex';
import { memo } from 'react';

interface ArticleEditPageProps {
    className?: string;
}

const ArticleEditPage = memo(({ className }: ArticleEditPageProps) => {
    const { id } = useParams<{ id: string }>();
    return (
        <Page className={classNames('', {}, [className])}>
            <VFlex gap='8' align='end'>
                <EditArticleHeader />
            </VFlex>
            <EditArticleForm id={id} />

        </Page>
    );
});
export default ArticleEditPage;
