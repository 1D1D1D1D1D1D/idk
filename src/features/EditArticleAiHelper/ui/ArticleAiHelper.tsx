import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import cls from './ArticleAiHelper.module.scss'
import { Article, ArticleBlockType } from 'entities/Article';
import { TextArea } from 'shared/ui/TextArea/TextArea';
import { DynamicModuleLoader, ReducerList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { articleAiReducer } from '../model/slice/articleAiSlice';
import { useSelector } from 'react-redux';
import { getAiInputBlocks, getAiInputReadonly } from '../model/selectors/selectors';
import { useTranslation } from 'react-i18next';
import { Text } from 'shared/ui/Text/Text';
import { ArticleCodeBlockComponent } from 'entities/Article/ui/ArticleCodeBlockComponent/ArticleCodeBlockComponent';
import { ArticleBlock } from 'entities/Article/model/types/article';
import { ArticleTextBlockComponent } from 'entities/Article/ui/ArticleTextBlockComponent/ArticleTextBlockComponent';
import { ArticleImageBlockComponent } from 'entities/Article/ui/ArticleImageBlockComponent/ArticleImageBlockComponent';
import { VFlex } from 'shared/ui/Stack/VFlex/VFlex';


interface DeepSeekInputProps {
    className?: string;
    onChange?: (prompt: string) => void;
    data?: Article;
    prompt?: string;
    onClick?: () => void;
    response?: string;
}

const renderBlock = (block: ArticleBlock) => {
    switch (block.type) {
        case ArticleBlockType.CODE:
            return <ArticleCodeBlockComponent key={block.id} block={block} />;
        case ArticleBlockType.TEXT:
            return <ArticleTextBlockComponent key={block.id} block={block} />;
        case ArticleBlockType.IMAGE:
            return <ArticleImageBlockComponent key={block.id} block={block} />;
        default:
            return null;
    }
};

export const ArticleAiHelper = memo((props: DeepSeekInputProps) => {
    const { className, onChange, prompt } = props;
    const dispatch = useAppDispatch();
    const { t } = useTranslation();
    const readonly = useSelector(getAiInputReadonly);
    const blocks = useSelector(getAiInputBlocks)

    return (
        <DynamicModuleLoader reducers={{ articleAiInput: articleAiReducer }}>
            <VFlex className={classNames(cls.TextArea, {}, [className])} justify='start' align='start'>
                <VFlex justify='start' align='start' className={cls.text}>
                    <TextArea
                        value={prompt}
                        onChange={onChange}
                        placeholder={t('Ask anything')}
                        readonly={readonly}
                    />
                </VFlex>

                <VFlex className={cls.preview} justify='start' align='start'>
                    {blocks.map((block) => renderBlock(block))}
                </VFlex>
            </VFlex>


        </DynamicModuleLoader>
    );
});