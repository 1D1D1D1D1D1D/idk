import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { DynamicModuleLoader, ReducerList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { ArticleDetails } from 'entities/Article/ui/ArticleDetails/ArticleDetails';
import { Page } from 'widgets/Page/ui/Page';
import { ArticleRecommendationList } from 'features/articleRecommendationList';
import cls from './ArticleDetailsPage.module.scss';
import { ArticleDetailsCommentReducer } from '../../model/slice/ArticleDetailsCommentSlice';
import { ArticleDetailsRecomendationtReducer } from '../../model/slice/ArticleDetailsRecomendationSlice';
import { ArticleDetailsPageHeader } from '../ArticleDetailsPageHeader/ArticleDetailsPageHeader';
import { ArticleDetailsComments } from '../ArticleDetailsComments/ArticleDetailsComments';

interface ArticleDetailsPageProps {
    className?: string;
}
const reducersList : ReducerList = {
    articleDetailsComments: ArticleDetailsCommentReducer,
    articleDetailsRecomendation: ArticleDetailsRecomendationtReducer,
};
const ArticleDetailsPage = ({ className }: ArticleDetailsPageProps) => {
    const { t } = useTranslation();
    const { id } = useParams<{id: string}>();

    if (!id) {
        console.log(id);

        return (
            <div className={classNames(cls.ArticleDetailsPage, {}, [className])}>
                {t('Статья не найдена')}
            </div>
        );
    }

    return (
        <DynamicModuleLoader removeAfterUnmount reducers={reducersList}>
            <Page className={classNames(cls.ArticleDetailsPage, {}, [className])}>
                <ArticleDetailsPageHeader />
                <ArticleDetails id={id} />
                <ArticleRecommendationList className={cls.recomendations} />
                <ArticleDetailsComments className={cls.comments} id={id} />

            </Page>
        </DynamicModuleLoader>
    );
};
export default ArticleDetailsPage;
