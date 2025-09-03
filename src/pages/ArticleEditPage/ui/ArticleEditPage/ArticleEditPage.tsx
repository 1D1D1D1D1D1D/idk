import { classNames } from 'shared/lib/classNames/classNames';
import { Page } from 'widgets/Page/ui/Page';
import { useParams } from 'react-router-dom';
import { EditArticleForm } from 'features/EditArticleForm/ui/EditArticleForm/EditArticleForm';
import { EditArticleHeader } from 'features/EditArticleForm/ui/EditArticleHeader/EditArticleHeader';
import { VFlex } from 'shared/ui/Stack/VFlex/VFlex';
import { memo } from 'react';
import { DynamicModuleLoader, ReducerList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { articleDetailsReducer } from 'entities/Article/model/slice/articleDetailsSlice';
import { EditArticleReducer } from 'features/EditArticleForm/model/slice/EditArticleSlice';
import { articleAiReducer } from 'features/EditArticleAiHelper/model/slice/articleAiSlice';

interface ArticleEditPageProps {
    className?: string;
}
const reducers: ReducerList = {
    articleDetails: articleDetailsReducer,
    editArticleForm: EditArticleReducer,
    articleAiInput: articleAiReducer
};
const ArticleEditPage = memo(({ className }: ArticleEditPageProps) => {
    const { id } = useParams<{ id: string }>();
    return (
        <DynamicModuleLoader removeAfterUnmount reducers={reducers}>

            <Page className={classNames('', {}, [className])}>
                <VFlex gap='8' align='end'>
                    <EditArticleHeader />
                </VFlex>
                <EditArticleForm id={id} />

            </Page>
        </DynamicModuleLoader>

    );
});
export default ArticleEditPage;
