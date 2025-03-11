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
    rate?: number
}

export const RatingCard = (props: RatingCardProps) => {
    const {
        className,
        title,
        feedbackTitile,
        hasFeedback,
        onCancel,
        onAccept,
        rate = 0,
    } = props;
    const { t } = useTranslation();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [starsCount, setStarsCount] = useState(rate);
    const [feedback, setFeedback] = useState<string>('');

    const onSelectStars = useCallback((selectedStarsCount: number) => {
        setStarsCount(selectedStarsCount);
        if (hasFeedback) {
            setIsModalOpen(true);
        } else {
            onAccept?.(selectedStarsCount);
        }
    }, [hasFeedback, onAccept]);

    const acceptHandle = useCallback(() => {
        setIsModalOpen(false);
        onAccept?.(starsCount, feedback);
    }, [starsCount, feedback, onAccept]);

    const cancelHandle = useCallback(() => {
        setIsModalOpen(false);
        onCancel?.(starsCount);
    }, [starsCount, onCancel]);
    const ratingHeader = (
        <Text text={starsCount ? 'Thanks for feedback' : title} />
    );
    return (
        <Card className={classNames(cls.RatingCard, {}, [className])}>
            <VFlex justify="center" align="center">
                {ratingHeader}
                <StarRating selectedStars={starsCount} size={40} onSelect={onSelectStars} />
            </VFlex>
            <Modal isOpen={isModalOpen} lazy>
                <VFlex gap="32" max>
                    <Text title={feedbackTitile} />
                    <Input placeholder={t('Your comment')} value={feedback} onChange={setFeedback} />
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
