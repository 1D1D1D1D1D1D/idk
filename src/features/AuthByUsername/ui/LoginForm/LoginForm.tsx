import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import Button, { ThemeButton } from 'shared/ui/Button/Button';
import { Input } from 'shared/ui/Input/Input';
import { useDispatch, useSelector } from 'react-redux';
import { memo, useCallback } from 'react';
import { loginByUsername } from 'features/AuthByUsername/services/loginByUsername/loginByUsername';
import { AppDispatch } from 'app/providers/StoreProvider/config/store';
import { Text, TextTheme } from 'shared/ui/Text/Text';
import { loginActions } from 'features/AuthByUsername/model/slice/loginSlice';
import { getLoginUsername } from 'features/AuthByUsername/model/selectors/getLoginUsername/getLoginUsername';
import { getLoginPassword } from 'features/AuthByUsername/model/selectors/getLoginPassword/getLoginPassword';
import { getLoginIsloading } from 'features/AuthByUsername/model/selectors/getLoginIsloading/getLoginIsloading';
import { getLoginError } from 'features/AuthByUsername/model/selectors/getLoginError/getLoginError';
import { DynamicModuleLoader, ReducerList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import cls from './LoginForm.module.scss';

export interface LoginFormProps {
    className?: string;
}

const LoginForm = memo(({ className }: LoginFormProps) => {
    const { t } = useTranslation();
    /// / !!!!!!!! ЧЗХ??????????????
    const dispatch = useDispatch<AppDispatch>();
    /// /!!!!!!!!! ЧЗХ??????????????
    const initialReducers: ReducerList = { loginForm: LoginForm };
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

    const onLoginClick = useCallback(() => {
        dispatch(loginByUsername({ username, password }));
    }, [username, password, dispatch]);
    return (
        <DynamicModuleLoader removeAfterUnmount reducers={initialReducers}>
            <div className={classNames(cls.LoginForm, {}, [className])}>
                { error && <Text text={t('Неверный логин или пароль')} theme={TextTheme.ERROR} />}
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
                    autofocus
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
