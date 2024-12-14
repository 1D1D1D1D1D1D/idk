/* eslint-disable arrow-body-style */
import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { ReactNode, useCallback } from 'react';
import cls from './Tabs.module.scss';
import { Card, CardTheme } from '../Card/Card';

export interface TabItem {
    value: string
    content: ReactNode
}
interface TabProps {
    className?: string
    tabs: TabItem[]
    value: string
    onTabClick:(tab: TabItem) => void
}

export const Tabs = (props: TabProps) => {
    const { t } = useTranslation();
    const {
        className, tabs, value, onTabClick,
    } = props;

    const clickHandle = useCallback((tab: TabItem) => {
        return () => {
            onTabClick(tab);
        };
    }, [onTabClick]);

    return (
        <div className={classNames(cls.Tabs, {}, [className])}>
            {tabs.map((tab) => (
                <Card className={cls.tab} key={tab.value} theme={tab.value === value ? CardTheme.NORMAL : CardTheme.OUTLINE} onClick={clickHandle(tab)}>
                    {tab.content}
                </Card>
            ))}
        </div>
    );
};
