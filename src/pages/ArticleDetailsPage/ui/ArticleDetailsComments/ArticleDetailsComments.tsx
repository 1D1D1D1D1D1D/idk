import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { VFlex } from 'shared/ui/Stack/VFlex/VFlex';
import { TextAlign, Text } from 'shared/ui/Text/Text';
import { AddCommentForm } from 'features/addCommentForm';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { CommentList } from 'entities/Comment';
import { fetchCommentByArticleId } from '../../model/services/fetchCommentByArticleId/fetchCommentByArticleId';
import { getArticleCommentIsLoading } from '../../model/selectors/comments';
import { getArticleComments } from '../../model/slice/ArticleDetailsCommentSlice';
import { addCommentForArticle } from '../../model/services/addCommentForArticle/addCommentForArticle';

interface ArticleDetailsCommentsProps {
    className?: string;
    id: string
}

export const ArticleDetailsComments = (props: ArticleDetailsCommentsProps) => {
    const { className, id } = props;
    const comments = useSelector(getArticleComments.selectAll);
    const commentsIsLoading = useSelector(getArticleCommentIsLoading);

    const dispatch = useAppDispatch();
    useEffect(() => {
        console.log('useEffect triggered', id);
        if (__PROJECT__ !== 'storybook') {
            dispatch(fetchCommentByArticleId(id));
        }
    }, [id, dispatch]);
    const onSendComment = useCallback((text: string) => {
        dispatch(addCommentForArticle(text));
    }, [dispatch]);

    const { t } = useTranslation();
    return (
        <VFlex gap="4" className={className}>
            <Text align={TextAlign.LEFT} title={t('Комментарии')} />
            <AddCommentForm onSendComment={onSendComment} />
            <CommentList isLoading={commentsIsLoading} comments={comments} />
        </VFlex>
    );
};
