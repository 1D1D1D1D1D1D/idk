import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useCallback, useEffect } from 'react';
import { Currency } from 'entities/Currency';
import { Country } from 'entities/Country';
import { useSelector } from 'react-redux';
import { TextTheme, Text } from 'shared/ui/Text/Text';
import { ProfileCard } from 'entities/Profile';
import { DynamicModuleLoader, ReducerList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { getProfileForm } from '../model/selectors/getProfileForm/getProfileForm';
import { getProfileError } from '../model/selectors/getProfileError/getProfileError';
import { getProfileIsloading } from '../model/selectors/getProfileIsloading/getProfileIsloading';
import { getProfileValidateError } from '../model/selectors/getProfileValidateError/getProfileValidateError';
import { getProfileReadonly } from '../model/selectors/getProfileReadonly/getProfileReadonly';
import { fetchProfileData } from '../model/services/fetchProfileData/fetchProfileData';
import { profileActions, profileReducer } from '../model/slice/profileSlice';
import { ValidateProfileErrors } from '../model/consts/consts';

interface EditableProfileCardProps {
    className?: string;
    id?: string
}

export const EditableProfileCard = ({ className, id }: EditableProfileCardProps) => {
    const reducers: ReducerList = {
        profile: profileReducer,
    };
    const dispatch = useAppDispatch();
    const formData = useSelector(getProfileForm);
    const error = useSelector(getProfileError);
    const isLoading = useSelector(getProfileIsloading);
    const readonly = useSelector(getProfileReadonly);
    const validateErrors = useSelector(getProfileValidateError);
    const { t } = useTranslation();

    useEffect(() => {
        if (__PROJECT__ !== 'storybook' && id) {
            dispatch(fetchProfileData(id));
        }
    }, [dispatch, id]);
    const validateProfileTranslations = {
        [ValidateProfileErrors.INCORRECT_AGE]: t('Некорректный возраст'),
        [ValidateProfileErrors.INCORRECT_COUNTRY]: t('Некорректная страна'),
        [ValidateProfileErrors.INCORRECT_DATA]: t('Поля имени и фамилии должны быть заполнены'),
        [ValidateProfileErrors.NO_DATA]: t('Введите данные'),
        [ValidateProfileErrors.SERVER_ERROR]: t('Серверная ошибка'),
        [ValidateProfileErrors.INCORRECT_USER_DATA]: t('Неверные данные пользователя'),
    };

    const onChangeFirstname = useCallback((value?: string) => {
        dispatch(profileActions.updateProfile({ first: value || '' }));
    }, [dispatch]);

    const onChangeLastname = useCallback((value?: string) => {
        dispatch(profileActions.updateProfile({ lastname: value || '' }));
    }, [dispatch]);

    const onChangeAge = useCallback((value?: string) => {
        dispatch(profileActions.updateProfile({ age: Number(value) || 0 }));
    }, [dispatch]);

    const onChangeCity = useCallback((value?: string) => {
        dispatch(profileActions.updateProfile({ city: value || '' }));
    }, [dispatch]);
    const onChangeUsername = useCallback((value?: string) => {
        dispatch(profileActions.updateProfile({ username: value || '' }));
    }, [dispatch]);

    const onChangeAvatar = useCallback((value?: string) => {
        dispatch(profileActions.updateProfile({ avatar: value || '' }));
    }, [dispatch]);
    const onChangeCurrency = useCallback((currency?: Currency) => {
        dispatch(profileActions.updateProfile({ currency }));
    }, [dispatch]);
    const onChangeCountry = useCallback((country: Country) => {
        dispatch(profileActions.updateProfile({ country }));
    }, [dispatch]);
    return (
        <DynamicModuleLoader reducers={reducers}>
            <div className={classNames('', {}, [className])}>
                {validateErrors?.length && validateErrors.map((err) => (
                    <Text
                        key={err}
                        theme={TextTheme.ERROR}
                        text={validateProfileTranslations[err]}
                    />
                ))}
                <ProfileCard
                    data={formData}
                    isLoading={isLoading}
                    error={error}
                    readonly={readonly}
                    onChangeFirstname={onChangeFirstname}
                    onChangeLastname={onChangeLastname}
                    onChangeAge={onChangeAge}
                    onChangeCity={onChangeCity}
                    onChangeUsername={onChangeUsername}
                    onChangeAvatar={onChangeAvatar}
                    onChangeCurrency={onChangeCurrency}
                    onChangeCountry={onChangeCountry}
                    className=""
                />
            </div>
        </DynamicModuleLoader>
    );
};
