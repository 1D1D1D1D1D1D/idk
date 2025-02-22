import { classNames } from 'shared/lib/classNames/classNames';
import React, {
    ReactNode,
} from 'react';
import { useTheme } from 'app/providers/ThemeProvider';
import { useModal } from 'shared/lib/hooks/useModal/useModal';
import cls from './Modal.module.scss';
import { Portal } from '../Portal/Portal';
import { Overlay } from '../Overlay/Overlay';

interface ModalProps {
    className?: string;
    children?: ReactNode;
    isOpen?: boolean;
    onClose?: () => void;
    lazy?: boolean;
}

const ANIMATION_DELAY = 300;

export const Modal = (props: ModalProps) => {
    const {
        className,
        children,
        isOpen,
        onClose,
        lazy,
    } = props;

    const { theme } = useTheme();
    const {
        isClosing, isMounted, closeHandler,
    } = useModal({ animationDelay: ANIMATION_DELAY, isOpen, onClose });
    const mods: Record<string, boolean | undefined> = {
        [cls.opened]: isOpen,
        [cls.isClosing]: isClosing,
    };
    const onContentClick = (e: React.MouseEvent) => {
        e.stopPropagation();
    };
    if (lazy && !isMounted) {
        return null;
    }
    return (
        <Portal>
            <div className={classNames(cls.Modal, mods, [className, theme, 'app_modal'])}>
                <Overlay onClick={closeHandler} />
                <div
                    className={classNames(cls.content)}
                    onClick={onContentClick}
                >
                    {children}
                </div>
            </div>
        </Portal>
    );
};
