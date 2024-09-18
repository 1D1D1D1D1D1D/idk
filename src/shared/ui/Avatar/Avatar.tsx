import { classNames } from 'shared/lib/classNames/classNames';
import { CSSProperties, useMemo } from 'react';
import cls from './Avatar.module.scss';

interface AvatarProps {
    className?: string;
    src?: string
    width?: number
    height?: number
    round?: boolean
    alt?: string
}

export const Avatar = (props: AvatarProps) => {
    const {
        className,
        src,
        width,
        height,
        alt,
        round = false,
    } = props;
    const styles = useMemo<CSSProperties>(() => ({
        width,
        height,
    }), [width, height]);

    const mods: Record<string, boolean | undefined> = {
        [cls.round]: round,

    };
    return (
        <img src={src} alt={alt} style={styles} className={classNames(cls.Avatar, mods, [className])} />
    );
};
