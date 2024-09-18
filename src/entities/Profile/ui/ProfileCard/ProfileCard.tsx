import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import cls from './ProfileCard.module.scss';
import { Text, TextAlign, TextTheme } from 'shared/ui/Text/Text';
import { Input } from 'shared/ui/Input/Input';
import { Profile } from 'entities/Profile/model/types/profile';
import { Loader } from 'shared/ui/Loader/Loader';
import { ChangeEvent, memo, useMemo, useState } from 'react';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import { Select } from 'shared/ui/Select/Select';
import { Currency, CurrencySelect } from 'entities/Currency';
import { Country, CountrySelect } from 'entities/Country';

interface ProfileCardProps {
    className?: string;
    isLoading?: boolean
    error?: string;
    data?: Profile
    readonly?: boolean
    onChangeFirstname?: (value: string) => void
    onChangeLastname?: (value: string) => void
    onChangeAge: (value: string) => void
    onChangeCity?: (value: string) => void
    onChangeUsername?: (value: string) => void
    onChangeAvatar?: (value: string) => void
    onChangeCurrency?: (currency: Currency) => void
    onChangeCountry?: (country: Country) => void
}
export const ProfileCard = (props: ProfileCardProps) => {
    const { t } = useTranslation();
    const {
        data,
        error,
        isLoading,
        className,
        readonly,
        onChangeFirstname, onChangeLastname, onChangeAge,
        onChangeCity, onChangeUsername, onChangeAvatar,
        onChangeCurrency, onChangeCountry } = props

    const handleAgeChange = (value: string) => {
        const agePattern = /^\d*$/;

        if (agePattern.test(value) && (value === "" || (parseInt(value) >= 0 && parseInt(value) <= 999))) {
            onChangeAge(value);
            6
        }
    };
    if (isLoading) {
        return (
            <div className={classNames(cls.ProfileCard, { [cls.loading]: true }, [className])}>
                <Loader />
            </div>
        )
    }

    if (error) {
        return (
            <div className={classNames(cls.ProfileCard, { [cls.loading]: true }, [className, cls.error])}>
                <Text theme={TextTheme.ERROR} title={t('Произошла ошибка')} text={t('Обновите страницу')} align={TextAlign.CENTER} />
            </div>
        )
    }

    console.log(readonly);

    return (
        <div className={classNames(cls.ProfileCard, {}, [className])}>
            <div>
                <div className={cls.data}>
                    <Input
                        value={data?.first}
                        placeholder={t('Имя')}
                        className={cls.input}
                        onChange={onChangeFirstname}
                        readonly={readonly}
                        autofocus={!readonly}
                        caretVisible={false}

                    />
                    <Input
                        value={data?.lastname}
                        placeholder={t('Фамилия')}
                        className={cls.input}
                        onChange={onChangeLastname}
                        readonly={readonly}
                        caretVisible={false}

                    />
                    <Input
                        value={data?.age}
                        placeholder={t('Возраст')}
                        className={cls.input}
                        onChange={handleAgeChange}
                        readonly={readonly}
                        caretVisible={false}
                    />
                    <Input
                        value={data?.country}
                        placeholder={t('Страна')}
                        className={cls.input}
                        readonly={readonly}
                        caretVisible={false}
                    />
                    <Input
                        value={data?.city}
                        placeholder={t('Город')}
                        onChange={onChangeCity}
                        className={cls.input}
                        readonly={readonly}
                        caretVisible={false}
                    />
                    <Input
                        value={data?.username}
                        placeholder={t('Username')}
                        className={cls.input}
                        onChange={onChangeUsername}
                        readonly={readonly}
                        caretVisible={false}
                    />
                    <Input
                        value={data?.currency}
                        placeholder={t('Валюта')}
                        className={cls.input}
                        readonly={readonly}
                        caretVisible={false}
                    />
                    <Input
                        value={data?.avatar}
                        placeholder={t('Ссылка на аватар')}
                        className={cls.input}
                        readonly={readonly}
                        onChange={onChangeAvatar}
                        caretVisible={false}
                    />
                    <CurrencySelect value={data?.currency} onChange={onChangeCurrency} readonly={readonly} className={cls.select} />
                    <CountrySelect value={data?.country} onChange={onChangeCountry} readonly={readonly} className={cls.select} />
                </div>

            </div>

            <div className={cls.avatarContainer} >
                <Avatar src={data?.avatar} width={300} height={340} round={false} className={cls.avatar} />
            </div>

        </div>
    );
};