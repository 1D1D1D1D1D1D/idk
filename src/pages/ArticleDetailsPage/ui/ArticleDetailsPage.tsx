import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { ArticleDetails } from 'entities/Article';
import { useParams } from 'react-router-dom';
import { CommentList } from 'entities/Comment';
import { Text, TextAlign } from 'shared/ui/Text/Text';
import { DynamicModuleLoader, ReducerList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import cls from './ArticleDetailsPage.module.scss';
import { ArticleDetailsCommentReducer, getArticleComments } from '../model/slice/ArticleDetailsCommentSlice';
import { getArticleCommentError, getArticleCommentIsLoading } from '../model/selectors/comments';
import { fetchCommentByArticleId } from '../model/services/fetchCommentByArticleId/fetchCommentByArticleId';

interface ArticleDetailsPageProps {
    className?: string;
}
const reducersList : ReducerList = {
    articleDetailsComments: ArticleDetailsCommentReducer,
};
const ArticleDetailsPage = ({ className }: ArticleDetailsPageProps) => {
    const { t } = useTranslation();
    const { id } = useParams<{id: string}>();
    const comments = useSelector(getArticleComments.selectAll);
    const commentsIsLoading = useSelector(getArticleCommentIsLoading);
    const error = useSelector(getArticleCommentError);
    const dispatch = useAppDispatch();
    useEffect(() => {
        console.log('useEffect triggered', id);
        if (__PROJECT__ !== 'storybook') {
            dispatch(fetchCommentByArticleId(id));
        }
    }, [id, dispatch]);
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
            <div className={classNames(cls.ArticleDetailsPage, {}, [className])}>
                <ArticleDetails id={id} />
                <Text align={TextAlign.LEFT} title={t('Комментарии')} />
                <CommentList isLoading={commentsIsLoading} comments={comments} />
            </div>
        </DynamicModuleLoader>
    );
};
export default ArticleDetailsPage;
function dispatch(arg0: any) {
    throw new Error('Function not implemented.');
}
