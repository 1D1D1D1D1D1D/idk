import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Comment } from 'entities/Comment/model/types/comment';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import { Text } from 'shared/ui/Text/Text';
import { Skeleton } from 'shared/ui/Skeleton/Skeleton';
import cls from './CommentCard.module.scss';

interface CommentCardProps {
    className?: string;
    comment?: Comment
    isLoading?: boolean
}

export const CommentCard = (props: CommentCardProps) => {
    const {
        className, comment, isLoading,
    } = props;
    const { t } = useTranslation();

    if (isLoading) {
        return (
            <div className={classNames(cls.CommentCard, {}, [className])}>
                <div className={cls.header}>
                    <Skeleton width={40} height={40} border="50%" />
                    <Skeleton height={16} width={200} className={cls.username} />
                </div>
                <Skeleton width="100%" height={50} />
            </div>
        );
    }
    return (
        <div className={classNames(cls.CommentCard, {}, [className])}>
            <div className={cls.header}>
                {comment?.user.avatar && <Avatar src={comment?.user.avatar} width={40} height={40} round />}
                <Text title={comment?.user.username} className={cls.username} />
            </div>
            <Text text={comment?.text} />
        </div>
    );
};
