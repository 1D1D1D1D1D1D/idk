import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { Text, TextAlign } from 'shared/ui/Text/Text';
import { ArticleImageBlock } from '../../../Article/model/types/article';
import cls from './ArticleImageBlockComponent.module.scss';

interface ArticleImageBlockComponentProps {
    className?: string;
    block: ArticleImageBlock
}

export const ArticleImageBlockComponent = memo((props: ArticleImageBlockComponentProps) => {
    const {
        className,
        block,
    } = props;
    return (
        <div className={classNames(cls.ArticleImageBlockComponent, {}, [className])}>
            <div className={cls.imageWrapper}>
                <img src={block.src} className={cls.img} alt={block.title} />
            </div>
            {block.title && (
                <Text text={block.title} align={TextAlign.CENTER} />
            )}
        </div>
    );
});
