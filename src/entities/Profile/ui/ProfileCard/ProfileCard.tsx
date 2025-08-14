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
import { z } from 'zod';
import cls from './ProfileCard.module.scss';
import { useState } from 'react';
import { HFlex } from 'shared/ui/Stack/HFlex/HFlex';
import { useSelector } from 'react-redux';
import { getProfileValidateError } from 'features/EditableProfileCard/model/selectors/getProfileValidateError/getProfileValidateError';
import { ValidateProfileErrors } from 'features/EditableProfileCard/model/consts/consts';
import { validateForm } from 'features/EditableProfileCard/model/services/validateForm/validateForm';
import { getProfileForm } from 'features/EditableProfileCard/model/selectors/getProfileForm/getProfileForm';

interface ProfileCardProps {
    className?: string;
    isLoading?: boolean
    error?: string;
    data?: Profile
    readonly?: boolean
    onChangeFirstname?: (value: string) => void
    onChangeLastname?: (value: string) => void
    onChangeAge?: (value: string) => void
    onChangeCity?: (value: string) => void
    onChangeUsername?: (value: string) => void
    onChangeAvatar?: (value: string) => void
    onChangeCurrency?: (currency: Currency) => void
    onChangeCountry?: (country: Country) => void
}
export const ProfileCard = (props: ProfileCardProps) => {
    const [errors, setErrors] = useState<{ [key: string]: string }>({ error: '' });
    const { t } = useTranslation();
    const validateErrors = useSelector(getProfileValidateError);
    const formData = useSelector(getProfileForm);

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

    const ProfileValidationSchema = z.object({
        first: z.string()
            .trim()
            .min(0)
            .max(10, { message: 'The name must not exceed 10 characters.' })
            .regex(/^[a-zA-Zа-яА-ЯёЁ\s\-]*$/, { message: 'The name can contain only letters, spaces, and hyphens.' })

        ,

        lastName: z.string()
            .trim()
            .min(0)
            .max(10, { message: 'The last name must not exceed 10 characters.' })
            .regex(/^[a-zA-Zа-яА-ЯёЁ\s\-]*$/, { message: 'The last name can contain only letters, spaces, and hyphens.' }),

        age: z.string()
            .min(0)
            .max(2)
        ,
        city: z.string()
            .trim()
            .min(2, { message: 'The city must contain at least 2 letters.' })
            .max(25, { message: 'The city must not exceed 25 characters.' })
            .regex(/^[a-zA-Zа-яА-ЯёЁ\s\-]+$/, { message: 'The city can contain only letters, spaces, and hyphens.' }),

        username: z.string()
            .trim()
            .min(0)
            .max(15, { message: 'The username must not exceed 15 characters.' })
            .regex(/^[a-zA-Zа-яА-ЯёЁ\s\-]*$/, { message: 'The username can contain only letters, spaces, and hyphens.' }),

        avatar: z.string()
            .trim()
            .min(0)
            .regex(/^https:\/\/.*$/, { message: 'incorrect link format' }),
    });
    const handleChange = (field: string, value: string) => {
        value = value.trim();
        try {
            ProfileValidationSchema.pick({ [field]: true }).parse({ [field]: value });
            validateForm(formData)

            setErrors((prevErrors) => {
                const newErrors = { ...prevErrors };
                delete newErrors[field];
                return newErrors;
            });

            switch (field) {
                case 'first':
                    onChangeFirstname && onChangeFirstname(value);
                    break;
                case 'lastName':
                    onChangeLastname && onChangeLastname(value);
                    break;
                case 'age':
                    onChangeAge && onChangeAge(value);
                    break;
                case 'city':
                    onChangeCity && onChangeCity(value);
                    break;
                case 'username':
                    onChangeUsername && onChangeUsername(value);
                    break;
                case 'avatar':
                    onChangeAvatar && onChangeAvatar(value);
                    break;
                default:
                    break;
            }
        } catch (error) {
            if (error instanceof z.ZodError) {
                console.log(error);

                setErrors((prevErrors) => ({
                    ...prevErrors,
                    [field]: error.issues[0]?.message,
                }));
            }
        }
    };
    const renderError = (field: string) => {
        return errors[field] ? (
            <Text text={errors[field]} theme={TextTheme.ERROR}></Text>
        ) :
            null
    }

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
    const validateProfile = {
        [ValidateProfileErrors.AGE_REQUIRED]: t('Поле возраст не может быть пустым'),
        [ValidateProfileErrors.FIRST_NAME_REQUIRED]: t('Поле имя не может быть пустым'),
        [ValidateProfileErrors.LAST_NAME_REQUIRED]: t('Поле фамилия не может быть пустым'),
        [ValidateProfileErrors.CITY_REQUIRED]: t('Поле город не может быть пустым'),
        [ValidateProfileErrors.SERVER_ERROR]: t('Server error'),
        [ValidateProfileErrors.USERNAME_REQUIRED]: t('Поле username не может быть пустым'),
        [ValidateProfileErrors.NO_DATA]: t('no data'),
    };

    return (
        <Flex className={classNames(cls.ProfileCard, {}, [className])} direction="row" align="center" justify="center" >

            <VFlex className={cls.data} align="start" justify="center" gap="16">
                {validateErrors?.length && validateErrors.map((err) => (
                    <HFlex>
                        <Text
                            key={err}
                            theme={TextTheme.ERROR}
                            text={validateProfile[err]}
                        />
                    </HFlex>

                ))}
                <Input
                    value={data?.first}
                    placeholder={t('Имя')}
                    onChange={value => handleChange('first', value)}
                    readonly={readonly}
                    autofocus={!readonly}
                    data-testid="ProfileCard-firstName"

                />
                {renderError('first')}
                <Input
                    value={data?.lastname}
                    placeholder={t('Фамилия')}
                    onChange={value => handleChange('lastName', value)}
                    readonly={readonly}

                />
                {renderError('lastName')}
                <Input
                    value={data?.age}
                    placeholder={t('Возраст')}
                    onChange={value => handleChange('age', value)}
                    readonly={readonly}
                />
                {renderError('age')}
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
                    onChange={value => handleChange('username', value)}
                    readonly={readonly}
                />
                {renderError('username')}
                <Input
                    value={data?.currency}
                    placeholder={t('Валюта')}
                    readonly={readonly}
                />
                <Input
                    value={data?.avatar}
                    placeholder={t('Ссылка на аватар')}
                    readonly={readonly}
                    onChange={value => handleChange('avatar', value)}
                />
                {renderError('avatar')}
                <CurrencySelect value={data?.currency} onChange={onChangeCurrency} readonly={readonly} className={cls.select} />
                <CountrySelect value={data?.country} onChange={onChangeCountry} readonly={readonly} className={cls.select} />
            </VFlex>

            <div className={cls.avatarContainer}>
                <Avatar src={data?.avatar} size={350} round={false} className={cls.avatar} />
            </div>

        </Flex>
    );
}
