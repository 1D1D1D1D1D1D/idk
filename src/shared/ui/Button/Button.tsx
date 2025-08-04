import React, {
    memo, ReactNode, type ButtonHTMLAttributes,
} from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Button.module.scss';

export enum ThemeButton {
    CLEAR = 'clear',
    CLEAR_INVERTED = 'clearInverted',
    OUTLINE = 'outline',
    OUTLINE_RED = 'outlineRed',
    BACKGROUND = 'background',
    BACKGROUND_INVERTED = 'backgroundInverted',

}
export enum ButtonSize {
    L = 'size_l',
    M = 'size_m',
    XL = 'size_xl'
}
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    theme?: ThemeButton;
    square?: boolean;
    size?: ButtonSize;
    disabled?: boolean
    children: ReactNode;

}

const Button = memo((props: ButtonProps) => {
    const {
        className,
        children,
        theme = ThemeButton.BACKGROUND_INVERTED,
        square,
        size = ButtonSize.M,
        disabled,
        ...otherProps
    } = props;
    const mods: Record<string, boolean | undefined> = {
        [cls[theme]]: true,
        [cls.square]: square,
        [cls[size]]: true,
        [cls.disabled]: disabled,

    };
    return (
        <button
            className={classNames(cls.Button, mods, [className])}
            {...otherProps}
            disabled={disabled}
        >
            {children}
        </button>
    );
});
export default Button;
