import {type ButtonHTMLAttributes, type FC} from 'react';
import {classNames} from 'shared/lib/classNames/classNames';
import cls from './Button.module.scss';


export enum ThemeButton {
	CLEAR = 'clear',
    CLEAR_INVERTED = 'clearInverted',
    OUTLINE = 'outline',
    BACKGROUND = 'background',
    BACKGROUND_INVERTED = 'backgroundInverted'

}
type ButtonProps = {
	className?: string;
	theme?: ThemeButton;
    square?: boolean;
    size?: ButtonSize;

} & ButtonHTMLAttributes<HTMLButtonElement>;
export enum ButtonSize  {
    L = 'size_l',
    M = 'size_m',
    XL = 'size_xl'
}
const Button: FC<ButtonProps> = (props) => {
    const {
        className,
        children, 
        theme,
        square ,
        size = ButtonSize.M,

        ...otherProps
    } = props;
    const mods: Record<string, boolean> = {
        [cls[theme]]: true,
        [cls.square]: square,
        [cls[size]]: true ,


    }
    return (
        <button
            className={classNames(cls.Button, mods, [className, ])}
            {...otherProps}
        >
            {children}
        </button>
    );
};
export default Button;