import { classNames } from 'shared/lib/classNames/classNames';
import { VFlex } from 'shared/ui/Stack/VFlex/VFlex';
import { Input } from 'shared/ui/Input/Input';
import { Article } from 'entities/Article';
import { memo } from 'react';
import cls from './EditableArticleCard.module.scss'
import { TextArea, ThemeTextArea } from 'shared/ui/TextArea/TextArea';

interface EditableArticleCardProps {
    className?: string;
    data?: Article
    readonly?: boolean
    onChangeSubtitle?: (value: string) => void
    onChangeTitle?: (value: string) => void
    onChangeImage?: (value: string) => void
}

export const EditableArticleCard = memo((props: EditableArticleCardProps) => {
    const { className, data, readonly, onChangeSubtitle, onChangeTitle, onChangeImage } = props
    return (
        <VFlex className={classNames(cls.InputForm, {}, [className])}>
            <TextArea value={data?.title} onChange={onChangeTitle} readonly={readonly} className={cls.textArea} theme={ThemeTextArea.OUTLINE} />
            <TextArea value={data?.subtitle} onChange={onChangeSubtitle} readonly={readonly} className={cls.textArea} theme={ThemeTextArea.OUTLINE} />
            <TextArea value={data?.img} onChange={onChangeImage} readonly={readonly} className={cls.textArea} theme={ThemeTextArea.OUTLINE} />
        </VFlex>
    );
});