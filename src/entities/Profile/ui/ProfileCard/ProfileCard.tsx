import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Text, TextAlign, TextTheme } from 'shared/ui/Text/Text';
import { Input } from 'shared/ui/Input/Input';
import { Loader } from 'shared/ui/Loader/Loader';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import { Currency } from 'entities/Currency';
import { Country } from 'entities/Country';
import { VFlex } from 'shared/ui/Stack/VFlex/VFlex';
import { Flex } from 'shared/ui/Stack/Flex/Flex';
import { CountrySelect } from 'entities/Country/ui/CountrySelect';
import { CurrencySelect } from 'entities/Currency/ui/CurrencySelect/CurrencySelect';
import { Profile } from '../../model/types/profile';
import cls from './ProfileCard.module.scss';

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
        onChangeCurrency, onChangeCountry,
    } = props;

    const handleAgeChange = (value: string) => {
        const agePattern = /^\d*$/;

        // eslint-disable-next-line radix
        if (agePattern.test(value) && (value === '' || (parseInt(value) >= 0 && parseInt(value) <= 999))) {
            onChangeAge(value);
            6;
        }
    };


    if (isLoading) {
        return (
            <div className={classNames(cls.ProfileCard, { [cls.loading]: true }, [className])}>
                <Loader />
            </div>
        );
    }

    if (error) {
        return (
            <div className={classNames(cls.ProfileCard, { [cls.loading]: true }, [className, cls.error])}>
                <Text theme={TextTheme.ERROR} title={t('Произошла ошибка')} text={t('Обновите страницу')} align={TextAlign.CENTER} />
            </div>
        );
    }

    return (
        <Flex className={classNames(cls.ProfileCard, {}, [className])} direction="row" align="center" justify="center" >
            <VFlex className={cls.data} align="start" justify="center" gap="16">
                <Input
                    value={data?.first}
                    placeholder={t('Имя')}
                    onChange={onChangeFirstname}
                    readonly={readonly}
                    autofocus={!readonly}
                    data-testid="ProfileCard-firstName"

                />
                <Input
                    value={data?.lastname}
                    placeholder={t('Фамилия')}
                    onChange={onChangeLastname}
                    readonly={readonly}

                />
                <Input
                    value={data?.age}
                    placeholder={t('Возраст')}
                    onChange={handleAgeChange}
                    readonly={readonly}
                />
                <Input
                    value={data?.country}
                    placeholder={t('Страна')}
                    readonly={readonly}
                />
                <Input
                    value={data?.city}
                    placeholder={t('Город')}
                    onChange={onChangeCity}
                    readonly={readonly}
                />
                <Input
                    value={data?.username}
                    placeholder={t('Username')}
                    onChange={onChangeUsername}
                    readonly={readonly}
                />
                <Input
                    value={data?.currency}
                    placeholder={t('Валюта')}
                    readonly={readonly}
                />
                <Input
                    value={data?.avatar}
                    placeholder={t('Ссылка на аватар')}
                    readonly={readonly}
                    onChange={onChangeAvatar}
                />
                <CurrencySelect value={data?.currency} onChange={onChangeCurrency} readonly={readonly} className={cls.select} />
                <CountrySelect value={data?.country} onChange={onChangeCountry} readonly={readonly} className={cls.select} />
            </VFlex>

            <div className={cls.avatarContainer}>
                <Avatar src={data?.avatar} size={350} round={false} className={cls.avatar} />
            </div>

        </Flex>
    );
};
