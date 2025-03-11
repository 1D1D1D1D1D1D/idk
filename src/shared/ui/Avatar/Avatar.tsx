import { classNames } from 'shared/lib/classNames/classNames';
import React, { CSSProperties, useMemo } from 'react';
import UserIcon from 'shared/assets/icons/user-filled.svg';
import cls from './Avatar.module.scss';
import { AppImage } from '../AppImage/AppImage';
import { Icon } from '../Icon/Icon';
import { Skeleton } from '../Skeleton/Skeleton';

interface AvatarProps {
    className?: string;
    src?: string
    width?: number
    height?: number
    size?: number
    round?: boolean
    alt?: string
}
export const Avatar = (props: AvatarProps) => {
    const {
        className,
        src,
        width,
        height,
        size = 100,
        alt,
        round = false,
    } = props;

    const styles = useMemo<CSSProperties>(() => ({
        width: size,
        height: size,
    }), [size]);
    const mods: Record<string, boolean | undefined> = {
        [cls.round]: round,

    };
    const fallback = <Skeleton width={size} height={size} border="50%" />;
    const errorFallback = <Icon Svg={UserIcon} width={size} height={size} />;
    return (
        <AppImage fallback={fallback} errorFallback={errorFallback} src={src} alt={alt} style={styles} className={classNames(cls.Avatar, mods, [className])} />

    );
};
