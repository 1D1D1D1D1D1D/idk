import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Button, { ThemeButton } from 'shared/ui/Button/Button';
import { useDispatch, useSelector } from 'react-redux';
import { getUserAuthData } from 'entities/User/model/selectors/getUserAuthData/getUserAuthData';
import { userActions } from 'entities/User';
import AppLink, { AppLinkTheme } from 'shared/ui/AppLink/AppLink';
import { routeConfig, RoutePath } from 'shared/config/routeConfig/routeConfig';
import { HFlex } from 'shared/ui/Stack/HFlex/HFlex';
import { Flex } from 'shared/ui/Stack/Flex/Flex';
import { Dropdown } from 'shared/ui/Dropdown/Dropdown';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import { LoginModal } from 'features/AuthByUsername/ui/LoginModal/LoginModal';
import cls from './Navbar.module.scss';

type NavBarProps = {
    className?: string;
};
export const Navbar = memo(({ className }: NavBarProps) => {
    const [isAuthModal, setIsAuthModal] = useState(false);
    const { t } = useTranslation();
    const authData = useSelector(getUserAuthData);
    const dispatch = useDispatch();
    const onCloseModal = useCallback(() => {
        setIsAuthModal(false);
    }, []);
    const onShowModal = useCallback(() => {
        setIsAuthModal(true);
    }, []);
    const onLogout = useCallback(() => {
        dispatch(userActions.logOut());
    }, [dispatch]);

    return (
        <aside className={classNames(cls.navbar, {}, [className])}>
            {authData ? (
                <>
                    <AppLink to={RoutePath.article_create} theme={AppLinkTheme.SECONDARY}>
                        {t('Создать статью')}
                    </AppLink>
                    <Dropdown
                        direction="bottom left"
                        className={cls.dropdown}
                        items={
                            [
                                { content: t('Профиль'), href: RoutePath.profile + authData.id },
                                { content: t('Выйти'), onClick: onLogout },
                            ]
                        }
                        trigger={<Avatar round width={30} height={30} src={authData.avatar} />}
                    />

                </>

            )
                : (
                    <div className={cls.links}>
                        <Button onClick={onShowModal} theme={ThemeButton.CLEAR_INVERTED}>
                            {t('Войти')}
                        </Button>
                    </div>
                )}

            {isAuthModal && <LoginModal isOpen={isAuthModal} onClose={onCloseModal} />}

        </aside>
    );
});
