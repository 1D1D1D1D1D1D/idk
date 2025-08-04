import { classNames } from 'shared/lib/classNames/classNames';
import { VFlex } from 'shared/ui/Stack/VFlex/VFlex';
import { TubeSpinner } from 'shared/ui/TubeSpinner/TubeSpinner';
import { HFlex } from 'shared/ui/Stack/HFlex/HFlex';
import { Notification } from '../../index';
import { useNotifications } from '../../api/notificationApi';
import cls from './NotificationList.module.scss';
import { NotificationItem } from '../NotificationItem/NotificationItem';

interface NotificationListProps {
    className?: string;
}

export const NotificationList = ({ className }: NotificationListProps) => {
    const { data, isLoading } = useNotifications(null);

    if (isLoading) {
        return (
            <HFlex align="center" justify="center" className={classNames(cls.loading, {}, [className])}>
                <TubeSpinner className={cls.spinner} />
            </HFlex>
        );
    }
    return (
        <VFlex gap="16" align="center" justify="center" className={classNames(cls.NotificationList, {}, [className])}>
            {data?.map((item: Notification) => (
                <NotificationItem key={item.id} item={item} />
            ))}
        </VFlex>
    );
};
