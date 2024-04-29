import {type FC} from 'react';
import {classNames} from 'shared/lib/classNames/classNames';
import cls from './AppLink.module.scss';
import {Link, type LinkProps} from 'react-router-dom';


export enum AppLinkTheme {
	PRIMARY = 'primary',
	SECONDARY = 'secondary',
}

type AppLinkProps = {
	className?: string;
	theme?: AppLinkTheme;
} & LinkProps;

const AppLink: FC<AppLinkProps> = (props) => {
    const {to,
        children,
        className,
        theme = AppLinkTheme.PRIMARY,
    } = props;
    return (
        <Link className={classNames(cls.AppLink, {}, [className, cls[theme]])} to={to}>
            {children}
        </Link>
    );
};

export default AppLink;

