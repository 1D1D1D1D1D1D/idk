import {type FC, useState} from 'react';
import {classNames} from 'shared/lib/classNames/classNames';
import cls from './Sidebar.module.scss';
import {ThemeSwitcher} from 'widgets/ThemeSwitcher';
import LanguageSwitcher from 'widgets/LanguageSwitcher/LanguageSwitcher';
import Button, { ButtonSize, ThemeButton } from 'shared/ui/Button/Button';
import AppLink, { AppLinkTheme } from 'shared/ui/AppLink/AppLink';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import AboutIcon from 'shared/assets/icons/about-20-20.svg'
import MainIcon from 'shared/assets/icons/main-20-20.svg'
import {useTranslation} from 'react-i18next';
type SidebarProps = {
	className?: string;
};
const Sidebar: FC<SidebarProps> = ({className}: SidebarProps) => {
    const {t} = useTranslation();

    const [collapsed, setCollapsed] = useState(false);

    const onToggle = () => {
        setCollapsed(prev => !prev);
    };

    return (
        <div 
            data-testid="sidebar"

            className={classNames(cls.Sidebar, {[cls.collapsed]: collapsed}, [className])}>
          
            <Button 
                data-testid='sidebar-toggle'
                onClick={onToggle}
                className={cls.collapsedBtn}
                theme={ThemeButton.BACKGROUND_INVERTED}
                square
                size={ButtonSize.L}
                 
            >
                {collapsed ? '>' : '<'}

            </Button>
            <div className={cls.items}>
                <div >
                    <AppLink theme={AppLinkTheme.SECONDARY} className={cls.item}  to={RoutePath.main}>
                        <MainIcon className={cls.icon}/>
                        <span className={cls.link}>{t('Главная') }</span>
                    </AppLink>

                </div>
                <div >
                    <AppLink theme={AppLinkTheme.SECONDARY} className={cls.item} to={RoutePath.about}> 
                        <AboutIcon className={cls.icon}/>
                        <span className={cls.link}>{t('О сайте') }</span>

                    </AppLink>
                </div>
            </div>
            <div className={cls.switchers}>
                <ThemeSwitcher />
                <LanguageSwitcher className={cls.lang} short={collapsed}/>
            </div>
        </div>
    );
};

export default Sidebar;