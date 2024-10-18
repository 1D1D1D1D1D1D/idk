import { classNames } from 'shared/lib/classNames/classNames';
import React, { CSSProperties, useMemo } from 'react';
import cls from './Avatar.module.scss';

interface AvatarProps {
    className?: string;
    src?: string
    Svg?: React.VFC<React.SVGProps<SVGSVGElement>>
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
        Svg,
        round = false,
    } = props;
    const styles = useMemo<CSSProperties>(() => ({
        width,
        height,
    }), [width, height]);

    const mods: Record<string, boolean | undefined> = {
        [cls.round]: round,

    };
    if (Svg) {
        return (
            <Svg className={classNames(cls.Icon, {}, [className])} />
        );
    }
    return (
        <img src={src} alt={alt} style={styles} className={classNames(cls.Avatar, mods, [className])} />

    );
};
