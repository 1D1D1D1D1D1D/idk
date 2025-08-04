import { classNames, Mods } from 'shared/lib/classNames/classNames';
import { HTMLAttributes, ReactNode } from 'react';
import cls from './Card.module.scss';

export enum CardTheme {
    NORMAL = 'normal',
    OUTLINE = 'outline'
}
interface CardProps extends HTMLAttributes<HTMLDivElement> {
    className?: string;
    children: ReactNode
    theme?: CardTheme
    readonly?: boolean
}

export const Card = ({
    className, children, theme = CardTheme.NORMAL, readonly, ...otherProps }: CardProps) => {
    const mods: Mods = {
        [cls.readonly]: readonly
    }
    return (<div className={classNames(cls.Card, mods, [className, cls[theme],])} {...otherProps}>
        {children}
    </div>)
}


