import {
    ImgHTMLAttributes, memo, ReactElement, useLayoutEffect, useState,
} from 'react';
import DefaultImage from '../../assets/icons/defaultArticle.svg'
import cls from './AppImage.module.scss'
interface AppImageProps extends ImgHTMLAttributes<HTMLImageElement> {
    className?: string;
    fallback?: ReactElement;
    errorFallback?: ReactElement;
}

export const AppImage = memo((props: AppImageProps) => {
    const {
        className,
        src,
        alt = 'image',
        errorFallback = <DefaultImage />,
        fallback,
        ...otherProps
    } = props;
    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState(false);

    useLayoutEffect(() => {
        const img = new Image();
        img.src = src ?? '';
        img.onload = () => {
            setIsLoading(false);
        };
        img.onerror = () => {
            setIsLoading(false);
            setHasError(true);
        };
    }, [src]);

    if (isLoading && fallback) {
        return fallback;
    }

    if (hasError && errorFallback) {

        return <div className={cls.container}>{errorFallback}</div>
    }

    return (
        <img className={className} src={src} alt={alt} {...otherProps} />
    );
});
