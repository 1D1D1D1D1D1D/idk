import { classNames } from 'shared/lib/classNames/classNames';
import { Popover as HPopover } from '@headlessui/react';
import { PopoverDirection } from 'shared/types/ui';
import { ReactNode } from 'react';
import cls from './Popover.module.scss';

interface PopoverProps {
    className?: string;
        direction?: PopoverDirection;
        trigger: ReactNode;
        children: ReactNode
}
const mapDirectionClass: Record<PopoverDirection, string> = {
    'bottom left': cls.popoverBottomLeft,
    'bottom right': cls.popoverBottomRight,
    'top right': cls.popoverTopRight,
    'top left': cls.popoverTopLeft,
};
export function Popover(props: PopoverProps) {
    const {
        className, direction = 'bottom left', trigger, children,
    } = props;
    const menuClasses = [mapDirectionClass[direction]];
    return (
        <HPopover className={classNames(cls.Popup, {}, [className])}>
            <HPopover.Button as="div" className={cls.btn}>{trigger}</HPopover.Button>
            <HPopover.Panel className={classNames(cls.menu, {}, menuClasses)}>
                {children}
            </HPopover.Panel>
        </HPopover>
    );
}
