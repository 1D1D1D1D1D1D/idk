import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Card } from 'shared/ui/Card/Card';
import { VFlex } from 'shared/ui/Stack/VFlex/VFlex';
import { Text } from 'shared/ui/Text/Text';
import { StarRating } from 'shared/ui/StarRating/StarRating';
import { useCallback, useState } from 'react';
import { Modal } from 'shared/ui/Modal/Modal';
import { Input } from 'shared/ui/Input/Input';
import { HFlex } from 'shared/ui/Stack/HFlex/HFlex';
import Button, { ThemeButton } from 'shared/ui/Button/Button';
import cls from './RatingCard.module.scss';

interface RatingCardProps {
    className?: string;
    title?: string
    feedbackTitile?: string
    hasFeedback?: boolean
    onCancel?: (starsCount: number) => void
    onAccept?: (starsCount: number, feedbackTitile?: string) => void
}

export const RatingCard = (props: RatingCardProps) => {
    const { t } = useTranslation();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [starsCount, setStarsCount] = useState<number>(0);
    const [feedback, setFeedback] = useState<string>('');
    const {
        className,
        title,
        feedbackTitile,
        hasFeedback,
        onCancel,
        onAccept,
    } = props;
    const onSelectStars = useCallback((selectedStarsCount: number) => {
        setStarsCount(selectedStarsCount);
        if (hasFeedback) {
            setIsModalOpen(true);
        } else {
            onAccept?.(selectedStarsCount);
        }
        setIsModalOpen(true);
    }, [hasFeedback, onAccept]);

    const acceptHandle = useCallback(() => {
        setIsModalOpen(false);
        onAccept?.(starsCount, feedback);
    }, [starsCount, feedback, onAccept]);

    const cancelHandle = useCallback(() => {
        setIsModalOpen(false);
        onCancel?.(starsCount);
    }, [starsCount, onCancel]);
    return (
        <Card className={classNames(cls.RatingCard, {}, [className])}>
            <VFlex>
                <Text title={title} />
                <StarRating size={40} onSelect={onSelectStars} />
            </VFlex>
            <Modal isOpen={isModalOpen} lazy>
                <VFlex gap="32" max>
                    <Text title={feedbackTitile} />
                    <Input placeholder={t('Your comment')} />
                </VFlex>
                <HFlex max gap="16" justify="end">
                    <Button theme={ThemeButton.OUTLINE_RED} onClick={cancelHandle}>
                        {t('close')}
                    </Button>
                    <Button onClick={acceptHandle}>
                        {t('send')}
                    </Button>
                </HFlex>
            </Modal>
        </Card>
    );
};
