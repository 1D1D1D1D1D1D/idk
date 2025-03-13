import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import Button, { ThemeButton } from 'shared/ui/Button/Button';
import { Input } from 'shared/ui/Input/Input';
import { useSelector } from 'react-redux';
import { memo, useCallback } from 'react';
import { Text, TextTheme } from 'shared/ui/Text/Text';
import { DynamicModuleLoader, ReducerList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { loginByUsername } from '../../../AuthByUsername/services/loginByUsername/loginByUsername';
import { loginActions, loginReducer } from '../../../AuthByUsername/model/slice/loginSlice';
import { getLoginUsername } from '../../../AuthByUsername/model/selectors/getLoginUsername/getLoginUsername';
import { getLoginPassword } from '../../../AuthByUsername/model/selectors/getLoginPassword/getLoginPassword';
import { getLoginIsloading } from '../../../AuthByUsername/model/selectors/getLoginIsloading/getLoginIsloading';
import { getLoginError } from '../../../AuthByUsername/model/selectors/getLoginError/getLoginError';
import cls from './LoginForm.module.scss';

export interface LoginFormProps {
    className?: string;
    onSuccess: () => void
}
const initialReducers: ReducerList = {
    loginForm: loginReducer,
};

const LoginForm = memo(({ className, onSuccess }: LoginFormProps) => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const username = useSelector(getLoginUsername);
    const password = useSelector(getLoginPassword);
    const isLoading = useSelector(getLoginIsloading);
    const error = useSelector(getLoginError);

    const onChangeName = useCallback((value: string) => {
        dispatch(loginActions.setUsername(value));
    }, [dispatch]);

    const onChangePassword = useCallback((value: string) => {
        dispatch(loginActions.setPassword(value));
    }, [dispatch]);

    const onLoginClick = useCallback(async () => {
        const result = await dispatch(loginByUsername({ username, password }));
        if (result.meta.requestStatus === 'fulfilled') {
            onSuccess();
        }
    }, [onSuccess, username, password, dispatch]);
    return (
        <DynamicModuleLoader removeAfterUnmount reducers={initialReducers}>
            <div className={classNames(cls.LoginForm, {}, [className])}>
                {error && <Text text={t('Неверный логин или пароль')} theme={TextTheme.ERROR} />}
                <Input
                    className={cls.input}
                    type="text"
                    autofocus
                    onChange={onChangeName}
                    value={username}
                    placeholder="username"
                />
                <Input
                    className={cls.input}
                    type="text"
                    onChange={onChangePassword}
                    value={password}
                    placeholder="password"
                />
                <Button className={cls.loginBtn} theme={ThemeButton.OUTLINE} onClick={onLoginClick} disabled={isLoading}>
                    {t('Войти')}
                </Button>
            </div>
        </DynamicModuleLoader>
    );
});
export default LoginForm;
