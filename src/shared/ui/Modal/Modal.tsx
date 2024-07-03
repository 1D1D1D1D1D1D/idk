import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import cls from './Modal.module.scss';
import React, { ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import { Portal } from '../Portal/Portal';
import { useTheme } from 'app/providers/ThemeProvider';
interface  ModalProps {
    className?: string;
    children?: ReactNode;
    isOpen?: boolean;
    onClose?: () => void;
}

const ANIMATION_DELAY = 300;



export const Modal = (props:  ModalProps) => {
    const { t } = useTranslation();
    const {
        className,
        children,
        isOpen,
        onClose,
    } = props

    const [isClosing, setIsClosing] = useState(false)
    const timerRef = useRef<ReturnType<typeof setTimeout>>()
    const {theme} = useTheme()

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

    const onContentClick = (e: React.MouseEvent) => {
        e.stopPropagation()
    }

    const onkeydown = useCallback((e: KeyboardEvent) => {
        if(e.key === 'Escape') {
            closeHandler()
        }
    }, [closeHandler])

    useEffect( () =>  {
        if(isOpen) {
            window.addEventListener('keydown', onkeydown)
        }
        return () => { 
            clearTimeout(timerRef.current)
            window.removeEventListener('keydown', onkeydown)
        }
         
    },[isOpen, onkeydown])

    const mods: Record<string,boolean> = {
        [cls.opened]: isOpen,
        [cls.isClosing]: isClosing,
    }
    return (
        <Portal>
            <div className={classNames(cls.Modal, mods, [className, theme])}>
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