import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import {
    memo, MutableRefObject, ReactNode, useRef,
} from 'react';
import { useScroll } from 'shared/lib/hooks/useScroll/useScroll';
import cls from './Page.module.scss';

interface PageProps {
    className?: string;
    children: ReactNode
    onScroll?: () => void
}

export const Page = memo((props : PageProps) => {
    const pageRef = useRef() as MutableRefObject<HTMLDivElement>;
    const elementRef = useRef() as MutableRefObject<HTMLDivElement>;
    const { className, children, onScroll } = props;

    useScroll({
        elementRef,
        pageRef,
        callback: onScroll,

    });
    return (
        <section ref={pageRef} className={classNames(cls.Page, {}, [])}>
            {children}
            <div ref={elementRef} />
        </section>
    );
});
