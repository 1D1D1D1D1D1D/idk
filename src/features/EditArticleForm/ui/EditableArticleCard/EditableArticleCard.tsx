import { classNames } from 'shared/lib/classNames/classNames';
import { VFlex } from 'shared/ui/Stack/VFlex/VFlex';
import { Input } from 'shared/ui/Input/Input';
import { Article } from 'entities/Article';
import { memo } from 'react';


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
        <VFlex className={classNames('', {}, [className])}>
            <Input value={data?.title} onChange={onChangeTitle} readonly={readonly} />
            <Input value={data?.subtitle} onChange={onChangeSubtitle} readonly={readonly} />
            <Input value={data?.img} onChange={onChangeImage} readonly={readonly} />
        </VFlex>
    );
});