import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { DynamicModuleLoader, ReducerList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { ArticleDetails } from 'entities/Article/ui/ArticleDetails/ArticleDetails';
import { Page } from 'widgets/Page/ui/Page';
import { ArticleRecommendationList } from 'features/articleRecommendationList';
import { ArticleRating } from 'features/articleRating';
import cls from './ArticleDetailsPage.module.scss';
import { ArticleDetailsPageHeader } from '../ArticleDetailsPageHeader/ArticleDetailsPageHeader';
import { ArticleDetailsComments } from '../ArticleDetailsComments/ArticleDetailsComments';
import { articleDetailsPageReducer } from '../../model/slice/index';

interface ArticleDetailsPageProps {
    className?: string;
}
const reducersList : ReducerList = {
    articleDetailsPage: articleDetailsPageReducer,

};
const ArticleDetailsPage = ({ className }: ArticleDetailsPageProps) => {
    const { id } = useParams<{id: string}>();
    if (!id) {
        return null;
    }
    return (
        <DynamicModuleLoader removeAfterUnmount reducers={reducersList}>
            <Page className={classNames(cls.ArticleDetailsPage, {}, [className])} data-testid="ArticleDetails">
                <ArticleDetailsPageHeader />
                <ArticleDetails id={id} />
                <ArticleRating articleId={id} />
                <ArticleRecommendationList className={cls.recomendations} />
                <ArticleDetailsComments className={cls.comments} id={id} />

            </Page>
        </DynamicModuleLoader>
    );
};
export default ArticleDetailsPage;
