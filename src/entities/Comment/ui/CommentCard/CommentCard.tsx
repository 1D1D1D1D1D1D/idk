import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import { Text } from 'shared/ui/Text/Text';
import { Skeleton } from 'shared/ui/Skeleton/Skeleton';
import AppLink from 'shared/ui/AppLink/AppLink';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { Comment } from '../../model/types/comment';
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
        <div className={classNames(cls.CommentCard, {}, [className])} data-testid="CommentCardContent"  >

            <AppLink to={`${RoutePath.profile}${comment?.user.id}`} className={cls.avatarWrapper}>
                {comment?.user.avatar
                    && <Avatar src={comment?.user.avatar} size={40} round />}
            </AppLink>
            <div className={cls.textWrapper}>
                <AppLink to={`${RoutePath.profile}${comment?.user.id}`}>
                    <Text title={comment?.user.username} />
                </AppLink>
                <Text text={comment?.text} />

            </div>
        </div>
    );
};
