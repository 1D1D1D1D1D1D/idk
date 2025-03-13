import { classNames } from 'shared/lib/classNames/classNames';
import {
    memo, MutableRefObject, ReactNode, useRef, UIEvent,
    useEffect,
} from 'react';
import { useScroll } from 'shared/lib/hooks/useScroll/useScroll';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { StateSchema } from 'app/providers/StoreProvider';
import { useThrottle } from 'shared/lib/hooks/useThrottle/useThrottle';
import { TestProps } from 'shared/types/tests';
import cls from './Page.module.scss';
import { getScrollPositionByPath, scrollPositionActions } from '../features/ScrollPosition';

interface PageProps extends TestProps {
    className?: string;
    children: ReactNode
    onScroll?: () => void
}

export const Page = memo((props : PageProps) => {
    const pageRef = useRef() as MutableRefObject<HTMLDivElement>;
    const elementRef = useRef() as MutableRefObject<HTMLDivElement>;
    const dispatch = useAppDispatch();
    const { pathname } = useLocation();
    const scrollPosition = useSelector((state: StateSchema) => (getScrollPositionByPath(state, pathname)));
    const { className, children, onScroll } = props;

    useScroll({
        elementRef,
        pageRef,
        callback: onScroll,

    });
    useEffect(() => {
        pageRef.current.scrollTop = scrollPosition;
    }, [scrollPosition]);
    const onScrollEvent = useThrottle((e: UIEvent) => {
        dispatch(scrollPositionActions.setScrollPosition({
            path: pathname,
            position: e.currentTarget.scrollTop,
        }));
    }, 500);

    return (
        <section ref={pageRef} className={classNames(cls.Page, {}, [])} onScroll={onScrollEvent} data-testid={props['data-testid'] ?? 'Page'}>
            {children}
            <div ref={elementRef} />
        </section>
    );
});
