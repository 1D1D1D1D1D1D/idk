import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Modal.module.scss';
import React, { ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import { Portal } from '../Portal/Portal';
import { useTheme } from 'app/providers/ThemeProvider';
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
    } = props

    const [isClosing, setIsClosing] = useState(false)
    const [isMounted, setIsMounted] = useState(false)
    const timerRef = useRef<ReturnType<typeof setTimeout>>()
    const { theme } = useTheme()

    const closeHandler = useCallback(() => {
        if (onClose) {
            setIsClosing(true)
            //реф чтобы в случае демонтирования модалки из дом небыло попыток изменить состояние несуществующего элемента
            timerRef.current = setTimeout(() => {
                onClose()
                setIsClosing(false)

            }, ANIMATION_DELAY);
        }
    }, [onClose])

    //
    useEffect(() => {
        if (isOpen) {
            setIsMounted(true)
        }
    }, [isOpen])

   
    //

    //
    const onContentClick = (e: React.MouseEvent) => {
        e.stopPropagation()
    }

    const onKeyDown = useCallback((e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            closeHandler()
        }
    }, [closeHandler])

    useEffect(() => {
        if (isOpen) {
            window.addEventListener('keydown', onKeyDown)
        }
        return () => {
            clearTimeout(timerRef.current)
            window.removeEventListener('keydown', onKeyDown)
        }

    }, [isOpen, onKeyDown])
    //

    const mods: Record<string, boolean> = {
        [cls.opened]: isOpen,
        [cls.isClosing]: isClosing,
    }
    if (lazy && !isMounted) {
        return null
    }
    return (
        <Portal>
            <div className={classNames(cls.Modal, mods, [className, theme, 'app_modal'])}>
                <div className={cls.overlay} onClick={closeHandler}>
                    <div
                        className={classNames(cls.content)}
                        onClick={onContentClick}
                    >
                        {children}
                    </div>
                </div>
            </div>
        </Portal>
    );

};