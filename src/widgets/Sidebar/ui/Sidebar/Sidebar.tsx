import {type FC, useState} from 'react';
import {classNames} from 'shared/lib/classNames/classNames';
import cls from './Sidebar.module.scss';
import {ThemeSwitcher} from 'widgets/ThemeSwitcher';
import LanguageSwitcher from 'widgets/LanguageSwitcher/LanguageSwitcher';

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
            <button 
                data-testid='sidebar-toggle'
                onClick={onToggle}>
                toggle
            </button>
            <div className={cls.switchers}>
                <ThemeSwitcher />
                <LanguageSwitcher className={cls.lang} />
            </div>
        </div>
    );
};

export default Sidebar;