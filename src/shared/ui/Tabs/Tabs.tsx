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
    value: string[]
    readonly?: boolean;
    onTabClick: (tab: TabItem) => void
}



export const Tabs = (props: TabProps) => {
    const { t } = useTranslation();
    const {
        className, tabs, value, onTabClick, readonly
    } = props;
    const clickHandle = useCallback((tab: TabItem) => {
        if (!readonly) {
            return () => {
                onTabClick(tab);
            }
        }


    }, [onTabClick, readonly]);

    return (
        <div className={classNames(cls.Tabs, {}, [className])} >
            {tabs.map((tab) => (
                <Card className={cls.tab} key={tab.value} readonly={readonly}
                    theme={value.includes(tab.value) ? CardTheme.OUTLINE : CardTheme.NORMAL}
                    onClick={clickHandle(tab)}>
                    {tab.content}
                </Card>
            ))}
        </div>
    );
};
