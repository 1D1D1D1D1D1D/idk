import { useTranslation } from 'react-i18next';
import Button, { ThemeButton } from 'shared/ui/Button/Button';
import { Text } from 'shared/ui/Text/Text';
import { useSelector } from 'react-redux';
import {
    getProfileData, getProfileReadonly, profileActions, updateProfileData,
} from 'entities/Profile';
import { useCallback } from 'react';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { getUserAuthData } from 'entities/User';
import cls from './ProfilePageHeader.module.scss';

export const ProfilePageHeader = () => {
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
        <div className={cls.ProfilePageHeader}>
            <Text text={t('Профиль')} className={cls.text} />
            {canEdit && (
                <div className={cls.btnWrapper}>
                    {readonly
                        ? (
                            <Button theme={ThemeButton.OUTLINE} className={cls.editBtn} onClick={onEdit}>
                                <Text text={t('Редактировать')} className={cls.text} />
                            </Button>
                        )
                        : (
                            <>
                                <Button theme={ThemeButton.OUTLINE_RED} className={cls.editBtn} onClick={onCancelEdit}>
                                    <Text text={t('Отменить')} className={cls.text} />
                                </Button>
                                <Button theme={ThemeButton.OUTLINE} onClick={onSave}>
                                    <Text text={t('Сохранить')} className={cls.text} />
                                </Button>
                            </>
                        )}
                </div>
            )}

        </div>
    );
};
