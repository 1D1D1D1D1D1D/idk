import { classNames, Mods } from 'shared/lib/classNames/classNames';
import { ChangeEvent, useMemo } from 'react';
import cls from './Select.module.scss';

export interface SelectOptions<T extends string> {
    value: T
    content: string
}
interface SelectProps<T extends string> {
    className?: string;
    label?: string
    options?: SelectOptions<T>[]
    value?: T
    onChange?: (value: T) => void
    readonly?: boolean;

}
export const Select = <T extends string>(props: SelectProps<T>) => {
    const {
        className, label, options, value, onChange, readonly,
    } = props;
    const mods: Mods = {
        [cls.readonly]: readonly,
    };

    const onChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
        onChange?.(e.target.value as T);
    };

    const optionList = useMemo(() => options?.map((opt) => (
        <option className={cls.option} value={opt.value} key={opt.value}>{opt.content}</option>
    )), [options]);

    return (
        <div className={classNames(cls.Wrapper, mods, [className])}>
            {label && <span className={cls.label}>{`${label}>`}</span>}
            <select value={value} className={classNames(cls.select, mods, [className])} onChange={onChangeHandler} disabled={readonly}>
                {optionList}
            </select>
        </div>

    );
};
