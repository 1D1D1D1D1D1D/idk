import { classNames } from 'shared/lib/classNames/classNames';
import Button, { ThemeButton } from 'shared/ui/Button/Button';
import NotificationIcon from 'shared/assets/icons/notification.svg';
import { Icon } from 'shared/ui/Icon/Icon';
import { useCallback, useState } from 'react';
import { NotificationList } from 'entities/Notification';
import { Drawer } from 'shared/ui/Drawer/Drawer';
import {
    BrowserView, isBrowser, MobileView,
} from 'react-device-detect';
import { Popover } from 'shared/ui/Popover/Popover';
import { AnimationProvider } from 'shared/lib/components/AnimationProvider';
import cls from './NotificationButton.module.scss';

interface NotificationButtonProps {
    className?: string;
}

export const NotificationButton = ({ className }: NotificationButtonProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const onOpenDrawer = useCallback(() => {
        setIsOpen(true);
    }, []);
    const onCloseDrawer = useCallback(() => {
        setIsOpen(false);
    }, []);
    const trigger = (
        <Button onClick={onOpenDrawer} theme={ThemeButton.CLEAR} className={classNames(cls.NotificationButton, {}, [className])}>
            <Icon Svg={NotificationIcon} className={cls.icon} />
        </Button>

    );

    return (
        <div>
            {isBrowser ? (
                <BrowserView className={cls.dropdown}>
                    <Popover trigger={trigger}>
                        <NotificationList className={cls.notifications} />
                    </Popover>
                </BrowserView>
            )
                : (
                    <MobileView>
                        {trigger}
                        <AnimationProvider>
                            <Drawer isOpen={isOpen} onClose={onCloseDrawer}>
                                <NotificationList />
                            </Drawer>
                        </AnimationProvider>

                    </MobileView>
                )}

        </div>

    );
};
