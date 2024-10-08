import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Comment } from 'entities/Comment/model/types/comment';
import { Text } from 'shared/ui/Text/Text';
import cls from './CommentList.module.scss';
import { CommentCard } from '../CommentCard/CommentCard';

interface CommentListProps {
    className?: string;
    comments?: Comment[]
    isLoading?: boolean

}

export const CommentList = (props: CommentListProps) => {
    const {
        className, comments, isLoading,
    } = props;
    const { t } = useTranslation();
    return (
        <div className={classNames(cls.CommentList, {}, [className])}>
            {comments?.length
                ? comments.map((comment) => (
                    <CommentCard className={cls.comment} comment={comment} isLoading={isLoading} />
                ))
                : <Text title={t('Нет комментариев')} />}
        </div>
    );
};
