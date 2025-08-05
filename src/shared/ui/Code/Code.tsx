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

  
    return (

        <pre className={classNames(cls.Code, {}, [className])}>
            {/* <div className={cls.copyBtn}>
                <Button theme={ThemeButton.CLEAR} onClick={onCopy} ><Icon Svg={CopyIcon} /></Button>

            </div> */}

            <code>
                {text}
            </code>
        </pre>

    );
};
