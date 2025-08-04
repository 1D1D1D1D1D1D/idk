import { classNames } from 'shared/lib/classNames/classNames';
import CopyIcon from 'shared/assets/icons/copy-svgrepo-com.svg';
import { useCallback } from 'react';
import cls from './Code.module.scss';
import Button, { ThemeButton } from '../Button/Button';
import { Icon } from '../Icon/Icon';

interface CodeProps {
    className?: string;
    text: string;
}

export const Code = (props: CodeProps) => {
    const {
        className,
        text,
    } = props;

    const onCopy = useCallback(() => {
        navigator.clipboard.writeText(text);
    }, [text]);
    return (
        <pre className={classNames(cls.Code, {}, [className])}>
            <Button theme={ThemeButton.CLEAR} onClick={onCopy} className={cls.copyBtn}><Icon Svg={CopyIcon} /></Button>
            <code>
                {text}
            </code>
        </pre>

    );
};
