import { classNames } from 'shared/lib/classNames/classNames';
import cls from './ArticleDetailsPreviewPage.module.scss'
import { useSelector } from 'react-redux';
import { getAiInputResult } from 'features/EditArticleAiHelper/model/selectors/selectors';
import { Page } from 'widgets/Page/ui/Page';
import { DynamicModuleLoader, ReducerList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { articleAiReducer } from 'features/EditArticleAiHelper/model/slice/articleAiSlice';
import { ArticleDetailsPreviewPageHeader } from '../ArticleDetailsPreviewPageHeader/ArticleDetailsPreviewPageHeader';
import { ArticleDetailsPreview } from 'widgets/ArticleDetailsPreview/ui/ArticleDetailsPreview';


interface ArticleDetailsPreviewProps {
    className?: string;
}

const ArticleDetailsPreviewPage = (props: ArticleDetailsPreviewProps) => {
    const reducers: ReducerList = {
        articleAiInput: articleAiReducer


    };
    const data = useSelector(getAiInputResult)
    console.log(data);

    const {
        className
    } = props
    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
            <Page className={classNames(cls.ArticleDetailsPreview, {}, [className])}>
                <ArticleDetailsPreviewPageHeader />
                <ArticleDetailsPreview data={data} />
            </Page>
        </DynamicModuleLoader>
    );
};
export default ArticleDetailsPreviewPage