import { MutableRefObject, useEffect } from 'react';

export interface UseScrollProps {
    callback?: () => void
    elementRef: MutableRefObject<HTMLDivElement>
    pageRef: MutableRefObject<HTMLDivElement>
}

export function useScroll(props: UseScrollProps) {
    const { callback, elementRef, pageRef } = props;

    useEffect(() => {
        let observer: IntersectionObserver;
        if (callback) {
            const options = {
                root: pageRef.current, // Accessing the current property here
                rootMargin: '0px',
                threshold: 1.0,
            };

            observer = new IntersectionObserver(([entry]) => {
                if (entry.isIntersecting) {
                    callback();
                }
            }, options);

            if (elementRef.current) {
                observer.observe(elementRef.current); // Observer the current elementRef
            }
        }

        return () => {
            if (elementRef.current) {
                // eslint-disable-next-line react-hooks/exhaustive-deps
                observer.unobserve(elementRef.current); // Unobserve when unmounted
            }
        };
    }, [callback, elementRef, pageRef]); // Ensure callback is included in deps array
}
