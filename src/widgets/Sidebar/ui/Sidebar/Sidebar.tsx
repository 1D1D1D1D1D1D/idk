import {type FC, useState} from 'react';
import {classNames} from 'shared/lib/classNames/classNames';
import cls from './Sidebar.module.scss';
import {ThemeSwitcher} from 'widgets/ThemeSwitcher';
import LanguageSwitcher from 'widgets/LanguageSwitcher/LanguageSwitcher';
import Button, { ButtonSize, ThemeButton } from 'shared/ui/Button/Button';

type SidebarProps = {
	className?: string;
};
const Sidebar: FC<SidebarProps> = ({className}: SidebarProps) => {
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
            <div className={cls.switchers}>
                <ThemeSwitcher />
                <LanguageSwitcher className={cls.lang} short={collapsed}/>
            </div>
        </div>
    );
};

export default Sidebar;