import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Button, { ThemeButton } from 'shared/ui/Button/Button';
import { LoginModal } from 'features';
import { useDispatch, useSelector } from 'react-redux';
import { getUserAuthData } from 'entities/User/model/selectors/getUserAuthData/getUserAuthData';
import { userActions } from 'entities/User';
import AppLink, { AppLinkTheme } from 'shared/ui/AppLink/AppLink';
import { routeConfig, RoutePath } from 'shared/config/routeConfig/routeConfig';
import cls from './Navbar.module.scss';

type NavBarProps = {
	className?: string;
};
export const Navbar = memo(({ className }: NavBarProps) => {
    const [isAuthModal, setIsAuthModal] = useState(false);
    const { t } = useTranslation();
    const isLogin = useSelector(getUserAuthData);
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
        <header className={classNames(cls.navbar, {}, [className])}>
            {isLogin ? (
                <div className={cls.logined}>
                    <AppLink to={RoutePath.article_create} theme={AppLinkTheme.SECONDARY}>
                        {t('Создать статью')}
                    </AppLink>
                    <Button onClick={onLogout} className={cls.logoutBtn} theme={ThemeButton.CLEAR_INVERTED}>
                        {t('Выйти')}
                    </Button>
                </div>

            )
                : (
                    <Button onClick={onShowModal} className={cls.links} theme={ThemeButton.CLEAR_INVERTED}>
                        {t('Войти')}
                    </Button>
                )}

            { isAuthModal && <LoginModal isOpen={isAuthModal} onClose={onCloseModal} />}

        </header>
    );
});
