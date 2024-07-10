import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import cls from './LoginForm.module.scss';
import Button, { ThemeButton } from 'shared/ui/Button/Button';
import { Input } from 'shared/ui/Input/Input';

interface  LoginFormProps {
    className?: string;
}

export const LoginForm = ({ className }:  LoginFormProps) => {
    const { t } = useTranslation();
    return (
        <div className={classNames(cls.LoginForm, {}, [className])} >
            <Input className={cls.input} type="text" autofocus={true} />
            <Input className={cls.input} type="text"   autofocus={false}/>
            <Button className={cls.loginBtn} theme={ThemeButton.OUTLINE}> {t('Войти')}</Button>
        </div>
    )
};