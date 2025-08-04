import {
    MutableRefObject, useRef, useState, useCallback, useEffect,
} from 'react';

interface useModalProps {
    onClose?: () => void
    isOpen?: boolean
    animationDelay: number
}
export function useModal(props: useModalProps) {
    const {
        onClose,
        isOpen,
        animationDelay,
    } = props;
    const [isClosing, setIsClosing] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const timerRef = useRef() as MutableRefObject <ReturnType<typeof setTimeout>>;

    const closeHandler = useCallback(() => {
        if (onClose) {
            setIsClosing(true);
            // реф чтобы в случае демонтирования модалки из дом небыло попыток изменить состояние несуществующего элемента
            timerRef.current = setTimeout(() => {
                onClose();
                setIsClosing(false);
            }, animationDelay);
        }
    }, [onClose, animationDelay]);

    //
    useEffect(() => {
        if (isOpen) {
            setIsMounted(true);
        }
    }, [isOpen]);

    //

    //

    const onKeyDown = useCallback((e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            closeHandler();
        }
    }, [closeHandler]);

    useEffect(() => {
        if (isOpen) {
            window.addEventListener('keydown', onKeyDown);
        }
        return () => {
            clearTimeout(timerRef.current);
            window.removeEventListener('keydown', onKeyDown);
        };
    }, [isOpen, onKeyDown]);
    return {
        isClosing,
        isMounted,
        closeHandler,
    };
}
