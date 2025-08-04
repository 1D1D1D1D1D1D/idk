import { classNames, Mods } from 'shared/lib/classNames/classNames';
import { CSSProperties } from 'react';
import cls from './Skeleton.module.scss';

export enum SkeletonAlign {
    CENTER = 'center',
    LEFT = 'left',
    RIGHT = 'right',

}
interface SkeletonProps {
    className?: string;
    height?: string | number
    width?: string | number
    border?: string
    align?: SkeletonAlign

}

export const Skeleton = (props: SkeletonProps) => {
    const {
        className,
        height,
        width,
        border,
        align = SkeletonAlign.LEFT,

    } = props;
    const mods: Mods = {
        [cls[align]]: align,
    };
    const styles: CSSProperties = {
        width,
        height,
        borderRadius: border,
    };

    return (

        <div className={classNames(cls.Skeleton, mods, [className])} style={styles} />
    );
};
