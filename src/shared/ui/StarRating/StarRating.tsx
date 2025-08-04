import { useTranslation } from 'react-i18next';
import StarIcon from 'shared/assets/icons/star-svgrepo-com.svg';
import { classNames } from 'shared/lib/classNames/classNames';
import { useState } from 'react';
import { Icon } from '../Icon/Icon';
import cls from './StarRating.module.scss';

interface StarRatingProps {
    className?: string;
    onSelect?: (starsCount: number) => void
    size?: number
    selectedStars?: number
}

export const StarRating = (props: StarRatingProps) => {
    const {
        className,
        onSelect,
        size,
        selectedStars = 0,
    } = props;
    const { t } = useTranslation();
    const stars = [1, 2, 3, 4, 5];

    const [currentStarsCount, setCurrentStarsCount] = useState(selectedStars);
    const [isSelected, setIsSelected] = useState(Boolean(selectedStars));

    const onHover = (starsCount: number) => () => {
        if (!isSelected) {
            setCurrentStarsCount(starsCount);
        }
    };
    const onLeave = () => {
        if (!isSelected) {
            setCurrentStarsCount(0);
        }
    };
    const onClick = (starsCount: number) => () => {
        if (!isSelected) {
            onSelect?.(starsCount);
            setCurrentStarsCount(starsCount);
            setIsSelected(true);
        }
    };
    return (
        <div>
            {stars.map((star) => (
                <Icon
                    Svg={StarIcon}
                    key={star}
                    className={classNames(cls.starIcon, { [cls.selected]: isSelected }, [currentStarsCount >= star ? cls.hovered : cls.normal])}
                    onMouseLeave={onLeave}
                    onMouseEnter={onHover(star)}
                    onClick={onClick(star)}
                    data-testid={`StarRating` + star}
                    data-selected={currentStarsCount >= star}
                />
            ))}
        </div>

    );
};
