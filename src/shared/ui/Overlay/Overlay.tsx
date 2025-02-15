import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Overlay.module.scss';

interface OverlayProps {
    className?: string;
    onClick?: () => void
}

export const Overlay = ({ className, onClick }: OverlayProps) => (
    <div className={classNames(cls.Overlay, {}, [className])} onClick={onClick} />

);
