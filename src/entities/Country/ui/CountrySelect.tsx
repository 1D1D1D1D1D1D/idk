import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import cls from './CountrySelect.module.scss';
import { Select } from 'shared/ui/Select/Select';
import { Country } from '..';
import { memo, useCallback } from 'react';

interface CountrySelectProps {
    className?: string;
    value?: Country;
    onChange?: (value: Country) => void
    readonly?: boolean
}
const options = [
    { value: Country.Russia, content: Country.Russia },
    { value: Country.Sweden, content: Country.Sweden },
    { value: Country.Thailand, content: Country.Thailand },
    { value: Country.Vietnam, content: Country.Vietnam },

]
export const CountrySelect = memo((props: CountrySelectProps) => {
    const { className, value, onChange, readonly } = props
    const { t } = useTranslation();
    const onChangeHandler = useCallback((value: string) => {
        onChange?.(value as Country)
    }, [])
    return (
        <Select
            className={classNames(cls.CountrySelect, {}, [className])}
            label={t('Country')}
            options={options}
            value={value}
            onChange={onChangeHandler}
            readonly={readonly}

        >

        </Select>
    );
});