import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import cls from './ArticleDetailsPreviewPageHeader.module.scss';
import { HFlex } from 'shared/ui/Stack/HFlex/HFlex';
import Button from 'shared/ui/Button/Button';
import { memo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

interface ArticleDetailsPreviewPageProps {
    className?: string;
}

export const ArticleDetailsPreviewPageHeader = memo(({ className }: ArticleDetailsPreviewPageProps) => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const onBack = useCallback(() => {
        navigate(-1)
    }, [navigate])
    return (
        <HFlex
            className={classNames(cls.ArticleDetailsPreviewPage, {}, [className])}>
            <Button onClick={onBack}>Back</Button>
        </HFlex>
    );
});