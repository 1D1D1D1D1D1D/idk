import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Select } from 'shared/ui/Select/Select';
import { memo, useCallback } from 'react';
import { ListBox } from 'shared/ui/ListBox/ListBox';
import { Country } from '..';

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

];
export const CountrySelect = memo((props: CountrySelectProps) => {
    const {
        className, value, onChange, readonly,
    } = props;
    const { t } = useTranslation();
    const onChangeHandler = useCallback((value: string) => {
        onChange?.(value as Country);
    }, [onChange]);
    return (
        <ListBox onChange={onChangeHandler} value={value} items={options} defaultValue={t('Select country')} className={className} readonly={readonly} direction="top right" />
        // <Select
        //     className={classNames('', {}, [className])}
        //     label={t('Country')}
        //     options={options}
        //     value={value}
        //     onChange={onChangeHandler}
        //     readonly={readonly}
        // />
    );
});
