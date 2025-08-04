import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Card, CardTheme } from 'shared/ui/Card/Card';
import { Text } from 'shared/ui/Text/Text';
import AppLink from 'shared/ui/AppLink/AppLink';
import { Notification } from '../../index';
import cls from './NotificationItem.module.scss';

interface NotificationItemProps {
    className?: string;
    item: Notification
}

export const NotificationItem = (props: NotificationItemProps) => {
    const { t } = useTranslation();
    const { className, item } = props;
    const content = (
        <Card theme={CardTheme.OUTLINE} className={classNames(cls.NotificationItem, {}, [className])}>
            <Text title={item.title} text={item.description} />
        </Card>
    );
    if (item.href) {
        return (
            <a target="_blank" href={item.href} rel="noreferrer" className={cls.NotificationItem}>
                {content}
            </a>

        );
    }
    return content;
};
