
import {classNames} from 'shared/lib/classNames';
import cls from './Navbar.module.scss';
import AppLink, {AppLinkTheme} from 'shared/ui/AppLink/AppLink';
import {ThemeSwitcher} from 'widgets/ThemeSwitcher';
type NavBarProps = {
	className?: string;

};
const Navbar = ({className}: NavBarProps) => {
    return (
        <div className={classNames(cls.navbar, {}, [className])}>

            <div className={cls.links}>
                <AppLink theme={AppLinkTheme.SECONDARY} className={cls.mainLink} to={'/'}>Главная</AppLink>
                <AppLink theme={AppLinkTheme.SECONDARY} to={'/about'}>О сайте</AppLink>
            </div>

        </div>
    );
};

export default Navbar;
