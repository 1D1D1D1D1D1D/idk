import { useTranslation } from 'react-i18next';
import Button, { ThemeButton } from 'shared/ui/Button/Button';
import { Text, TextAlign } from 'shared/ui/Text/Text';
import { useSelector } from 'react-redux';

import { useCallback } from 'react';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { getUserAuthData } from 'entities/User';
import { classNames } from 'shared/lib/classNames/classNames';
import { HFlex } from 'shared/ui/Stack/HFlex/HFlex';
import { getProfileReadonly } from 'features/EditableProfileCard/model/selectors/getProfileReadonly/getProfileReadonly';
import { getProfileData } from 'features/EditableProfileCard/model/selectors/getProfileData/getProfileData';
import { profileActions } from 'features/EditableProfileCard/model/slice/profileSlice';
import { updateProfileData } from 'features/EditableProfileCard/model/services/updateProfileData/updateProfileData';
import cls from './ProfilePageHeader.module.scss';

interface ProfilePageHeaderProps {
    className?: string
}
export const ProfilePageHeader = ({ className }: ProfilePageHeaderProps) => {
    const { t } = useTranslation();
    const readonly = useSelector(getProfileReadonly);
    const dispatch = useAppDispatch();
    const authData = useSelector(getUserAuthData);
    const profileData = useSelector(getProfileData);
    const canEdit = authData?.id === profileData?.id;
    const onEdit = useCallback(() => {
        dispatch(profileActions.setReadonly(false));
    }, [dispatch]);
    const onCancelEdit = useCallback(() => {
        dispatch(profileActions.cancelEdit());
    }, [dispatch]);

    const onSave = useCallback(() => {
        dispatch(updateProfileData());
    }, [dispatch]);
    return (
        <HFlex className={classNames(cls.ProfilePageHeader, {}, [className])}>
            <Text text={t('Профиль')} className={cls.text} />
            {canEdit && (
                <div className={cls.btnWrapper}>
                    {readonly
                        ? (
                            <Button theme={ThemeButton.OUTLINE} className={cls.editBtn} onClick={onEdit} data-testid="EditableProfileCardHeader-EditButton">
                                <Text text={t('Редактировать')} className={cls.text} />
                            </Button>
                        )
                        : (
                            <>
                                <Button theme={ThemeButton.OUTLINE_RED} className={cls.editBtn} onClick={onCancelEdit} data-testid="EditableProfileCardHeader-CancelButton" >
                                    <Text text={t('Отменить')} className={cls.text} />
                                </Button>
                                <Button theme={ThemeButton.OUTLINE} onClick={onSave} data-testid="EditableProfileCardHeader-SaveButton">
                                    <Text text={t('Сохранить')} className={cls.text} />
                                </Button>
                            </>
                        )}
                </div>
            )}

        </HFlex>
    );
};
