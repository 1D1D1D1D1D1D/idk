import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { HFlex } from 'shared/ui/Stack/HFlex/HFlex';

import { TabItem, Tabs } from 'shared/ui/Tabs/Tabs';
import { useCallback, useMemo } from 'react';
import { ArticleType } from 'entities/Article';
import { useSelector } from 'react-redux';
import { getArticlePageSelectedTypes } from 'pages/ArticlePage/model/selectors/articlePageSelectors';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';

interface ArticleTypeSelectorProps {
    className?: string;
    value: ArticleType[]
    onTabClick: (type: ArticleType) => void
    readonly?: boolean

}

export const ArticleTypeSelector = ({ className, onTabClick, readonly, value }: ArticleTypeSelectorProps) => {
    const { t } = useTranslation();
    // const value = useSelector(getArticlePageSelectedTypes);
    const typeTabs = useMemo<TabItem[]>(() => [

        {
            value: ArticleType.IT,
            content: t('IT'),
        },
        {
            value: ArticleType.ECONOMICS,
            content: t('Economics'),
        },
        {
            value: ArticleType.SCIENCE,
            content: t('Science'),
        },
    ], [t]);
    const onChangeType = useCallback((tab: TabItem) => {
        if (!readonly) {
            onTabClick(tab.value as ArticleType);
            console.log('click');
        }



    }, [readonly])

    return (
        <HFlex align='start' justify='start'>
            <Tabs onTabClick={onChangeType} value={value} tabs={typeTabs} readonly={readonly} />
        </HFlex>
    );
};