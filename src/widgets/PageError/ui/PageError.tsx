import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import Button from 'shared/ui/Button/Button';
import cls from './PageError.module.scss';
import { Text, TextSize } from 'shared/ui/Text/Text';

interface PageErrorProps {
    className?: string;
}

export const PageError = ({ className }: PageErrorProps) => {
    const { t } = useTranslation();

    const reloadPage = () => {
        location.reload();
    };
    return (
        <div className={classNames(`${cls.PageError}  app_gray_theme`, {}, [className])}>
            <Text size={TextSize.L} text={t('Произошла непредвиденная ошибка')}></Text>
            <Button onClick={reloadPage}>
                {t('Обновить страницу')}
            </Button>
        </div>
    );
};
