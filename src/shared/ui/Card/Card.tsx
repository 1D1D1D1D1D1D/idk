import { classNames } from 'shared/lib/classNames/classNames';
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
}

export const Card = ({
    className, children, theme = CardTheme.NORMAL, ...otherProps
}: CardProps) => (
    <div className={classNames(cls.Card, {}, [className, cls[theme]])} {...otherProps}>
        {children}
    </div>
);
