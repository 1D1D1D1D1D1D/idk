import { classNames } from 'shared/lib/classNames/classNames';
import { Link, type LinkProps } from 'react-router-dom';
import { HTMLAttributeAnchorTarget } from 'react';
import cls from './AppLink.module.scss';

export enum AppLinkTheme {
	PRIMARY = 'primary',
	SECONDARY = 'secondary',
}

type AppLinkProps = {
	className?: string;
	theme?: AppLinkTheme;
    target?: HTMLAttributeAnchorTarget

} & LinkProps;

const AppLink = (props: AppLinkProps) => {
    const {
        to,
        children,
        className,
        theme = AppLinkTheme.PRIMARY,
        target = '_self',
        ...linkProps
    } = props;
    return (
        <Link className={classNames(cls.AppLink, {}, [className, cls[theme]])} to={to} target={target} {...linkProps}>
            {children}
        </Link>
    );
};

export default AppLink;
