import {
    Listbox as HListBox,
} from '@headlessui/react';
import { Fragment, ReactNode, useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { DropdownDirection } from 'shared/types/ui';
import cls from './ListBox.module.scss';
import Button from '../Button/Button';

export interface ListBoxItem {
    value: string
    content: ReactNode
    disabled?: boolean
}
interface ListBoxProps {
    items?: ListBoxItem[]
    className?: string
    value?: string
    defaultValue?: string
    onChange: (value: string) => void
    readonly?: boolean
    direction: DropdownDirection

}
const mapDirectionClass: Record<DropdownDirection, string> = {
    'bottom left': cls.optionsBottomLeft,
    'bottom right': cls.optionsBottomRight,
    'top right': cls.optionsTopRight,
    'top left': cls.optionsTopLeft,

};
export function ListBox(props: ListBoxProps) {
    const {
        items,
        className,
        value,
        defaultValue,
        onChange,
        readonly,
        direction = 'top right',
    } = props;
    const optionsClasses = [mapDirectionClass[direction]];

    return (
        <HListBox
            disabled={readonly}
            as="div"
            className={classNames(cls.ListBox, {}, [className])}
            value={value}
            onChange={onChange}
        >
            <HListBox.Button className={readonly ? cls.triggerDisabled : cls.trigger}>
                <div className={classNames(cls.btn, { [cls.disabled]: readonly })} aria-disabled={readonly}>
                    {value ?? defaultValue}
                </div>
            </HListBox.Button>
            <HListBox.Options className={classNames(cls.options, {}, optionsClasses)}>
                {items?.map((item) => (
                    <HListBox.Option value={item.value} disabled={item.disabled} as={Fragment} key={item.value}>
                        {({ active, selected }) => (
                            <li className={classNames(cls.option, {
                                [cls.active]: active,
                                [cls.disabled]: item.disabled,
                            })}
                            >
                                {selected && '!!!'}
                                {item.content}
                            </li>
                        )}
                    </HListBox.Option>
                ))}

            </HListBox.Options>
        </HListBox>
    );
}
