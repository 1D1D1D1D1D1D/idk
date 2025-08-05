import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useCallback } from 'react';
import { Code } from 'shared/ui/Code/Code';
import { ArticleCodeBlock } from '../../../Article/model/types/article';
import cls from './ArticleCodeBlockComponent.module.scss'
import Button, { ThemeButton } from 'shared/ui/Button/Button';
import CopyIcon from 'shared/assets/icons/copy-svgrepo-com.svg';
import { Icon } from 'shared/ui/Icon/Icon';
interface ArticleCodeBlockComponentProps {
    className?: string;
    block: ArticleCodeBlock
}

export const ArticleCodeBlockComponent = memo((props: ArticleCodeBlockComponentProps) => {
    const {
        className,
        block,
    } = props;
    const onCopy = useCallback(() => {
        navigator.clipboard.writeText(block.code);
    }, [block]);
    return (
        <div className={classNames(cls.block, {}, [className])}>
            <Code text={block.code} />
            <div className={cls.copyBtn}>
                <Button theme={ThemeButton.CLEAR} onClick={onCopy} ><Icon Svg={CopyIcon} /></Button>

            </div>
        </div>
    );
});
